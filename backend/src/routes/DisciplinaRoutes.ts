import { Router } from "express";
import Disciplina from "../models/Disciplina";


const router = Router();

router.get("/", async (req, res) => {
    try {
        const item = await Disciplina.findAll();
        res.json(item);
    }catch (error) {
        console.error("Erro ao buscar itens: ", error);
        res.status(500).json({message: "Erro ao buscar itens"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id: number= Number(req.params.id);
        if(isNaN(id)) {
            res.status(500).json({message: ""})
            return;
        }
        const item = await Disciplina.findByPk(id);
        res.json(item);
    }catch (error) {
        console.error("Erro ao buscar itens: ", error);
        res.status(500).json({message: "Erro ao buscar itens"});
    }
});

export default router;