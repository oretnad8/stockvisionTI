import React, { useState } from 'react';

/**
 * EstanteFotografico
 * -------------------
 * Réplica visual del estante real de la fotografía, respetando
 * exactamente las proporciones medidas en la imagen (ancho de cada
 * columna y alto de cada nivel dentro de esa columna).
 *
 * Medidas tomadas de la fotografía (en "unidades" arbitrarias, lo único
 * que importa es la proporción relativa entre ellas):
 *
 *   Ancho total del mueble:            1310
 *   Alto del cuerpo principal:          420
 *   Franja superior (objetos sobre el mueble): 60
 *   Franja inferior (base / repisa):     40
 *
 *   Columna 1 (izq.):  ancho 360  -> 2 niveles [190, 230]
 *   Columna 2:         ancho 345  -> 3 niveles [155, 155, 110]
 *   Columna 3:         ancho 305  -> 3 niveles [175, 85, 160]
 *   Columna 4 (der.):  ancho 300  -> 3 niveles [115, 115, 190]
 */

const W_TOTAL = 1310;
const H_TOP = 60;
const H_BODY = 420;
const H_BOTTOM = 40;
const H_TOTAL = H_TOP + H_BODY + H_BOTTOM; // 520

const COLUMNS = [
    {
        id: 1,
        width: 360,
        label: 'Cables y conectores',
        levels: [
            { height: 190, label: 'Bandejas de cables' },
            { height: 230, label: 'Cajas y organizadores' },
        ],
    },
    {
        id: 2,
        width: 345,
        label: 'Repuestos varios',
        levels: [
            { height: 155, label: 'Contenedores transparentes A' },
            { height: 155, label: 'Contenedores transparentes B' },
            { height: 110, label: 'Teclado / periféricos' },
        ],
    },
    {
        id: 3,
        width: 305,
        label: 'Consumibles',
        levels: [
            { height: 175, label: 'Cajas verdes / varios' },
            { height: 85, label: 'Cajas negras' },
            { height: 160, label: 'Tintas y botellas' },
        ],
    },
    {
        id: 4,
        width: 300,
        label: 'Equipos y documentación',
        levels: [
            { height: 115, label: 'Cables enrollados' },
            { height: 115, label: 'Piezas / tarjetas' },
            { height: 190, label: 'Panel de documentos' },
        ],
    },
];

const toPct = (val, total) => `${(val / total) * 100}%`;

const EstanteFotografico = () => {
    const [selected, setSelected] = useState(null); // { col, level }

    return (
        <div className="w-full flex flex-col items-center gap-6 p-6 bg-[#050510]">
            <h2 className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase border-b border-blue-900/50 pb-2 w-full text-center max-w-4xl">
                Estante — vista frontal (proporciones reales)
            </h2>

            <div
                className="relative w-full border border-blue-900 shadow-[0_0_80px_rgba(30,58,138,0.15)]"
                style={{ maxWidth: '1100px', aspectRatio: `${W_TOTAL} / ${H_TOTAL}` }}
            >
                {/* FRANJA SUPERIOR: objetos sobre el mueble */}
                <div
                    className="absolute top-0 left-0 w-full border-b border-blue-900/60 bg-gradient-to-b from-[#1a1204] to-[#0d0d1f] flex items-center justify-center"
                    style={{ height: toPct(H_TOP, H_TOTAL) }}
                >
                    <span className="text-[10px] text-orange-400/50 font-mono uppercase tracking-widest">
                        repisa superior
                    </span>
                </div>

                {/* CUERPO PRINCIPAL: 4 columnas */}
                <div
                    className="absolute left-0 w-full flex"
                    style={{ top: toPct(H_TOP, H_TOTAL), height: toPct(H_BODY, H_TOTAL) }}
                >
                    {COLUMNS.map((col, colIdx) => (
                        <div
                            key={col.id}
                            className={`flex flex-col h-full ${colIdx !== COLUMNS.length - 1 ? 'border-r border-blue-900' : ''}`}
                            style={{ width: toPct(col.width, W_TOTAL) }}
                        >
                            {col.levels.map((lvl, lvlIdx) => {
                                const isSelected = selected && selected.col === colIdx && selected.level === lvlIdx;
                                return (
                                    <div
                                        key={lvlIdx}
                                        onClick={() => setSelected({ col: colIdx, level: lvlIdx })}
                                        className={`
                                            flex items-center justify-center text-center cursor-pointer
                                            border-b border-blue-900/60 last:border-b-0
                                            transition-all duration-300 p-1 overflow-hidden
                                            ${isSelected
                                                ? 'bg-blue-600/40 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] z-10'
                                                : 'bg-[#0d0d1f] hover:bg-blue-900/30 hover:border-blue-400'}
                                        `}
                                        style={{ height: toPct(lvl.height, H_BODY) }}
                                    >
                                        <div className="flex flex-col items-center gap-0.5">
                                            <span className="text-[9px] font-bold text-blue-500/60 tracking-tight">
                                                COL {col.id} · NIVEL {lvlIdx + 1}
                                            </span>
                                            <span className={`text-[10px] font-mono leading-tight ${isSelected ? 'text-white' : 'text-blue-400/70'}`}>
                                                {lvl.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* FRANJA INFERIOR: base / repisa */}
                <div
                    className="absolute bottom-0 left-0 w-full border-t border-blue-900/60 bg-[#0d0d1f] flex items-center justify-center"
                    style={{ height: toPct(H_BOTTOM, H_TOTAL) }}
                >
                    <span className="text-[9px] text-blue-500/40 font-mono uppercase tracking-widest">
                        base
                    </span>
                </div>
            </div>

            {selected && (
                <div className="text-blue-300 text-xs font-mono">
                    Seleccionado: Columna {COLUMNS[selected.col].id} — Nivel {selected.level + 1} (
                    {COLUMNS[selected.col].levels[selected.level].label})
                </div>
            )}
        </div>
    );
};

export default EstanteFotografico;
