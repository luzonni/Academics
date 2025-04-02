import { useEffect, useState } from "react";
import styled from "styled-components";
import Tabler from "@components/table";
import Aluno from "@shared/Aluno";
import Disciplina from "@shared/Disciplina";
import Curso from "@shared/Curso";
import axios from "axios";

const TableStyle = styled.section`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 2rem;
    }
`

interface Tabler {
    name: string;
    columns: string[];
}

const types: Tabler[] = [
    {
        name: "aluno",
        columns: ["ID", "Nome", "email", "Data de Nascimento", "CPF"],
    },
    {
        name: "curso",
        columns: ["ID", "Nome", "Carga Horaria"]
    },
    {
        name: "disciplina",
        columns: ["ID", "Nome", "Curso ID", "Carga Horaria"]
    }
]

function ItemToListString(item: Aluno | Disciplina | Curso) : string[] {
    let list: string[] = [];
    list.push("Teste");
    return Object.values(item).map(value => String(value));
}

export default function Table() {
    const [index, setIndex] = useState<number>(0);
    const [items, setItems] = useState<Aluno[] | Disciplina[] | Curso[]>();
    useEffect(() => {
        axios.get("http://localhost:5000/api/"+types[index].name)
        .then(response => setItems(response.data))
        .catch(error => {
            setItems([])
        })
    }, [index]);

    const handleEditItem = (id: number) => {
        axios.get("http://localhost:5000/api/"+types[index].name+"/"+id)
        .then(response => alert(response.data))
        .catch(error => {
            alert("Erro ao encontrar o aluno: " + id)
        })
    };
    const handleDeleteItem = (id: number) => {

    };
    return (
        <TableStyle>
            <h1>Table: </h1>
            <select name="tables" id="tables_selecter" onChange={e => setIndex(e.target.selectedIndex)}>
                {types.map((tab, index) => {
                    return (
                        <option key={index} value={index}>{tab.name}</option>
                    )
                })}
            </select>
            {
                items && 
                <Tabler 
                    columns={types[index].columns}
                    items={
                        items.map((item) => {
                            return ItemToListString(item); 
                        })
                    }
                    editItem={handleEditItem}
                    deletItem={handleDeleteItem}
                />
                
            }
            
        </TableStyle>
    )
}
