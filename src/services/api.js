import axios from 'axios';

const API_URL = import.meta.env.DEV ? `http://${window.location.hostname}:3001/api` : '/api';

export const api = {
    getAll: async () => {
        try {
            const response = await axios.get(`${API_URL}/items`);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching items:', error);
            throw new Error(error.response?.data?.message || 'Error al conectar con el servidor local.');
        }
    },

    create: async (item) => {
        try {
            const response = await axios.post(`${API_URL}/items`, item);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw new Error(error.response?.data?.message || 'Error al crear el repuesto.');
        }
    },

    update: async (id, item) => {
        try {
            const response = await axios.put(`${API_URL}/items/${id}`, item);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw new Error(error.response?.data?.message || 'Error al actualizar el repuesto.');
        }
    },

    delete: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/items/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw new Error('Error al eliminar el repuesto.');
        }
    },

    uploadImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('imagen', file);
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // El backend devuelve algo como /uploads/123.jpg
            return `http://localhost:3001${response.data.url}`;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Error al subir la imagen.');
        }
    }
};
