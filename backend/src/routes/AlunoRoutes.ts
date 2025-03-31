import { Router } from "express";
import Aluno from "../models/Aluno";

const router = Router();

// Rota para buscar todos os itens
router.get("/", async (req, res) => {
  try {
    const items = await Aluno.findAll();
    res.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ message: "Erro ao buscar itens" });
  }
});

// Rota para inserir um novo item
router.post("/", async (req, res) => {
  try {
    const { nome, email, data_nascimento, cpf } = req.body;
    const newItem = await Aluno.create({ nome, email, data_nascimento, cpf });
    res.status(201).json(newItem); 
  } catch (error) {
    console.error("Erro ao inserir item:", error);
    res.status(500).json({ message: "Erro ao inserir item" });
  }
});

// Rota para atualizar um item
/*
router.put("/:id", async (req, res) => {
  try {
    const { nome, email, data_nascimento, cpf} = req.body;
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    aluno.nome = nome;
    aluno.email = email;
    aluno.data_nascimento = data_nascimento;
    aluno.cpf = cpf;
    await aluno.save();

    res.json(aluno);
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    res.status(500).json({ message: "Erro ao atualizar item" });
  }
});
*/
export default router;
