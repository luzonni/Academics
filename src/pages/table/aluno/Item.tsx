import Aluno from "@shared/Aluno";

const formatCPF = (value: string): string => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export default function Item({id_aluno, nome, email, data_nascimento, cpf}: Aluno) {
    return (
        <tr>
            <td>{id_aluno}</td>
            <td>{nome}</td>
            <td> {email}</td>
            <td> {new Date(data_nascimento).toDateString()}</td>
            <td> {formatCPF(cpf)}</td>
        </tr>
    )
}