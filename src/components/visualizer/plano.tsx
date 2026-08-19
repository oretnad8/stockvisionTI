import React, { useState } from 'react';

const RackPlan = () => {
    const [viewMode, setViewMode] = useState<'PLANTA' | 'FRONTAL'>('PLANTA');
    const [selectedCol, setSelectedCol] = useState<number>(0);
    const [activeStack, setActiveStack] = useState<string>("ESTANTE 01");

    const rackStyle = "border border-blue-600 bg-[#0d0d1f] hover:bg-blue-900/40 transition-all duration-300 cursor-pointer flex items-center justify-center text-blue-400 text-[10px] font-mono leading-tight text-center p-1 overflow-hidden";

    // Medidas Planta: 130 + 84 + (93.3 * 3) + 110 = 604
    const W_TOTAL = 604;
    const H_TOTAL = 480;
    const toPct = (val: number, total: number) => `${(val / total) * 100}%`;

    const handleRackClick = (stack: string, colIndex: number) => {
        setActiveStack(stack);
        setSelectedCol(colIndex);
        setViewMode('FRONTAL');
    };

    const handleBack = () => {
        setViewMode('PLANTA');
    };

    const getRackLabel = (stack: string, col: number, row: number) => {
        if (stack === "ESTANTE 01") {
            return col * 5 + row + 1;
        }
        if (stack === "ESTANTE 02") {
            if (col === 0) return row < 4 ? 16 + row : null;
            if (col === 1) return 20 + row;
            if (col === 2) return 25 + row;
        }
        if (stack === "RACK PALETS") {
            // Col 1: 36, 33, 30
            // Col 2: 37, 34, 31
            // Col 3: 38, 35, 32
            return 30 + col + (2 - row) * 3;
        }
        return null;
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#0a0a0a] min-h-screen font-sans overflow-hidden">

            {/* Contenedor principal con efecto de deslizamiento horizontal (Carousel) */}
            <div className="relative w-full max-w-4xl overflow-hidden aspect-[800/700]">

                <div
                    className="flex w-[200%] h-full transition-transform duration-500 ease-out"
                    style={{ transform: viewMode === 'PLANTA' ? 'translateX(0)' : 'translateX(-50%)' }}
                >
                    {/* SLIDE 1: PLANTA */}
                    <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
                        <h2 className="text-blue-500 mb-8 text-sm font-bold tracking-[0.3em] uppercase border-b border-blue-900/50 pb-2 w-full text-center">
                            Seleccione un Rack para Inspección
                        </h2>

                        <div className="relative w-full aspect-[604/480] bg-[#050510] border border-blue-900 shadow-[0_0_80px_rgba(30,58,138,0.15)]">
                            {/* LEFT STACK */}
                            <div className="absolute top-0 left-0 flex flex-col" style={{ width: toPct(70, W_TOTAL), height: toPct(280, H_TOTAL) }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} onClick={() => handleRackClick("ESTANTE 01", 2 - i)}
                                        className={`${rackStyle} h-[33.33%] mb-[1px] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-blue-400`}>
                                    </div>
                                ))}
                            </div>

                            {/* RIGHT STACK */}
                            <div className="absolute top-0 right-0 flex flex-col" style={{ width: toPct(110, W_TOTAL), height: toPct(360, H_TOTAL) }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} onClick={() => handleRackClick("RACK PALETS", i)}
                                        className={`${rackStyle} h-[33.33%] mb-[1px] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-blue-400`}>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-0 flex" style={{ left: toPct(130 + 84, W_TOTAL), width: toPct(93.33 * 3, W_TOTAL), height: toPct(70, H_TOTAL) }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} onClick={() => handleRackClick("ESTANTE 02", 2 - i)}
                                        className={`${rackStyle} flex-1 ${i !== 2 ? 'mr-[1px]' : ''} hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-blue-400`}>
                                    </div>
                                ))}
                            </div>

                            {/* CORNER */}
                            <div className="absolute bottom-0 left-0 border border-blue-900/60 bg-[#0d0d1f]" style={{ width: toPct(130, W_TOTAL), height: '8px' }}></div>
                        </div>
                    </div>

                    {/* SLIDE 2: FRONTAL */}
                    <div className="w-1/2 h-full flex flex-col p-8 bg-[#070715]">
                        <div className="w-full flex justify-between items-center mb-10 border-b border-orange-500/20 pb-6">
                            <button
                                onClick={handleBack}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-[0.2em] transition-all rounded shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2 active:scale-95"
                            >
                                ← VOLVER AL PLANO
                            </button>
                            <div className="text-right">
                                <h2 className="text-orange-500 text-lg font-bold tracking-widest uppercase mb-1">
                                    {activeStack}
                                </h2>
                                <span className="text-orange-400/50 text-[10px] uppercase font-mono italic">
                                    Columna {selectedCol + 1}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-row items-center justify-center gap-4">
                            {/* Level Labels */}
                            <div className="flex flex-col h-[80%] justify-between text-[10px] text-blue-500/50 font-mono py-1 select-none">
                                <span>NIVEL 5</span>
                                <span>NIVEL 4</span>
                                <span>NIVEL 3</span>
                                <span>NIVEL 2</span>
                                <span>NIVEL 1</span>
                            </div>

                            <div className="relative w-full max-w-2xl aspect-[280/230] bg-black border border-blue-900 p-[4px] shadow-[0_0_100px_rgba(123,75,18,0.15)] ring-1 ring-blue-500/20">
                                {activeStack === "RACK PALETS" ? (
                                    /* RACK PALETS IRREGULAR GRID */
                                    <div className="flex h-full w-full gap-[4px]">
                                        {[0, 1, 2].map(colIdx => {
                                            const isRightCol = colIdx === 2;
                                            // Left/Middle: 120, 120, 120, 160 (Base)
                                            // Right: 120, 120, 100, 190 (Base)
                                            const rows = isRightCol
                                                ? [{ h: '120', id: 'A' }, { h: '120', id: 'B' }, { h: '100', id: 'C' }, { h: '190', isBase: true }]
                                                : [{ h: '120', id: 'A' }, { h: '120', id: 'B' }, { h: '120', id: 'C' }, { h: '160', isBase: true }];

                                            return (
                                                <div key={colIdx} className="flex-1 flex flex-col h-full gap-[4px]">
                                                    {rows.map((row, rowIdx) => (
                                                        <div
                                                            key={rowIdx}
                                                            style={{ flex: `${row.h} 1 0%` }}
                                                            className={`
                                                                border transition-all duration-700 relative flex flex-col items-center justify-center
                                                                ${(selectedCol === colIdx && !row.isBase)
                                                                    ? 'bg-gradient-to-b from-[#7b4b12] to-[#4d2f0b] border-orange-500/50 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]'
                                                                    : 'bg-[#0d0d1f]/40 border-blue-900/40'
                                                                }
                                                            `}
                                                        >
                                                            {!row.isBase && (
                                                                <>
                                                                    <span className={`text-[9px] font-black tracking-tighter transition-opacity duration-300 ${selectedCol === colIdx ? 'text-orange-200/40' : 'text-blue-500/20'}`}>
                                                                        RACK
                                                                    </span>
                                                                    <span className={`text-lg font-black leading-none transition-opacity duration-300 ${selectedCol === colIdx ? 'text-white/80' : 'text-blue-500/30'}`}>
                                                                        {getRackLabel(activeStack, colIdx, rowIdx)}
                                                                    </span>
                                                                </>
                                                            )}
                                                            {row.isBase && (
                                                                <span className="text-[10px] font-black text-blue-400/60 uppercase tracking-tighter text-center px-2">
                                                                    {isRightCol ? "Estante Usados" : "Labs"}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    /* STANDARD 5-LEVEL GRID FOR ESTANTE 01/02 */
                                    <div className="flex h-full w-full gap-[4px]">
                                        {[0, 1, 2].map(colIdx => (
                                            <div key={colIdx} className="flex-1 flex flex-col h-full gap-[4px]">
                                                {[0, 1, 2, 3, 4].map(rowIdx => {
                                                    const zoneId = getRackLabel(activeStack, colIdx, rowIdx);
                                                    return (
                                                        <div
                                                            key={rowIdx}
                                                            className={`
                                flex-1 border transition-all duration-700 relative flex flex-col items-center justify-center
                                ${selectedCol === colIdx
                                                                    ? 'bg-gradient-to-b from-[#7b4b12] to-[#4d2f0b] border-orange-500/50 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]'
                                                                    : 'bg-[#0d0d1f]/40 border-blue-900/40 hover:bg-blue-900/20'
                                                                }
                              `}
                                                        >
                                                            {zoneId && (
                                                                <>
                                                                    <span className={`text-[9px] font-black tracking-tighter transition-opacity duration-300 ${selectedCol === colIdx ? 'text-orange-200/40' : 'text-blue-500/20'}`}>
                                                                        RACK
                                                                    </span>
                                                                    <span className={`text-lg font-black leading-none transition-opacity duration-300 ${selectedCol === colIdx ? 'text-white/80' : 'text-blue-500/30'}`}>
                                                                        {zoneId < 10 ? `0${zoneId}` : zoneId}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RackPlan;
