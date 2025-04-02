import TABLES from "@shared/TABLES";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import AlunoTable from "./aluno";
import CursoTable from "./curso";

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

const TableContextStyle = styled.table`
    table {
        border-collapse: collapse;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        overflow: hidden;
    }
    th, td {
        padding: 1rem 4rem;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background: #030303;
        color: white;
        text-align: center;
    }

    tr:hover {
        background: #F1EFEC;
    }
`

interface Tabler {
    name: string;
    type: ReactElement;
}

const types: Tabler[] = [
    {
        name: "aluno",
        type: <AlunoTable/>
    },
    {
        name: "curso",
        type: <CursoTable/>
    }
]

export default function Table() {
    const [table, setTable] = useState<number>(0); 
    
    return (
        <TableStyle>
            <h1>Table: </h1>
            <select name="tables" id="tables_selecter" onChange={e => setTable(e.target.selectedIndex)}>
                {types.map((tab, index) => {
                    return (
                        <option value={index}>{tab.name}</option>
                    )
                })}
            </select>
            <TableContextStyle>
                {types[table].type}
            </TableContextStyle>
        </TableStyle>
    )
}
