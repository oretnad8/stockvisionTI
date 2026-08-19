import React from 'react';
import { useInventory } from '../../context/InventoryContext';

const Header = ({ setView, activeView, onAddClick }) => {
    const { searchTerm, setSearchTerm } = useInventory();

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f1f0f4] dark:border-white/10 bg-surface-light dark:bg-[#1e293b] px-10 py-3 shadow-sm">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 text-slate-900 dark:text-white cursor-pointer" onClick={() => setView('inventory')}>
                    <div className="size-8 text-[#3B82F6] flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">shutter_speed</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">StockVision TI</h2>
                </div>

                <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full group">
                        <div className="text-slate-400 dark:text-slate-400 flex border-none bg-slate-100 dark:bg-slate-900 items-center justify-center pl-4 rounded-l-xl group-focus-within:text-[#3B82F6] transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-0 px-4 rounded-r-xl text-base font-normal placeholder:text-slate-400"
                            placeholder="Buscar repuestos, SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 justify-end gap-8">
                <nav className="hidden lg:flex items-center gap-9">
                    <button
                        onClick={() => setView('inventory')}
                        className={`text-sm font-medium transition-colors ${activeView === 'inventory' ? 'text-[#3B82F6] font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-[#3B82F6]'}`}
                    >
                        Inventario
                    </button>
                    <button
                        onClick={() => setView('visualizer')}
                        className={`text-sm font-medium transition-colors ${activeView === 'visualizer' ? 'text-[#3B82F6] font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-[#3B82F6]'}`}
                    >
                        Mapa de Bodega
                    </button>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onAddClick}
                        className="hidden sm:flex items-center justify-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-md"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                        Nuevo Repuesto
                    </button>
                    <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="bg-slate-200 dark:bg-slate-700 rounded-full size-10 border-2 border-white dark:border-slate-800 shadow-sm cursor-pointer overflow-hidden">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXh9kg6JPry8uvMExYyJqmL8i6Asmxr-fx1bGTKQOOms4DLT5mmWpujLoWQs-I41bBIk9CpS6op-Lvb7ozYyURukBGTYHWIIqs6q0D9G8ySmuyPFLBJn3J5k9oZiLW-f5ax28qxLiKj2Qs0sy3iNnXr1V0DtMhllQ5fz0KUZgs6lb_Fd9KMfENx400EaesZ9IvTneJewttP82ztyB7QpikEb39ZuYNfX_b2_OA_8YtomcjqEQ43V9x48LR9VNh3rUDcVHTFVgz3FE" alt="Profile" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
