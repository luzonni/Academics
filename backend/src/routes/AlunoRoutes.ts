import { Router } from "express";
import Aluno from "../models/Aluno";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await Aluno.findAll();
    res.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ message: "Erro ao buscar itens" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id: number = Number(req.params.id);
    if(isNaN(id)){
      res.status(500).json({message: "ID não inteiro."})
      return;
    }
    const aluno = await Aluno.findByPk<Aluno>(id);
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ message: "Erro ao buscar itens" });
  }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(isNaN(id)) {
      res.status(404).json({message: "ID inválido!"})
      return;
    }
    const { nome, email, data_nascimento, cpf} = req.body;
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      res.status(404).json({ message: "Item não encontrado" });
      return;
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

router.delete("/:id", async (req, res) => {
  try {
    const id: number = Number(req.params.id);
    if(isNaN(id)) {
      res.status(500).json({message: "Valor de id invalido."})
      return;
    }
    const aluno = await Aluno.findByPk(id);
    if(aluno) {
      await aluno.destroy();
      res.json(aluno);
    }else {
      res.status(404).json({message: "Erro ao encontrar o aludo."})
    }
  }catch(error) {
    res.status(500).json({message: "Erro ao deletar o item."})
  }
});

export default router;
