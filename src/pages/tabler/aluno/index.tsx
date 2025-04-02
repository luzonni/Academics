import Aluno from "@shared/Aluno";
import axios from "axios";
import { useEffect, useState } from "react";
import ItemAluno from "./ItemAluno";



export default function AlunoTable() {
    const [alunos, setAlunos] = useState<Aluno[]>();
    useEffect(() => {
        axios.get("http://localhost:5000/api/aluno")
        .then(response => setAlunos(response.data))
        .catch(error => {
            setAlunos([])
        })
    },[])
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Data de Nascimento</th>
                    <th>CPF</th>
                </tr>
            </thead>
            <tbody>
                {alunos?.map(aluno => {
                    return <ItemAluno 
                        key={aluno.id_aluno} 
                        {...aluno}
                    />
                })}
            </tbody>
        </table>
    )
}