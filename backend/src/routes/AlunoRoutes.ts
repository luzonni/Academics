import { Router } from "express";
import Aluno from "../models/Aluno";

const router = Router();

router.get("/aluno/", async (req, res) => {
  try {
    const items = await Aluno.findAll();
    res.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ message: "Erro ao buscar itens" });
  }
});

router.post("/aluno/", async (req, res) => {
  try {
    const { nome, email, data_nascimento, cpf } = req.body;
    const newAluno = await Aluno.create({ nome, email, data_nascimento, cpf });
    res.status(201).json(newAluno); 
  } catch (error) {
    console.error("Erro ao inserir item:", error);
    res.status(500).json({ message: "Erro ao inserir item" });
  }
});

// Entender o porquê está dando problema...
router.put("/aluno/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(isNaN(id)) {
      return res.status(404).json({message: "ID inválido!"});
    }
    const { nome, email, data_nascimento, cpf} = req.body;
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

export default router;
