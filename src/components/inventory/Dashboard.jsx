import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import PartRow from './PartRow';
import { Search, MapPin, Grid, AlertTriangle, XCircle, CheckCircle2, PlusCircle, Download, Upload } from 'lucide-react';

const Dashboard = ({ onEdit, onCreate }) => {
    const { items, loading, error, setSelectedItem, searchTerm, setSearchTerm } = useInventory();
    const [filter, setFilter] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('Todas las Ubicaciones');

    const lowStockCount = items.filter(i => parseInt(i.stock_total || 0, 10) < 5 && parseInt(i.stock_total || 0, 10) > 0).length;
    const outOfStockCount = items.filter(i => parseInt(i.stock_total || 0, 10) === 0).length;
    const inStockCount = items.filter(i => parseInt(i.stock_total || 0, 10) >= 5).length;

    // Extract unique locations from data
    const uniqueLocations = Array.from(new Set(items.map(i => i.ubicacion).filter(Boolean))).sort();

    const filteredItems = items.filter(i => {
        const stock = parseInt(i.stock_total || 0, 10);
        const matchesFilter =
            filter === 'low' ? (stock < 5 && stock > 0) :
                filter === 'out' ? (stock === 0) :
                    filter === 'in' ? (stock >= 5) : true;

        const searchStr = (searchTerm || '').toLowerCase();
        const matchesSearch =
            (i.producto || '').toLowerCase().includes(searchStr) ||
            (i.cod_producto || '').toLowerCase().includes(searchStr) ||
            (i.marca || '').toLowerCase().includes(searchStr) ||
            (i.ubicacion || '').toLowerCase().includes(searchStr);

        const matchesLocation = selectedLocation === 'Todas las Ubicaciones' || i.ubicacion === selectedLocation;

        return matchesFilter && matchesSearch && matchesLocation;
    });

    if (loading && items.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500/20 border-t-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-500 text-sm font-bold flex items-center gap-4">
                <AlertTriangle size={24} />
                {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Inventario General</h2>
                    <p className="text-slate-400 text-sm mt-1">Gestión de componentes y equipos de TI</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors" title="Importar JSON/CSV">
                        <Upload size={18} />
                    </button>
                    <button className="p-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors" title="Exportar CSV">
                        <Download size={18} />
                    </button>
                    <button
                        onClick={onCreate}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white shadow-sm flex items-center gap-2 transition-colors"
                    >
                        <PlusCircle size={18} />
                        Nuevo Ítem
                    </button>
                </div>
            </div>

            {/* Search and Filters Area */}
            <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por código, nombre, marca o ubicación..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#1e293b] text-white border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="w-full md:w-64 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full pl-10 pr-8 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm font-medium text-slate-200 appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="Todas las Ubicaciones">Todas las Ubicaciones</option>
                        {uniqueLocations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quick Stats / Filters */}
            <div className="flex flex-wrap gap-2">
                {[
                    { id: 'all', label: 'Todos', count: items.length, icon: Grid, activeColor: 'bg-slate-700 text-white border-slate-600', inactiveColor: 'text-slate-400 bg-[#0f172a] border-slate-800 hover:bg-slate-800 hover:text-slate-200' },
                    { id: 'low', label: 'Stock Bajo', count: lowStockCount, icon: AlertTriangle, activeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/50', inactiveColor: 'text-amber-500 bg-[#0f172a] border-slate-800 hover:bg-slate-800 hover:text-amber-400' },
                    { id: 'out', label: 'Sin Stock', count: outOfStockCount, icon: XCircle, activeColor: 'bg-red-500/20 text-red-400 border-red-500/50', inactiveColor: 'text-red-500 bg-[#0f172a] border-slate-800 hover:bg-slate-800 hover:text-red-400' },
                    { id: 'in', label: 'En Stock', count: inStockCount, icon: CheckCircle2, activeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50', inactiveColor: 'text-emerald-500 bg-[#0f172a] border-slate-800 hover:bg-slate-800 hover:text-emerald-400' }
                ].map((btn) => {
                    const Icon = btn.icon;
                    const isActive = filter === btn.id;
                    return (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${isActive ? btn.activeColor : btn.inactiveColor}`}
                        >
                            <Icon size={14} />
                            {btn.label}
                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? 'bg-black/30' : 'bg-slate-800/50'}`}>
                                {btn.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Inventory List Table */}
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                {/* Table Header */}
                <div className="hidden md:flex items-center px-6 py-3 bg-[#1e293b] border-b border-slate-800">
                    <div className="flex-1 min-w-[300px] text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Producto
                    </div>
                    <div className="w-32 hidden lg:block text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Ubicación
                    </div>
                    <div className="w-40 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Stock
                    </div>
                    <div className="w-10"></div> {/* Espacio para el botón editar */}
                </div>

                {/* Table Content */}
                <div className="divide-y divide-slate-800/50">
                    {filteredItems.length === 0 ? (
                        <div className="p-16 text-center flex flex-col items-center gap-3 text-slate-400">
                            <Grid size={48} className="opacity-20" />
                            <p className="font-medium text-sm">No se encontraron ítems con este filtro</p>
                        </div>
                    ) : (
                        filteredItems.map((item) => (
                            <PartRow
                                key={item.id || item.cod_producto}
                                item={item}
                                onView={() => setSelectedItem(item)}
                                onEdit={() => onEdit(item)}
                            />
                        ))
                    )}
                </div>

                {/* Table Footer */}
                <div className="px-6 py-3 bg-[#1e293b] border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <p>
                        Mostrando <span className="font-bold text-white">{filteredItems.length}</span> de <span className="font-bold text-white">{items.length}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
