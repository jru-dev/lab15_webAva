'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/types/product'; 

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState<Product | null>(null);
    const [formData, setFormData] = useState<ProductFormData>({
        nombre: '',
        precio: 0,
        descripcion: ''
    });

    const API_URL = 'http://localhost:3001/api/products';

    // Cargar productos
    const fetchProducts = async () => {
        try {
            const res = await fetch(API_URL, { cache: 'no-store' });
            if (!res.ok) throw new Error('Error al cargar productos');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError('Error al cargar los productos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Crear producto
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('Error al crear producto');
            await fetchProducts();
            resetForm();
        } catch (err) {
            setError('Error al crear el producto');
            console.error(err);
        }
    };

    // Actualizar producto
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        try {
            const res = await fetch(`${API_URL}/${editing.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('Error al actualizar producto');
            await fetchProducts();
            resetForm();
        } catch (err) {
            setError('Error al actualizar el producto');
            console.error(err);
        }
    };

    // Eliminar producto
    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Error al eliminar producto');
            await fetchProducts();
        } catch (err) {
            setError('Error al eliminar el producto');
            console.error(err);
        }
    };

    // Editar producto (cargar datos en el formulario)
    const handleEdit = (product: Product) => {
        setEditing(product);
        setFormData({
            nombre: product.nombre,
            precio: product.precio,
            descripcion: product.descripcion
        });
    };

    // Resetear formulario
    const resetForm = () => {
        setEditing(null);
        setFormData({ nombre: '', precio: 0, descripcion: '' });
        setError('');
    };

    if (loading) return <p className="text-center">Cargando productos...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Administración de Productos</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={editing ? handleUpdate : handleCreate} className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    {editing ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                        className="border p-2 rounded"
                        required
                        step="0.01"
                    />
                    <textarea
                        placeholder="Descripción"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        className="border p-2 rounded md:col-span-2"
                        rows={3}
                        required
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        {editing ? 'Actualizar' : 'Crear'}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Lista de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow">
                        <h3 className="font-semibold text-lg">{product.nombre}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{product.descripcion}</p>
                        <p className="text-xl font-bold text-blue-600 mt-2">S/{product.precio}</p>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleEdit(product)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}