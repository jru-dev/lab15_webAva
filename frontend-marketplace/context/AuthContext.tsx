'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
    id: number;
    email: string;
    nombre: string;
    rolId: number;
    rol: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, nombre: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Función para setear cookie (para middleware)
const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Función para eliminar cookie
const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Función para obtener cookie
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar token en localStorage y cookie
        const token = localStorage.getItem('token') || getCookie('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`);
            setUser(response.data);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            localStorage.removeItem('token');
            deleteCookie('token');
            delete axios.defaults.headers.common['Authorization'];
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;
            
            // Guardar en localStorage
            localStorage.setItem('token', token);
            
            // Guardar en cookie (para middleware)
            setCookie('token', token);
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            toast.success('¡Bienvenido!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al iniciar sesión');
            throw error;
        }
    };

    const register = async (email: string, password: string, nombre: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { 
                email, 
                password, 
                nombre 
            });
            const { token, user } = response.data;
            
            // Guardar en localStorage
            localStorage.setItem('token', token);
            
            // Guardar en cookie (para middleware)
            setCookie('token', token);
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            toast.success('¡Registro exitoso!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al registrarse');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        deleteCookie('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        toast.success('Sesión cerrada');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.rol === 'ADMIN'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}