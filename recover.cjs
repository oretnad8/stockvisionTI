const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Pc Tester/.gemini/antigravity-ide/brain/6eed04d8-00fc-4e0f-9e92-46c77216f042/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

const files = {};

for(let line of lines) {
    if(!line) continue;
    let obj;
    try {
        obj = JSON.parse(line);
    } catch(e) { continue; }
    
    if(obj.tool_calls) {
        obj.tool_calls.forEach(tc => {
            if(tc.name === 'write_to_file') {
                const args = tc.args || {};
                const file = args.TargetFile;
                if(file && (file.includes('/server/') || file.includes('\\server\\'))) {
                    files[file] = args.CodeContent;
                }
            } else if(tc.name === 'replace_file_content') {
                const args = tc.args || {};
                const file = args.TargetFile;
                if(file && files[file]) {
                    // Try to replace TargetContent with ReplacementContent
                    if (files[file].includes(args.TargetContent)) {
                        files[file] = files[file].replace(args.TargetContent, args.ReplacementContent);
                    }
                }
            }
        });
    }
}

// Ensure the server directory exists
if (!fs.existsSync('server')) {
    fs.mkdirSync('server');
}

Object.keys(files).forEach(f => {
    // Only save files that are in the server folder
    const baseName = require('path').basename(f);
    fs.writeFileSync('server/' + baseName, files[f]);
    console.log('Recovered:', baseName);
});
