import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"

//Isso precisa ser colocado em uma pasta shared especidica com todos os tipos da tabela
interface Aluno {
    id_aluno: number;
    nome: string;
    email: string;
    data_nascimento: string;
    cpf: string;
}

export default function Table() {
    const { type } = useParams()
    const [alunos, setAlunos] = useState<Aluno[]>();
    useEffect(() => {
        axios.get("http://localhost:5000/api/"+type)
        .then(response => setAlunos(response.data))
        .catch(error => console.error("Erro ao coletar a tabela: " + type + " erro:" + error))
    },[])
    return (
        <ul>
            {alunos?.map(aluno => {
                return <li key={aluno.id_aluno}>Aluno: {aluno.nome}</li>
            })}
        </ul>
    )
}