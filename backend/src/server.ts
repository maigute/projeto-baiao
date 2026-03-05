import express from 'express';
import cors from 'cors';
import sequelize from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Função para conectar e sincronizar o banco
const startServer = async () => {
  try {
    // 1. Autentica a conexão
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // 2. Sincroniza os modelos (alter: true atualiza as tabelas se houver mudanças)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com o banco de dados.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
    process.exit(1); // Encerra o processo caso o banco falhe
  }
};

startServer();