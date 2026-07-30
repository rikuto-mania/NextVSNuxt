import pkg from '@prisma/client'
import type { PrismaClient as PrismaClientType } from '@prisma/client'
const { PrismaClient } = pkg
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

//Mysqlコネクションアダプター
const adapter = new PrismaMariaDb({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port:Number(process.env.DB_PORT),
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    allowPublicKeyRetrieval: true,
    connectionLimit:20
})

//Nodejsのグローバルスコープにprismaを保存するための準備
export const globalForPrisma = globalThis as unknown as{ prisma: PrismaClientType | undefined; }

//prismaインスタンスの作成または再利用
export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

//本番環境でなけれなばPrismaClientをglobalThisに保存
if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;