import React, { useState, useEffect, useRef } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { api } from '../../services/api';
import { LOCATION_OPTIONS } from '../../config/warehouseLayout';
import { X, Save, Upload, AlertCircle, Image as ImageIcon, MapPin, PlusCircle } from 'lucide-react';
import WarehouseVisualizer from '../visualizer/WarehouseVisualizer';

const PartForm = ({ onClose }) => {
    const { updateItem, selectedItem, loading, error: contextError } = useInventory();
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [pickerTab, setPickerTab] = useState('oficina');
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        cod_producto: '',
        producto: '',
        marca: '',
        ubicaciones: [],
        url_imagen: '',
        categoria: ''
    });

    useEffect(() => {
        if (selectedItem) {
            setFormData({
                ...selectedItem,
                stock_total: selectedItem.stock_total?.toString() || '0'
            });
        }
    }, [selectedItem]);

    // Las opciones se importan directamente desde warehouseLayout.js


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);
        try {
            const url = await api.uploadImage(file);
            setFormData(prev => ({ ...prev, url_imagen: url }));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const success = await updateItem(selectedItem.id, formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0f172a] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-slate-800">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]">
                    <div>
                        <h2 className="text-xl font-bold text-white">Editar Ítem</h2>
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">{formData.cod_producto}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh]">
                    {(error || contextError) && (
                        <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/20 flex items-center gap-3">
                            <AlertCircle size={18} />
                            {error || contextError}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Producto *</label>
                            <input
                                required
                                name="producto"
                                value={formData.producto}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-[#1e293b] text-white border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ej: Switch TP-Link 24 Puertos"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Código SKU *</label>
                            <input
                                required
                                name="cod_producto"
                                value={formData.cod_producto}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-[#1e293b] text-white border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categoría</label>
                            <input
                                name="categoria"
                                value={formData.categoria || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-[#1e293b] text-white border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-500"
                                placeholder="Redes, Periféricos, Insumos..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Marca</label>
                            <input
                                name="marca"
                                value={formData.marca || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-[#1e293b] text-white border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Modelo</label>
                            <input
                                name="modelo"
                                value={formData.modelo || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-[#1e293b] text-white border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ubicaciones y Stock</label>
                            <div className="space-y-3">
                                {(formData.ubicaciones || []).map((loc, idx) => (
                                    <div key={idx} className="flex gap-3 items-center">
                                        <div className="flex-1 flex bg-[#1e293b] border border-slate-700 rounded-lg overflow-hidden">
                                            <div className="px-3 flex items-center justify-center bg-slate-800 text-slate-400 border-r border-slate-700">
                                                <MapPin size={16} />
                                            </div>
                                            <input
                                                readOnly
                                                value={loc.ubicacion || 'Sin asignar'}
                                                className="w-full px-4 py-2 bg-transparent text-white text-sm font-mono outline-none"
                                            />
                                        </div>
                                        <div className="w-32 flex bg-[#1e293b] border border-slate-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                                            <input
                                                type="number"
                                                min="0"
                                                value={loc.stock}
                                                onChange={(e) => {
                                                    const newArr = [...(formData.ubicaciones || [])];
                                                    newArr[idx] = { ...newArr[idx], stock: parseInt(e.target.value) || 0 };
                                                    setFormData(prev => ({...prev, ubicaciones: newArr}));
                                                }}
                                                className="w-full text-center py-2 bg-transparent border-none outline-none font-bold text-white"
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                const newArr = [...(formData.ubicaciones || [])];
                                                newArr.splice(idx, 1);
                                                setFormData(prev => ({...prev, ubicaciones: newArr}));
                                            }}
                                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setPickerTab('oficina'); setShowPicker(true); }}
                                        className="flex-1 py-2 bg-blue-900/30 text-blue-400 border border-blue-800 rounded-lg text-xs font-bold hover:bg-blue-800/50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <PlusCircle size={14} /> Añadir en Mueble
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setPickerTab('bodega'); setShowPicker(true); }}
                                        className="flex-1 py-2 bg-blue-900/30 text-blue-400 border border-blue-800 rounded-lg text-xs font-bold hover:bg-blue-800/50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <PlusCircle size={14} /> Añadir en Bodega
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Imagen Referencial</label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-lg border border-slate-700 overflow-hidden bg-[#1e293b] flex items-center justify-center shrink-0">
                                    {formData.url_imagen ? (
                                        <img src={formData.url_imagen} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="text-slate-500" size={24} />
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className="w-full md:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                                    >
                                        <Upload size={16} />
                                        {isUploading ? 'Subiendo...' : 'Subir Imagen Local'}
                                    </button>
                                    <input
                                        name="url_imagen"
                                        value={formData.url_imagen}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#1e293b] text-white border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-500"
                                        placeholder="O ingrese URL externa (https://...)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading || isUploading}
                            className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal Selector de Ubicación */}
            {showPicker && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-5xl animate-in zoom-in-95 duration-200">
                        <WarehouseVisualizer 
                            isSelector={true} 
                            initialTab={pickerTab} 
                            onSelectLocation={(loc) => {
                                setFormData(prev => ({ 
                                    ...prev, 
                                    ubicaciones: [...(prev.ubicaciones || []), { ubicacion: loc, stock: 1 }] 
                                }));
                                setShowPicker(false);
                            }}
                            onClose={() => setShowPicker(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartForm;
