import styled from "styled-components"

const TablerStyle = styled.table`
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
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

    .edit {
        background-color: #f8f87a;
        border: none;
        padding: 1rem;
        border-radius: 10px;
        text-transform: uppercase;
    }

    .edit:hover {
        background-color: #a0a04f;
    }

    .delet {
        background-color: #ff6b6b;
        border: none;
        padding: 1rem;
        border-radius: 10px;
        text-transform: uppercase;
    }

    .delet:hover {
        background-color: #af5252;
    }
`

interface TablerProps {
    columns: string[];
    items: string[][];
    editItem: (id: number) => void;
    deletItem: (id: number) => void;
}

export default function Tabler(props: TablerProps) {
    return (
        <TablerStyle>
            <thead>
                <tr>
                    {props.columns.map((column, index) => 
                        <th key={index}>{column}</th>
                    )}
                    <th>-</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map((item, index) => 
                    <tr key={index}>
                        {item.map((value, index) => 
                            <td key={index}>{value}</td>
                        )}
                        <td><button className="edit" onClick={() => props.editItem(Number(item[0]))}>Editar</button></td>
                        <td><button className="delet" onClick={() => props.deletItem(Number(item[0]))} >Deletar</button></td>
                    </tr>
                )}
            </tbody>
        </TablerStyle>
    )
}