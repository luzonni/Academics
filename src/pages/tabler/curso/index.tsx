import Curso from "@shared/Curso";
import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";

export default function CursoTable() {
    const [cursos, setCursos] = useState<Curso[]>();
    useEffect(() => {
        axios.get("http://localhost:5000/api/curso")
        .then(response => setCursos(response.data))
        .catch(error => {
            setCursos([{id_curso: 0, nome:"none", carga_horaria: 0}])
        })
    },[])
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Carga Horaria</th>
                </tr>
            </thead>
            <tbody>
                {cursos?.map(curso => {
                    return <Item key={curso.id_curso} {...curso}/>
                })}
            </tbody>
        </table>
    )
}