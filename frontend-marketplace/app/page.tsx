import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
    const res = await fetch('http://localhost:3001/api/products', {
        cache: 'no-store'
    });
    
    if (!res.ok) {
        throw new Error('Error al cargar los productos');
    }
    
    return res.json();
}

export default async function HomePage() {
    const products = await getProducts();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Productos Disponibles</h1>
            
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No hay productos disponibles</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-2">{product.nombre}</h2>
                            <p className="text-gray-600 mb-2 line-clamp-2">{product.descripcion}</p>
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