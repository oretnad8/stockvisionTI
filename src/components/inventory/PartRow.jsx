import React from 'react';
import { Package, MapPin, Tag, Monitor, Edit2 } from 'lucide-react';

const PartRow = ({ item, onView, onEdit }) => {
    const stock = parseInt(item.stock_total || 0, 10);
    const isOutOfStock = stock === 0;
    const isLowStock = stock < 5;

    const getStatusColor = () => {
        if (isOutOfStock) return 'bg-red-500';
        if (isLowStock) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    const getStatusText = () => {
        if (isOutOfStock) return 'Sin Stock';
        if (isLowStock) return `Stock Bajo (${stock})`;
        return `En Stock (${stock})`;
    };

    return (
        <div
            onClick={onView}
            className="group flex flex-col md:flex-row md:items-center px-4 md:px-6 py-4 bg-transparent hover:bg-slate-800/50 transition-all border-b border-slate-800/50 cursor-pointer"
        >
            {/* Visual Ref / SKU / Name */}
            <div className="flex-1 min-w-[300px] flex items-center gap-4 md:gap-6 mb-3 md:mb-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center">
                    {item.url_imagen ? (
                        <img
                            src={item.url_imagen}
                            alt={item.producto}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Package className="text-slate-300" size={24} />
                    )}
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded w-fit uppercase tracking-widest">
                        {item.cod_producto}
                    </span>
                    <h3 className="font-bold text-sm text-slate-200 truncate">{item.producto}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest truncate">
                        {item.marca && <span>{item.marca}</span>}
                        {item.modelo && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                <span>{item.modelo}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Ubicación */}
            <div className="w-32 hidden lg:flex items-center gap-2 text-slate-400">
                <MapPin size={16} className="shrink-0" />
                <span className="text-xs font-mono font-bold tracking-tight truncate" title={item.ubicaciones?.map(u => u.ubicacion).join(', ')}>
                    {item.ubicaciones?.length > 1 
                        ? `${item.ubicaciones.length} Ubicaciones` 
                        : (item.ubicaciones?.[0]?.ubicacion || item.ubicacion || '-- --')}
                </span>
            </div>

            {/* Stock Level */}
            <div className="w-40 flex items-center justify-between md:justify-start gap-3">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                    <span className={`text-xs font-bold leading-none ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {getStatusText()}
                    </span>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="md:hidden p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Edit2 size={16} />
                </button>
            </div>
            
            {/* Desktop Edit Button */}
            <div className="hidden md:flex justify-end ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Edit2 size={18} />
                </button>
            </div>

        </div>
    );
};

export default PartRow;
