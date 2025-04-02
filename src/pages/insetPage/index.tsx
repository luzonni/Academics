import axios from "axios";
import { useState } from "react";
import styled from "styled-components"


const StyleInsert = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-size: 8rem;
    }
`

export default function InserPage() {
    return (
        <StyleInsert>
            <h1>InsertPage</h1>
            <FormAluno/>
        </StyleInsert>
    )
}

const FormAlunoStyled = styled.form`
    .secInput {
        display: flex;
        flex-direction: column;
    }
`

const formatCPF = (value: string): string => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

function FormAluno() {
    const [nome, setNome] = useState<string>();
    const handleChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNome(event.target.value);
    }
    const [email, setEmail] = useState<string>();
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const [data_nascimento, setData_nascimento] = useState<string>();
    const handleChangeDataNascimento = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData_nascimento(event.target.value)
    };

    const [cpf, setCPF] = useState<string>();
    const handleChangeCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCPF(formatCPF(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
        event.preventDefault();
        console.log(nome, email, data_nascimento, cpf);
        try {
            const response = await axios.post("http://localhost:5000/api/aluno", {
                nome,
                email,
                data_nascimento: data_nascimento?.split("T")[0],
                cpf: cpf?.replace(".","").replace(".","").replace("-","")
            });
            setNome("")
            setData_nascimento("")
            setEmail("")
            setCPF("")
        } catch (error) {
            alert("Erro ao adicionar item: "+error);
        }
    };

    return (
        <FormAlunoStyled onSubmit={handleSubmit}>
            <div className="secInput">
                <span>Nome*</span>
                <input 
                    type="text" 
                    value={nome} 
                    onChange={handleChangeNome} 
                    placeholder="nome"
                />
            </div>
            <div className="secInput">
                <span>Email*</span>
                <input 
                    type="email" 
                    value={email} 
                    onChange={handleChangeEmail} 
                    placeholder="email" 
                />
            </div>
            <div className="secInput">
                <span>Data de Nascimento*</span>
                <input 
                    type="date" 
                    value={data_nascimento}
                    onChange={handleChangeDataNascimento}
                />
            </div>
            <div className="secInput">
                <span>CPF*</span>
                <input 
                    type="text" 
                    value={cpf} 
                    placeholder="123.456.789.10" 
                    onChange={handleChangeCPF} 
                    maxLength={14}
                />
            </div>
            <div className="secInput">
                <span>Cubmit</span>
                <button type="submit">End</button>
            </div>
        </FormAlunoStyled>
    )
}
