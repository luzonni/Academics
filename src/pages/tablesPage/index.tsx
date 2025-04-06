import { useEffect, useState } from "react";
import styled from "styled-components";
import Tabler from "@components/table";
import Aluno from "@shared/Aluno";
import Disciplina from "@shared/Disciplina";
import Curso from "@shared/Curso";
import axios from "axios";
import { response } from "express";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

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
        columns: ["ID", "Nome", "Curso", "Carga Horaria"]
    }
]

async function ItemToListString(item: Aluno | Disciplina | Curso) : Promise<string[]> {
    const values: string[] = Object.values(item).map(value => String(value));

    if("data_nascimento" in item && "cpf" in item) {
        const vd: string[] = item.data_nascimento.split("-");
        const formatCPF = (value: string) : string => {
            return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
        };
        const aluno: Aluno = {
            ...item,
            cpf: formatCPF(item.cpf),
            data_nascimento: vd[2]+" / "+vd[1]+" / "+vd[0]
        };
        return Object.values(aluno).map(value => String(value));
    }

    if("id_curso" in item && values.length === 4) {
        //TODO METODO QUEBRADO
        const response = await axios.get("http://localhost:5000/api/curso/"+item.id_curso);
        values[2] = response.data.nome;
        return values;
    }
    
    return Object.values(item).map(value => String(value));
}


export default function Table() {
    const [index, setIndex] = useState<number>(0);
    const [values, setValues] = useState<string[][]>([]);
    
    const fetchData = async () => {
        axios.get("http://localhost:5000/api/"+types[index].name)
        .then(response => {
            if(response.data) {
                (response.data as (Aluno | Disciplina | Curso)[]).map(item => {
                    setValues([])
                    ItemToListString(item)
                    .then(response => setValues(values => [...values, response]));
                })
            }
        })
        .catch(() => {
            setValues([])
        })
    }

    useEffect(() => {
        fetchData();
    }, [index]);

    const handleEditItem = (id: number) => {
        axios.get("http://localhost:5000/api/"+types[index].name+"/"+id)
        .then(response => alert(response.data))
        .catch(error => {
            alert("Erro ao encontrar o aluno: " + id)
        })
    };

    const handleDeleteItem = async (id: number) => {
        const result = await MySwal.fire({
            title: 'Tem certeza?',
            text: "Essa ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar!',
            cancelButtonText: 'Cancelar'
        });

        if(result.isConfirmed) {
            await axios.delete("http://localhost:5000/api/"+types[index].name+"/"+id)
            .then(() => {fetchData()})
            .catch(error => alert(error));
            await MySwal.fire('Deletado!', 'O item foi removido com sucesso.', 'success');
        }
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
                values && 
                <Tabler 
                    columns={types[index].columns}
                    items={
                        values.map((item) => {
                            console.log(item);
                            return item; 
                        })
                    }
                    editItem={handleEditItem}
                    deletItem={handleDeleteItem}
                />
                
            }
            
        </TableStyle>
    )
}
