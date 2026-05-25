import { PrismaClient } from "@prisma/client/extension";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

//Mysqlコネクションアダプター
const adapter = new PrismaMariaDb({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    allowPublicKeyRetrieval: true,
    connectionLimit:5
})

//Nodejsのグローバルスコープにprismaを保存するための準備
export const globalForPrisma = globalThis as unknown as{ prisma: PrismaClient | undefined; }

//prismaインスタンスの作成または再利用
export const prisma = adapter ?? new PrismaClient(adapter);

//本番環境でなけれなばPrismaClientをglobalThisに保存
if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;