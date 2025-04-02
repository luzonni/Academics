import Curso from "@shared/Curso";
import Disciplina from "@shared/Disciplina";
import axios from "axios";
import { response } from "express";
import { useEffect, useState } from "react";


export default function Item({id_disciplina, nome, id_curso, carga_horaria}: Disciplina) {
    const [curso, setCurso] = useState<Curso>();
    useEffect(() => {
        axios.get("http://localhost:5000/api/curso/"+id_curso)
        .then(response => setCurso(response.data))
        .catch(error => setCurso({id_curso:0, nome: "Curso não encontrado", carga_horaria:0}))
    },[])
    return (
        <tr>
            <td>{id_disciplina}</td>
            <td>{nome}</td>
            <td>{curso?.nome}</td>
            <td> {carga_horaria}</td>
        </tr>
    )
}