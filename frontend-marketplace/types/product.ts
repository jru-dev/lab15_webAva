export interface Product {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductFormData {
    nombre: string;
    precio: number;
    descripcion: string;
}