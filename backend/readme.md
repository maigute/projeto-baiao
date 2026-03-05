```
📦backend
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜database.ts
 ┃ ┣ 📂controllers
 ┃ ┣ 📂middlewares
 ┃ ┣ 📂models
 ┃ ┣ 📂routes
 ┃ ┣ 📂schemas
 ┃ ┣ 📂services
 ┃ ┗ 📜server.ts
 ┣ 📜.env
 ┣ 📜.sequelizerc
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜readme.md
 ┗ 📜tsconfig.json
```

docker run --name meu-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123123 -e POSTGRES_DB=database -p 5432:5432 -d postgres