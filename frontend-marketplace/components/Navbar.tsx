'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
                        🛒 Marketplace
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        {/* Links públicos */}
                        <Link href="/" className="hover:text-blue-200 transition">
                            Productos
                        </Link>
                        
                        {/* Links para ADMIN */}
                        {isAdmin && (
                            <Link href="/admin" className="hover:text-blue-200 transition">
                                Admin
                            </Link>
                        )}
                        
                        {/* Usuario autenticado */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm">
                                    👋 {user?.nombre} ({user?.rol})
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link href="/login" className="hover:text-blue-200 transition">
                                    Login
                                </Link>
                                <Link href="/register" className="hover:text-blue-200 transition">
                                    Registro
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}