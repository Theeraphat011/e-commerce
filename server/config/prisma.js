const { PrismaClient } = require('@prisma/client') // Import PrismaClient
const prisma = new PrismaClient() // Create a new instance of PrismaClient

module.exports = prisma // Export prisma instance

