import Aluno from "@shared/Aluno";
import { data } from "react-router";

const formatCPF = (value: string): string => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const formatData = (value: string): string => {
    const times: string[] = value.split("-");
    return times[2]+" / "+times[1]+" / "+times[0];
}

export default function ItemAluno({id_aluno, nome, email, data_nascimento, cpf}: Aluno) {
    return (
        <tr>
            <td>{id_aluno}</td>
            <td>{nome}</td>
            <td> {email}</td>
            <td> {formatData(data_nascimento)}</td>
            <td> {formatCPF(cpf)}</td>
        </tr>
    )
}