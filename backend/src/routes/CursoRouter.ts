import { Router } from "express";
import Curso from "../models/Curso";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ message: "Erro ao buscar itens" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, carga_horaria } = req.body;
    const newCurso = await Curso.create({ nome, carga_horaria });
    res.status(201).json(newCurso); 
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
    const { nome, carga_horaria } = req.body;
    const curso = await Curso.findByPk(id);

    if (!curso) {
      res.status(404).json({ message: "Item não encontrado" });
      return;
    }

    curso.nome = nome;
    curso.carga_horaria = carga_horaria
    await curso.save();

    res.json(curso);
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    res.status(500).json({ message: "Erro ao atualizar item" });
  }
});

export default router;
