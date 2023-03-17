# API Rest con NodeJS con TypeScript (TypeORM)

## Curso realizado de YouTube

Es importante destacar que este proyecto es el resultado de seguir una [lista](https://www.youtube.com/playlist?list=PLergODdA95keGVKSOPApWRw0XuA-ivH_u) de videos, cuyo autor es **codrr**

En este curso aprenderas como generar una API REST compleja con NodeJS utilizando como lenguage core `TypeScript` y `TypeORM` como ORM SQL.

## Tecnologias a aplicar:

- POO.
- MySQL como base de datos.
- Configuracion de TypeScript.
- Configuracion de rutas, controladores, servicios y entidades.

## Lista de dependencias para instalacion:

Dependencias necesarias:

```
npm install class-validator class-transformer cors dotenv express morgan mysql typeorm typeorm-naming-strategies typescript jsonwebtoken passport passport-jwt passport-local bcrypt
```

Dependencias de desarrollo necesarias:

```
npm install -D @types/cors @types/express @types/morgan concurrently nodemon ts-node @types/bcrypt @types/jsonwebtoken @types/passport-jwt @types/passport-local 
```

## Configurar las variables de entorno

**.env** (Desarrollo)

- PORT=8000 (ejemplo)
- DB_HOST=localhost
- DB_PORT=3306 (ejemplo)
- DB_DATABASE=codrr_db (ejemplo)
- DB_USER=root (ejemplo)
- DB_PASSWORD=password (ejemplo)
- JWT_SECRET=codrr@2023 (ejemplo)

**.production.env** (Producción)

- PORT=7000 (ejemplo)


## ¿De qué trata esta aplicación?

Características de la misma:

- Sistema de autenticación de usuarios (con passport)
- Posibilidad de realizar pedidos
- Implementación de validación de datos y middlewares
- Los usuarios tendrán roles asignados:
  - USER
  - CUSTOMER
  - ADMIN 
    - Los usuarios con este rol podrán eliminar y actualizar a los demás usuarios

