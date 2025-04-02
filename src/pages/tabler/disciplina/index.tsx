import Disciplina from "@shared/Disciplina";
import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";


export default function DisciplinaTable() {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();
    useEffect(() => {
        axios.get("http://localhost:5000/api/disciplina")
        .then(response => setDisciplinas(response.data))
        .catch(error => {
            setDisciplinas([])
        })
    },[])
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>Carga Horaria</th>
                </tr>
            </thead>
            <tbody>
                {disciplinas?.map(aluno => {
                    return <Item key={aluno.id_disciplina} {...aluno}/>
                })}
            </tbody>
        </table>
    )
}