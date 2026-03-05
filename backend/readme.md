src/
├── @types/             # Definições de tipos globais (ex: extensões do Express)
├── config/             # Configurações globais (banco de dados, variáveis de ambiente)
├── modules/            # Onde a mágica acontece (Organizado por domínio)
│   ├── users/          # Exemplo de módulo de Usuários
│   │   ├── dtos/       # Data Transfer Objects (interfaces para entrada de dados)
│   │   ├── entities/   # Modelos do banco de dados (se usar ORM)
│   │   ├── repositories/ # Camada de acesso aos dados
│   │   ├── services/   # Regras de negócio
│   │   ├── users.controller.ts
│   │   └── users.routes.ts
│   └── auth/           # Módulo de Autenticação
├── shared/             # Código compartilhado entre diferentes módulos
│   ├── errors/         # Classes de erro customizadas (AppError.ts)
│   ├── infra/          # Implementações técnicas (HTTP, TypeORM, Prisma)
│   │   └── http/
│   │       ├── middlewares/ # Middlewares globais (ex: autenticação, logs)
│   │       └── routes/      # Agregador de todas as rotas
│   └── container/      # Injeção de dependência (se optar por usar)
├── app.ts              # Configuração do Express
└── server.ts           # Inicialização do servidor

docker run --name meu-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123123 -e POSTGRES_DB=database -p 5432:5432 -d postgres