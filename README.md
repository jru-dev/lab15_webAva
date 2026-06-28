# 🛒 Mini Marketplace Full Stack

Proyecto desarrollado para el laboratorio del curso **Desarrollo de Aplicaciones Web Avanzado**.

El sistema consiste en un Mini Marketplace que permite visualizar, administrar y gestionar productos mediante una arquitectura Full Stack utilizando Node.js, Express, MySQL y Next.js.

---

## 🚀 Tecnologías utilizadas

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Railway
- CORS
- dotenv

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Despliegue

- Backend: Render
- Base de datos: Railway
- Frontend: Vercel

---

# 📁 Estructura del proyecto

```
Mini-Marketplace
│
├── backend-marketplace
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend-marketplace
    ├── app
    ├── components
    ├── types
    ├── public
    └── package.json
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
```

Entrar al proyecto

```bash
cd TU-REPOSITORIO
```

---

# 🔧 Configuración del Backend

Entrar al backend

```bash
cd backend-marketplace
```

Instalar dependencias

```bash
npm install
```

Crear el archivo `.env`

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

PORT=3001
```

Ejecutar

```bash
npm run dev
```

Servidor disponible en

```
http://localhost:3001
```

---

# 💻 Configuración del Frontend

Entrar al frontend

```bash
cd frontend-marketplace
```

Instalar dependencias

```bash
npm install
```

Crear el archivo `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Ejecutar

```bash
npm run dev
```

Aplicación disponible en

```
http://localhost:3000
```

---

# 📌 Funcionalidades

## Cliente

- Visualización de productos
- Detalle de producto
- Filtrado por categorías
- Inicio de sesión
- Registro de usuarios

## Administrador

- Gestión de productos
- Crear productos
- Editar productos
- Eliminar productos
- Acceso protegido mediante roles

---

# 🔐 Roles

| Rol | Permisos |
|------|-----------|
| CUSTOMER | Ver productos |
| ADMIN | Administración completa |

---

# 📡 API REST

## Productos

| Método | Endpoint | Descripción |
|----------|-----------|-------------|
| GET | /api/products | Obtener productos |
| GET | /api/products/:id | Obtener producto |
| POST | /api/products | Crear producto |
| PUT | /api/products/:id | Actualizar producto |
| DELETE | /api/products/:id | Eliminar producto |

---

# 🗄️ Base de Datos

El proyecto utiliza **MySQL** alojado en Railway.

Tablas principales:

- Users
- Roles
- Products
- Categories

---

# 🌐 Despliegue

## Backend (Render)

https://TU-BACKEND.onrender.com

## Frontend (Vercel)

https://TU-FRONTEND.vercel.app

---

# 👤 Credenciales de prueba

## Administrador

```
Correo:
vargas@gmail.com

Contraseña:
vargas123
```

## Cliente

```
Correo:
cliente@marketplace.com

Contraseña:
cliente123
```

---

---

# 📄 Licencia

Proyecto desarrollado con fines académicos para el curso de Desarrollo de Aplicaciones Web Avanzado.