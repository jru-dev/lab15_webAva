import { Product } from '@/types/product';

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        cache: 'no-store'
    });
    
    if (!res.ok) {
        throw new Error('Producto no encontrado');
    }
    
    return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    return (
        <div className="max-w-2xl mx-auto">
            <a href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Volver a productos
            </a>
            
            <div className="border rounded-lg p-6 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{product.nombre}</h1>
                <p className="text-gray-600 mb-4 text-lg">{product.descripcion}</p>
                <p className="text-4xl font-bold text-blue-600 mb-4">S/{product.precio}</p>
                <div className="text-sm text-gray-400">
                    <p>Creado: {new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
}