import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { X, Edit2, Trash2, AlertCircle, MapPin, Package, Tag, Archive, Monitor } from 'lucide-react';
import WarehouseVisualizer from '../visualizer/WarehouseVisualizer';

const PartDetail = ({ onEdit }) => {
    const { selectedItem, setSelectedItem, deleteItem, loading, error } = useInventory();
    const [visualizeLocation, setVisualizeLocation] = useState(null);

    if (!selectedItem) return null;

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este repuesto?')) {
            const success = await deleteItem(selectedItem.id || selectedItem.cod_producto);
            if (success) setSelectedItem(null);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0f172a] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-slate-800">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]">
                    <div>
                        <h2 className="text-xl font-bold text-white leading-tight">Detalles del Ítem</h2>
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">{selectedItem.cod_producto}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onEdit}
                            className="p-2 rounded-lg hover:bg-blue-900/30 text-blue-400 transition-colors"
                            title="Editar"
                        >
                            <Edit2 size={20} />
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50"
                            title="Eliminar"
                        >
                            <Trash2 size={20} />
                        </button>
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors ml-2"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-6 py-6 overflow-y-auto max-h-[80vh]">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/20 flex items-center gap-3">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Image */}
                        <div className="lg:col-span-5 flex flex-col">
                            <div className="flex-1 bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center relative min-h-[300px]">
                                {selectedItem.url_imagen ? (
                                    <img
                                        src={selectedItem.url_imagen}
                                        alt={selectedItem.producto}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-slate-500">
                                        <Package size={64} className="mb-4 opacity-50" />
                                        <p className="text-sm font-medium">Sin imagen referencial</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Producto</label>
                                <h1 className="text-2xl font-bold text-white leading-tight">{selectedItem.producto}</h1>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Tag size={14}/> Marca</label>
                                    <p className="text-base font-semibold text-slate-200">{selectedItem.marca || '--'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Monitor size={14}/> Modelo</label>
                                    <p className="text-base font-semibold text-slate-200">{selectedItem.modelo || '--'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Archive size={14}/> Categoría</label>
                                    <p className="text-base font-semibold text-slate-200">{selectedItem.categoria || '--'}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Ubicaciones Asignadas</label>
                                {(selectedItem.ubicaciones || []).length === 0 ? (
                                    <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-500 text-sm">
                                        Sin ubicación asignada
                                    </div>
                                ) : (
                                    (selectedItem.ubicaciones || []).map((loc, idx) => (
                                        <div key={idx} className="p-4 bg-blue-900/10 border border-blue-900/30 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-blue-300">
                                                <MapPin size={24} />
                                                <div>
                                                    <p className="text-xl font-bold tracking-tight">{loc.ubicacion}</p>
                                                    <p className="text-sm font-medium text-blue-400/80">Stock: {loc.stock}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => setVisualizeLocation(loc.ubicacion)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors"
                                            >
                                                Ver
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Stock Box */}
                            <div className="bg-[#1e293b] rounded-xl p-5 border border-slate-700 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Disponible</h3>
                                </div>
                                <p className="text-4xl font-black text-white tracking-tighter">
                                    {selectedItem.stock_total || '0'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {visualizeLocation && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0f111a] rounded-xl border border-slate-700 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]">
                            <div>
                                <h2 className="text-lg font-bold text-white">Visualización de Ubicación</h2>
                                <p className="text-xs text-slate-400 mt-1">Ubicación: {visualizeLocation}</p>
                            </div>
                            <button onClick={() => setVisualizeLocation(null)} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
                            <WarehouseVisualizer
                                isSelector={true}
                                readOnlyLocation={visualizeLocation}
                                initialTab={visualizeLocation.startsWith('BOD-') ? 'bodega' : 'oficina'}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartDetail;
