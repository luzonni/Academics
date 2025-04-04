import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import alunoRoute from "./routes/AlunoRoutes";
import cursoRouter from "./routes/CursoRouter"
import disciplinaRouter from "./routes/DisciplinaRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/aluno", alunoRoute);
app.use("/api/curso", cursoRouter);
app.use("/api/disciplina", disciplinaRouter);

const PORT = process.env.SERVER_PORT || 5000; 

sequelize
  .authenticate()
  .then(async () => {
    console.log("Conexão com o banco de dados bem-sucedida.");
    await sequelize.sync(); // Garante que os modelos sejam criados no banco
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
