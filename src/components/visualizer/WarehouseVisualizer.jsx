import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { WAREHOUSE_LAYOUT } from '../../config/warehouseLayout';
import { MapPin, Package, X } from 'lucide-react';
import PartRow from '../inventory/PartRow';

const WarehouseVisualizer = ({ isSelector = false, readOnlyLocation = null, initialTab = 'oficina', onSelectLocation, onClose }) => {
    const { allItems, searchTerm, setSearchTerm, setSelectedItem } = useInventory();
    const [activeTab, setActiveTab] = useState(initialTab);

    const getCellItemsCount = (cellId) => {
        return allItems.filter(item => {
            if (item.ubicaciones && Array.isArray(item.ubicaciones)) {
                return item.ubicaciones.some(loc => loc.ubicacion === cellId);
            }
            return item.ubicacion === cellId;
        }).length;
    };

    const handleCellClick = (cellId) => {
        if (readOnlyLocation) return;
        if (isSelector && onSelectLocation) {
            onSelectLocation(cellId);
        } else {
            setSearchTerm(cellId);
        }
    };

    const StockBadge = ({ code }) => {
        if (isSelector) return null; // No mostrar badges en modo selector para no distraer
        const count = getCellItemsCount(code);
        if (count === 0) return null;
        return (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-slate-900 z-10">
                {count}
            </div>
        );
    };

    // Componente específico para la Oficina TI (Dark Tech Theme)
    const OficinaVisualizer = () => {
        const toPct = (val, total) => `${(val / total) * 100}%`;

        const W_TOTAL = 1310;
        const H_TOP = 60;
        const H_BODY = 420;
        const H_BOTTOM = 40;
        const H_TOTAL = H_TOP + H_BODY + H_BOTTOM; // 520

        const COLUMNS = [
            {
                id: 1,
                width: 360,
                levels: [
                    { height: 190, label: 'Bandejas de cables' },
                    { height: 230, label: 'Cajas y organizadores' },
                ],
            },
            {
                id: 2,
                width: 345,
                levels: [
                    { height: 155, label: 'Contenedores transparentes A' },
                    { height: 155, label: 'Contenedores transparentes B' },
                    { height: 110, label: 'Teclado / periféricos' },
                ],
            },
            {
                id: 3,
                width: 305,
                levels: [
                    { height: 175, label: 'Cajas verdes / varios' },
                    { height: 85, label: 'Cajas negras' },
                    { height: 160, label: 'Tintas y botellas' },
                ],
            },
            {
                id: 4,
                width: 300,
                levels: [
                    { height: 115, label: 'Cables enrollados' },
                    { height: 115, label: 'Piezas / tarjetas' },
                    { height: 190, label: 'Panel de documentos' },
                ],
            },
        ];

        const getBtnClass = (code) => {
            const isActive = readOnlyLocation ? code === readOnlyLocation : (isSelector ? false : searchTerm === code);
            return `relative transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden
                    ${isActive
                    ? 'bg-blue-600/60 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10 border-2'
                    : 'bg-[#0d0d1f] border-blue-900/60 hover:bg-blue-900/30 hover:border-blue-500 text-blue-400/80 border'
                }`;
        };

        const SubCell = ({ code, label, className = "", children }) => (
            <div onClick={(e) => { e.stopPropagation(); handleCellClick(code); }} className={`${getBtnClass(code)} ${className}`} title={label}>
                {children || <span className="text-[9px] font-mono leading-tight text-center px-1 w-full h-full flex items-center justify-center overflow-hidden">{code ? code.replace(/^(OFI-|BOD-)/, '') : label}</span>}
                <StockBadge code={code} />
            </div>
        );

        return (
            <div className="w-full flex items-center md:justify-center p-4 md:p-6 bg-[#050510] rounded-xl overflow-x-auto">
                <div
                    className="relative shrink-0 shadow-[0_0_80px_rgba(30,58,138,0.15)]"
                    style={{ height: '65vh', minHeight: '400px', maxHeight: '700px', aspectRatio: `${W_TOTAL} / ${H_TOTAL}` }}
                >
                    {/* FRANJA SUPERIOR */}
                    <div className="absolute top-0 left-0 w-full flex bg-gradient-to-b from-[#1a1204] to-[#0d0d1f]" style={{ height: toPct(H_TOP, H_TOTAL) }}>
                        <div className="h-full w-full">
                            <SubCell code="OFI-TOP" label="Cajas Superior" className="w-full h-full" />
                        </div>
                    </div>

                    {/* CUERPO PRINCIPAL */}
                    <div className="absolute left-0 w-full flex" style={{ top: toPct(H_TOP, H_TOTAL), height: toPct(H_BODY, H_TOTAL) }}>
                        {/* Columna 1 */}
                        <div className="flex flex-col h-full border-r border-blue-900" style={{ width: toPct(COLUMNS[0].width, W_TOTAL) }}>
                            {/* Nivel 1: Bandejas de cables (9) */}
                            <div className="flex-none p-1 bg-[#0a0a16] border-b border-blue-900/60 flex flex-col" style={{ height: toPct(COLUMNS[0].levels[0].height, H_BODY) }}>
                                <div className="w-full flex-1 grid grid-cols-3 grid-rows-3 gap-1">
                                    {Array.from({ length: 9 }).map((_, i) => {
                                        const row = Math.floor(i / 3) + 1;
                                        const col = (i % 3) + 1;
                                        return <SubCell key={i} code={`OFI-M1-N${row}-P${col}`} label={`P${col}`} />;
                                    })}
                                </div>
                            </div>
                            {/* Nivel 2: Cajas y organizadores */}
                            <div className="flex-none p-1 bg-[#0a0a16] flex flex-col min-h-0" style={{ height: toPct(COLUMNS[0].levels[1].height, H_BODY) }}>
                                <div className="w-full flex-1 flex gap-1 min-h-0">
                                    <div className="w-1/2 h-full min-h-0">
                                        <SubCell code="OFI-M1-N4-P1" label="Pos 1" className="w-full h-full" />
                                    </div>
                                    <div className="w-1/2 h-full flex flex-col gap-1 min-h-0">
                                        {/* Bloque superior (1/4 altura) */}
                                        <div className="flex-none h-1/4 w-full">
                                            <SubCell code="OFI-M1-N4-P2" label="Pos 2" className="w-full h-full" />
                                        </div>
                                        {/* Gavetero Azul (3/4 altura) */}
                                        <div className="flex-1 flex flex-col border border-blue-900/30 p-1 min-h-0">
                                            <div className="w-full flex-1 grid grid-cols-1 grid-rows-6 gap-0.5 min-h-0">
                                                {Array.from({ length: 6 }).map((_, i) => {
                                                    const num = 5 + i;
                                                    return <SubCell key={i} code={`OFI-M1-N${num}-P1`} label={`N${num}`} className="w-full h-full" />;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna 2 */}
                        <div className="flex flex-col h-full border-r border-blue-900" style={{ width: toPct(COLUMNS[1].width, W_TOTAL) }}>
                            {/* Nivel 1: Contenedores A (6) */}
                            <div className="flex-none p-1 bg-[#0a0a16] border-b border-blue-900/60 flex flex-col" style={{ height: toPct(COLUMNS[1].levels[0].height, H_BODY) }}>
                                <div className="w-full flex-1 grid grid-cols-2 grid-rows-3 gap-1">
                                    {Array.from({ length: 6 }).map((_, i) => {
                                        const row = Math.floor(i / 2) + 1;
                                        const col = (i % 2) + 1;
                                        return <SubCell key={i} code={`OFI-M2-N${row}-P${col}`} label={`P${col}`} />;
                                    })}
                                </div>
                            </div>
                            {/* Nivel 2: Contenedores B (5) */}
                            <div className="flex-none p-1 bg-[#0a0a16] border-b border-blue-900/60 flex flex-col" style={{ height: toPct(COLUMNS[1].levels[1].height, H_BODY) }}>
                                <div className="w-full flex-1 flex gap-1">
                                    <div className="w-1/3 flex flex-col gap-1">
                                        <SubCell code="OFI-M2-N4-P1" label="Pos 1" className="w-full flex-1" />
                                        <SubCell code="OFI-M2-N5-P1" label="Pos 1" className="w-full flex-1" />
                                    </div>
                                    <div className="w-1/3 flex flex-col gap-1">
                                        <SubCell code="OFI-M2-N6-P1" label="Pos 1" className="w-full flex-1" />
                                        <SubCell code="OFI-M2-N7-P1" label="Pos 1" className="w-full flex-1" />
                                    </div>
                                    <div className="w-1/3 h-full">
                                        <SubCell code="OFI-M2-N8-P1" label="Pos 1" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>
                            {/* Nivel 3: Teclados */}
                            <div className="flex-none p-1 bg-[#0a0a16] flex flex-col" style={{ height: toPct(COLUMNS[1].levels[2].height, H_BODY) }}>
                                <SubCell code="OFI-M2-N9-P1" label="Pos 1" className="w-full h-full" />
                            </div>
                        </div>

                        {/* Columna 3 */}
                        <div className="flex flex-col h-full border-r border-blue-900" style={{ width: toPct(COLUMNS[2].width, W_TOTAL) }}>
                            {COLUMNS[2].levels.map((lvl, idx) => (
                                <div key={idx} className="flex-none p-1 bg-[#0a0a16] border-b border-blue-900/60 last:border-b-0 flex flex-col" style={{ height: toPct(lvl.height, H_BODY) }}>
                                    <SubCell code={`OFI-M3-N${idx + 1}-P1`} label={`Nivel ${idx + 1}`} className="w-full h-full" />
                                </div>
                            ))}
                        </div>

                        {/* Columna 4 */}
                        <div className="flex flex-col h-full" style={{ width: toPct(COLUMNS[3].width, W_TOTAL) }}>
                            {COLUMNS[3].levels.map((lvl, idx) => (
                                <div key={idx} className="flex-none p-1 bg-[#0a0a16] border-b border-blue-900/60 last:border-b-0 flex flex-col" style={{ height: toPct(lvl.height, H_BODY) }}>
                                    <SubCell code={`OFI-M4-N${idx + 1}-P1`} label={`Nivel ${idx + 1}`} className="w-full h-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FRANJA INFERIOR */}
                    <div className="absolute bottom-0 left-0 w-full border-t border-blue-900/60 bg-[#0d0d1f] flex items-center justify-center" style={{ height: toPct(H_BOTTOM, H_TOTAL) }}>
                        <span className="text-[9px] text-blue-500/40 font-mono uppercase tracking-widest">Base</span>
                    </div>
                </div>
            </div>
        );
    };

    // Componente específico para la Bodega TI (Proporciones del mueble blanco)
    const BodegaVisualizer = () => {
        const toPct = (val, total) => `${(val / total) * 100}%`;

        const W_TOTAL = 1000;
        const H_TOP = 100;
        const H_BODY = 700;
        const H_BOTTOM = 20;
        const H_TOTAL = H_TOP + H_BODY + H_BOTTOM;

        const COLUMNS = [
            {
                width: 250,
                levels: ['BOD-E1-N1-P1', 'BOD-E1-N2-P1', 'BOD-E1-N3-P1', 'BOD-E1-N4-P1'], // Top to bottom
                heights: [200, 150, 150, 200]
            },
            {
                width: 250,
                levels: ['BOD-E2-N1-P1', 'BOD-E2-N2-P1', 'BOD-E2-N3-P1', 'BOD-E2-N4-P1'],
                heights: [200, 150, 150, 200]
            },
            {
                width: 250,
                levels: ['BOD-E3-N1-P1', 'BOD-E3-N2-P1', 'BOD-E3-N3-P1', 'BOD-E3-N4-P1'],
                heights: [200, 150, 150, 200]
            },
            {
                width: 250,
                levels: ['BOD-E4-N1-P1', 'BOD-E4-N2-P1', 'BOD-E4-N3-P1', 'BOD-E4-N4-P1'],
                heights: [200, 150, 150, 200]
            }
        ];

        const getBtnClass = (code) => {
            const isActive = readOnlyLocation ? code === readOnlyLocation : (isSelector ? false : searchTerm === code);
            return `relative transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden
                    ${isActive
                    ? 'bg-blue-600/60 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10 border-2'
                    : 'bg-[#0d0d1f] border-blue-900/60 hover:bg-blue-900/30 hover:border-blue-500 text-blue-400/80 border'
                }`;
        };

        const SubCell = ({ code, label, className = "", children }) => (
            <div onClick={(e) => { e.stopPropagation(); handleCellClick(code); }} className={`${getBtnClass(code)} ${className}`} title={label}>
                {children || <span className="text-[9px] font-mono leading-tight text-center px-1 w-full h-full flex items-center justify-center overflow-hidden">{code ? code.replace(/^(OFI-|BOD-)/, '') : label}</span>}
                <StockBadge code={code} />
            </div>
        );

        // Helper para obtener el label desde WAREHOUSE_LAYOUT
        const getLabel = (id) => {
            if (id.startsWith('BOD-TOP')) {
                return WAREHOUSE_LAYOUT.bodega.levels[0].sections.find(s => s.id === id)?.name || id;
            }
            const colIdx = parseInt(id.charAt(5)) - 1; // BOD-E1 -> 0
            const sections = WAREHOUSE_LAYOUT.bodega.levels[colIdx + 1].sections;
            return sections.find(s => s.id === id)?.name || id;
        };

        return (
            <div className="w-full flex items-center md:justify-center p-4 md:p-6 bg-[#050510] rounded-xl overflow-x-auto">
                <div
                    className="relative shrink-0 shadow-[0_0_80px_rgba(30,58,138,0.15)]"
                    style={{ height: '65vh', minHeight: '400px', maxHeight: '700px', aspectRatio: `${W_TOTAL} / ${H_TOTAL}` }}
                >
                    {/* FRANJA SUPERIOR (Techo) */}
                    <div className="absolute top-0 left-0 w-full flex bg-gradient-to-b from-[#1a1204] to-[#0d0d1f]" style={{ height: toPct(H_TOP, H_TOTAL) }}>
                        <div className="w-full h-full">
                            <SubCell code="BOD-TOP-01" label={getLabel("BOD-TOP-01")} className="w-full h-full" />
                        </div>
                    </div>

                    {/* CUERPO PRINCIPAL */}
                    <div className="absolute left-0 w-full flex border-t border-blue-900" style={{ top: toPct(H_TOP, H_TOTAL), height: toPct(H_BODY, H_TOTAL) }}>
                        {COLUMNS.map((col, colIdx) => (
                            <div key={`col-${colIdx}`} className="flex flex-col h-full border-r border-blue-900 last:border-r-0" style={{ width: toPct(col.width, W_TOTAL) }}>
                                {col.levels.map((levelId, lvlIdx) => (
                                    <div key={levelId} className="flex-none p-1 bg-[#0a0a16] border-b border-blue-900/60 last:border-b-0 flex flex-col" style={{ height: toPct(col.heights[lvlIdx], H_BODY) }}>
                                        <SubCell code={levelId} label={getLabel(levelId)} className="w-full h-full" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* FRANJA INFERIOR */}
                    <div className="absolute bottom-0 left-0 w-full border-t border-blue-900/60 bg-[#0d0d1f] flex items-center justify-center" style={{ height: toPct(H_BOTTOM, H_TOTAL) }}>
                        <span className="text-[9px] text-blue-500/40 font-mono uppercase tracking-widest">Suelo</span>
                    </div>
                </div>
            </div>
        );
    };

    if (readOnlyLocation) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#0B1121] rounded-xl overflow-hidden p-6">
                {activeTab === 'oficina' ? <OficinaVisualizer /> : <BodegaVisualizer />}
            </div>
        );
    }

    return (
        <div className={`bg-[#0f172a] rounded-xl shadow-lg border border-slate-800 overflow-hidden ${isSelector ? '' : 'mb-6'} animate-in fade-in duration-500 w-full`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-slate-800/50 gap-4">
                <div className="flex-1 w-full">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <MapPin className="text-blue-500" size={24} />
                        {isSelector ? 'Seleccionar Ubicación' : 'Visualizador de Almacén'}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {isSelector 
                            ? 'Haz clic en un módulo o gaveta para asignarlo como ubicación del ítem.' 
                            : 'Haz clic en un módulo o gaveta para filtrar los ítems en esa ubicación.'}
                    </p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex w-full md:w-auto bg-slate-800/80 p-1 rounded-lg border border-slate-700/50" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setActiveTab('oficina')}
                            className={`flex-1 md:flex-none px-2 md:px-6 py-2.5 rounded-md text-xs md:text-sm font-bold transition-all ${activeTab === 'oficina'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                }`}
                        >
                            Oficina TI
                        </button>
                        <button
                            onClick={() => setActiveTab('bodega')}
                            className={`flex-1 md:flex-none px-2 md:px-6 py-2.5 rounded-md text-xs md:text-sm font-bold transition-all ${activeTab === 'bodega'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                }`}
                        >
                            Bodega TI
                        </button>
                    </div>
                    {isSelector && onClose && (
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors">
                            <X size={24} />
                        </button>
                    )}
                </div>
            </div>

            <div className="p-6 bg-[#0B1121]">
                {activeTab === 'oficina' ? <OficinaVisualizer /> : <BodegaVisualizer />}
            </div>

            {/* Panel inferior para ítems en la ubicación seleccionada */}
            {!isSelector && !readOnlyLocation && searchTerm && searchTerm.match(/^(OFI|BOD)-/) && (
                <div className="border-t border-slate-800 bg-[#1e293b] p-6 animate-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Package className="text-blue-400" size={20} />
                        Ítems en {searchTerm}
                    </h3>
                    <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
                        {(() => {
                            const locationItems = allItems.filter(item => {
                                if (item.ubicaciones && Array.isArray(item.ubicaciones)) {
                                    return item.ubicaciones.some(loc => loc.ubicacion === searchTerm);
                                }
                                return item.ubicacion === searchTerm;
                            });
                            
                            if (locationItems.length === 0) {
                                return (
                                    <div className="p-8 text-center text-slate-400 text-sm font-medium">
                                        No hay ítems registrados en esta ubicación.
                                    </div>
                                );
                            }
                            
                            return locationItems.map(item => (
                                <PartRow 
                                    key={item.id || item.cod_producto} 
                                    item={item} 
                                    onView={() => setSelectedItem(item)}
                                    onEdit={() => {}} // Usually edit opens a modal handled by parent, but we might just do nothing here to keep it simple, or trigger an edit event if needed. Let's just pass empty for now.
                                />
                            ));
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WarehouseVisualizer;
