export interface Product {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    categoryId: number | null;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    categoria?: Category;
}

export interface Category {
    id: number;
    nombre: string;
    descripcion: string;
}

// ✅ Agregar esta interfaz
export interface ProductFormData {
    nombre: string;
    precio: number;
    descripcion: string;
    categoryId?: number;
    imageUrl?: string;
}