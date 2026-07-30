import pkg from '@prisma/client'
import type { PrismaClient as PrismaClientType } from '@prisma/client'
const { PrismaClient } = pkg
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

//データベースに接続するためのアダプターを定義
const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    allowPublicKeyRetrieval:true,
    connectionLimit:5,
})

// TypeScript の型定義を使って、Node.js のグローバルスコープに
// prisma を保存できるように準備（再利用のため）
const globalForPrisma = globalThis as unknown as {
    prisma : PrismaClientType | undefined;
}


// Prisma クライアントのインスタンスを作成または再利用する
// 開発環境ではファイル変更時にモジュールが何度も再読み込みされるため、
// new PrismaClient() を何回も呼ぶと DB 接続エラーが出る（接続数オーバー）
// それを防ぐため、一度作成したクライアントをグローバルに保存して使い回す
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// 本番環境でなければ、作成した PrismaClient を globalThis に保存
if (import.meta.dev) globalForPrisma.prisma = prisma;

//MEMO
//prisma7ではadapterの設定が必須,同時に使用するデータベースのアダプターをインストールしておく必要がある。
//Mysqlでprismaに接続する場合は公開鍵の取得の許可をtrueに設定する必要がある。
