'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/types/product';

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories`);
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const url = selectedCategory === 'all' 
                ? `${API_URL}/products`
                : `${API_URL}/products?categoryId=${selectedCategory}`;
            
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error al cargar productos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    if (loading) {
        return <p className="text-center">Cargando productos...</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Productos Disponibles</h1>
            
            {/* Filtro por categorías */}
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full transition ${
                        selectedCategory === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Todos
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id.toString())}
                        className={`px-4 py-2 rounded-full transition ${
                            selectedCategory === cat.id.toString()
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {cat.nombre}
                    </button>
                ))}
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">No hay productos en esta categoría</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            {product.imageUrl && (
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.nombre}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-2">{product.nombre}</h2>
                            <p className="text-gray-600 mb-2 line-clamp-2">{product.descripcion}</p>
                            {product.categoria && (
                                <p className="text-sm text-gray-500 mb-2">
                                    Categoría: {product.categoria.nombre}
                                </p>
                            )}
                            <p className="text-2xl font-bold text-blue-600">S/{product.precio}</p>
                            <a 
                                href={`/products/${product.id}`}
                                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Ver detalles
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}