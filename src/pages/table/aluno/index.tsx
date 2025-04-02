import Aluno from "@shared/Aluno";
import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";

export default function AlunoTable() {
    const [alunos, setAlunos] = useState<Aluno[]>();
    useEffect(() => {
        axios.get("http://localhost:5000/api/aluno")
        .then(response => setAlunos(response.data))
        .catch(error => {
            setAlunos([{nome:"None", email:"none", data_nascimento:"none", cpf:"000.000.000-00",id_aluno:0}])
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
                    return <Item key={aluno.id_aluno} {...aluno}/>
                })}
            </tbody>
        </table>
    )
}