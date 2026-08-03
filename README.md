# NextVSNuxt
<img width="1920" height="1080" alt="NextVSNuxt_thumbnail" src="https://github.com/user-attachments/assets/5377f633-ee0d-41b6-a0eb-cead484c590a" />

## 概要
Next.jsとNuxt.jsの比較研究  
本研究では、NextjsとNuxtjsを用いて同一のWebサイトを実装し、両フレームワークの開発効率、学習曲線を比較します。

## 起動方法
本プロジェクトはDockerを用いてコンテナ化されており、環境に依存せず簡単に起動することが可能です。

### 起動コマンド
ターミナルで以下のコマンドを実行し、コンテナを起動します。
```bash
docker compose up -d
```
　　  
起動後、ブラウザから以下のURLにアクセスして動作を確認できます。 
```bash
Next.js: http://localhost:3030  
```
```bash
Nuxt.js: http://localhost:3031
```

### 環境変数の設定　　　
開発を始める前に、各プロジェクト直下に `.env` ファイルを作成してください。  
`.env.example` をコピーして作成することで簡単に始めることができます。
```bash
cp .env.example .env
```
　　    
### テスト用ユーザーについて 
コンテナ起動時にデータベースへ初期データ（ダンプデータ）が挿入されます。ログイン等の動作確認には、以下のサンプル用アカウントをご利用ください。
| ユーザー名 | メールアドレス | パスワード |
|---|---|---|
| test01 | `test01@test.com` | `testuser01aa` |
| test02 | `test02@test.com` | `testuser02aa` |

  
## バージョン構成
以下のバージョンで比較・検証しています。

Next.js 16.2.6  
Nuxt.js 4.4.2  
Mysql 8.4

