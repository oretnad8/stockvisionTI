import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const InventoryContext = createContext();

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory debe ser usado dentro de un InventoryProvider');
    }
    return context;
};

export const InventoryProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const data = await api.getAll();
            setItems(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar el inventario: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const createItem = async (newItem) => {
        setLoading(true);
        try {
            await api.create(newItem);
            await fetchItems();
            setError(null);
            return true;
        } catch (err) {
            setError('Error al crear el repuesto: ' + err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateItem = async (id, updatedData) => {
        setLoading(true);
        try {
            await api.update(id, updatedData);
            await fetchItems();
            if (selectedItem && selectedItem.id === id) {
                // Refresh selected item from the new items list
                const refreshedItems = await api.getAll(); // Direct fetch to ensure sync
                const updated = refreshedItems.find(i => i.id === id);
                setSelectedItem(updated || null);
            }
            setError(null);
            return true;
        } catch (err) {
            setError('Error al actualizar el repuesto: ' + err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        setLoading(true);
        try {
            await api.delete(id);
            await fetchItems();
            if (selectedItem && selectedItem.id === id) {
                setSelectedItem(null);
            }
            setError(null);
            return true;
        } catch (err) {
            setError('Error al eliminar el repuesto: ' + err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const filteredItems = items.filter(item => {
        const term = searchTerm.toLowerCase();
        
        // Search in regular fields
        const matchBasic = (
            item.producto?.toLowerCase().includes(term) ||
            item.cod_producto?.toLowerCase().includes(term) ||
            item.marca?.toLowerCase().includes(term) ||
            item.modelo?.toLowerCase().includes(term)
        );

        if (matchBasic) return true;

        // Search in locations array
        if (item.ubicaciones && Array.isArray(item.ubicaciones)) {
            return item.ubicaciones.some(loc => loc.ubicacion?.toLowerCase().includes(term));
        }

        return false;
    });

    const value = {
        items: filteredItems,
        allItems: items,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedItem,
        setSelectedItem,
        createItem,
        updateItem,
        deleteItem,
        refreshItems: fetchItems
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
};
