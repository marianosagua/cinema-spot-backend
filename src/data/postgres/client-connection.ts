import { PrismaClient } from "@prisma/client";

/**
 * An instance of PrismaClient for managing database connectivity to the PostgreSQL database.
 *
 * This exported constant serves as the primary interface for executing database queries and 
 * transactions using Prisma ORM throughout the backend of the Movie Reservation System.
 *
 * @remarks
 * - Ensure that the necessary environment variables and Prisma configurations are set up correctly.
 * - It is advisable to maintain a single instance of PrismaClient to optimize connection usage and prevent
 *   potential connection leaks.
 * - Handle lifecycle management (i.e., connecting and disconnecting) suitably in your application logic.
 *
 * @see {@link https://www.prisma.io/docs/} for comprehensive documentation on Prisma ORM.
 */
export const prismaClient = new PrismaClient();
