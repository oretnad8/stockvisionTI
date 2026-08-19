import React from 'react';

const PartCard = ({ item, onView, onEdit }) => {
    const stock = parseInt(item['Stock Total'] || 0);
    const isLowStock = stock < 5; // Simplified threshold
    const isOutOfStock = stock === 0;

    return (
        <div
            onClick={onView}
            className="group bg-[#1e293b] rounded-xl border border-slate-700 shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer relative"
        >
            <div className="aspect-square relative overflow-hidden bg-slate-900">
                <img
                    src={item['URL Imagen'] || 'https://placehold.co/400x400?text=No+Image'}
                    alt={item.Producto}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Error+Loading+Image'; }}
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {isOutOfStock ? (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm">Sin Stock</span>
                    ) : isLowStock ? (
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm">Bajo Stock</span>
                    ) : (
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm">En Stock</span>
                    )}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-[#3B82F6] font-bold bg-blue-900/30 px-2 py-0.5 rounded border border-blue-800">
                        {item['Cod. Producto']}
                    </span>
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                        className="text-slate-400 hover:text-[#3B82F6] transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                </div>

                <div>
                    <h3 className="font-bold text-white line-clamp-1">{item.Producto}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                        {item['Marca Repuesto']} • {item['Modelo Impresora']}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-sm">location_on</span>
                        <span className="text-xs font-mono text-slate-300">{item.UBICACIÓN || 'N/A'}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-bold text-white">{stock}</span>
                        <span className="text-[10px] text-slate-400 ml-1 uppercase font-bold">Unidades</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartCard;
