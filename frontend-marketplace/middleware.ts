import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas públicas (no requieren autenticación)
const publicRoutes = ['/login', '/register'];

// Rutas que requieren rol ADMIN
const adminRoutes = ['/admin'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Verificar si la ruta es pública
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    
    // Verificar si requiere ADMIN
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

    // Si no hay token y no es ruta pública, redirigir a login
    if (!token && !isPublicRoute) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Si hay token y está en login/register, redirigir a home
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Si es ruta ADMIN, verificar rol (se hace en el frontend)
    // Pero el token contiene la info, podríamos decodificarlo
    if (isAdminRoute && token) {
        try {
            // Decodificar token JWT para verificar rol
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const payload = JSON.parse(jsonPayload);
            
            // Si no es ADMIN, redirigir a home
            if (payload.rol !== 'ADMIN') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            // Si hay error al decodificar, redirigir a login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
    ],
};