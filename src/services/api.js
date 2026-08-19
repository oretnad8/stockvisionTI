import axios from 'axios';

const BASE_URL = import.meta.env.DEV ? `http://${window.location.hostname}:3001` : '';
const API_URL = `${BASE_URL}/api`;

const compressImage = (file, maxWidth = 1024, quality = 0.7) => {
    return new Promise((resolve) => {
        if (!file.type.startsWith('image/')) {
            return resolve(file);
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) return resolve(file);
                        const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(newFile);
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = () => resolve(file);
        };
        reader.onerror = () => resolve(file);
    });
};

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
            const compressedFile = await compressImage(file, 1024, 0.7);
            const formData = new FormData();
            formData.append('imagen', compressedFile);
            
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // El backend devuelve algo como /uploads/123.jpg
            return `${BASE_URL}${response.data.url}`;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Error al subir la imagen.');
        }
    }
};
