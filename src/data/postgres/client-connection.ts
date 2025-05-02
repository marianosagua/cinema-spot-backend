// Configuración y exportación del cliente Prisma para acceso a la base de datos.
//
// Este archivo inicializa y exporta una instancia única de PrismaClient, que se utiliza para interactuar con la base de datos PostgreSQL
// a través del ORM Prisma en la aplicación CinemaSpot.
//
// Exportaciones:
// - prismaClient: Instancia de PrismaClient lista para ser utilizada en cualquier parte del backend.
//
// Uso recomendado:
// Importar este cliente donde sea necesario realizar operaciones de base de datos, evitando crear múltiples instancias.
//
// Ejemplo de uso:
// import { prismaClient } from "../data/postgres/client-connection";
// const users = await prismaClient.user.findMany();
//
// Documentación oficial: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();
