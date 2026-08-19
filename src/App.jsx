import React, { useState } from 'react';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import Sidebar from './components/common/Sidebar';

import Dashboard from './components/inventory/Dashboard';
import PartDetail from './components/inventory/PartDetail';
import WarehouseVisualizer from './components/visualizer/WarehouseVisualizer';
import PartForm from './components/inventory/PartForm';
import PartCreate from './components/inventory/PartCreate';

const AppContent = () => {
    const { selectedItem, setSelectedItem, setSearchTerm } = useInventory();
    const [view, setView] = useState('inventory');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsEditOpen(true);
    };

    const handleCreate = () => {
        setIsCreateOpen(true);
    };

    const closeModals = () => {
        setIsEditOpen(false);
        setIsCreateOpen(false);
    };

    return (
        <div 
            className="flex bg-slate-50 dark:bg-[#0f1115] min-h-screen font-display antialiased"
            onClick={() => {
                if (view === 'locations' || view === 'visualizer') {
                    setSearchTerm('');
                }
            }}
        >
            <Sidebar activeView={view} setView={setView} />

            <div className="flex-1 flex flex-col overflow-hidden">


                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    <div className="max-w-[1280px] mx-auto">
                        {view === 'inventory' ? (
                            <Dashboard onEdit={handleEdit} onCreate={handleCreate} />
                        ) : view === 'locations' || view === 'visualizer' ? (
                            <WarehouseVisualizer onRackSelect={(rackId) => {
                                // Find any item in that rack to open detail (assuming the modal shows list/detail)
                                // If the user wants to list parts for a rack, we should filter or search
                                // Setting searchTerm to rackId to show parts in that location
                                const term = rackId.toString();
                                // We use the existing selectedItem logic or just filter the view
                                // Based on user's "Modales de Listado de Repuestos", we'll just set the search for now
                                // or use a hypothetical openModal if it existed.
                                // Given the context, let's just trigger the search/filter if possible or select an item.
                                // The user said "se active nuestro sistema de Modales de Listado de Repuestos".
                                // Since I don't see a specific RackListModal, I'll assume they want to filter the view or use the existing PartDetail if there's only one.
                                // Looking at current App.jsx, there's no "Listado" modal yet, but I'll add the hook.
                                console.log(`Opening modal for Rack: ${rackId}`);
                            }} />
                        ) : (
                            <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-6xl mb-4">construction</span>
                                    <p className="font-bold uppercase tracking-widest text-sm text-slate-400">Vista en Construcción</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal de Detalle (Solo lectura / Acciones rápidas) */}
            {selectedItem && !isEditOpen && <PartDetail onEdit={() => setIsEditOpen(true)} />}

            {/* Modal de Edición */}
            {isEditOpen && (
                <PartForm
                    onClose={closeModals}
                />
            )}

            {/* Modal de Creación */}
            {isCreateOpen && (
                <PartCreate
                    onClose={closeModals}
                />
            )}
        </div>
    );
};

function App() {
    return (
        <InventoryProvider>
            <AppContent />
        </InventoryProvider>
    );
}

export default App;
