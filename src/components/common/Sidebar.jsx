import React from 'react';
import { useInventory } from '../../context/InventoryContext';

const Sidebar = ({ activeView, setView }) => {
    const { setSearchTerm } = useInventory();
    const navItems = [
        { id: 'inventory', label: 'Inventario', icon: 'inventory_2' },
        { id: 'locations', label: 'Ubicaciones', icon: 'location_on' },
        { id: 'settings', label: 'Configuración', icon: 'settings' }
    ];

    return (
        <aside className="w-[280px] bg-white dark:bg-[#1a1c23] border-r border-slate-100 dark:border-white/5 flex flex-col h-screen sticky top-0 shrink-0">
            <div className="p-8 flex items-center gap-4">
                <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-[#3B82F6]">
                    <span className="material-symbols-outlined text-2xl">camera_outdoor</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold dark:text-white leading-tight">StockVision TI</h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Inventario Visual</p>
                </div>
            </div>

            <nav className="flex-1 px-4 mt-4 flex flex-col gap-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            if (item.id === 'inventory') {
                                setSearchTerm('');
                            }
                            setView(item.id);
                        }}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${activeView === item.id
                            ? 'bg-blue-50 dark:bg-blue-600/10 text-[#3B82F6]'
                            : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                            }`}
                    >
                        <span className={`material-symbols-outlined ${activeView === item.id ? 'text-[#3B82F6]' : 'text-slate-400 group-hover:text-slate-600'}`}>
                            {item.icon}
                        </span>
                        <span className="font-bold text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>


        </aside>
    );
};

export default Sidebar;
