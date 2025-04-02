import { Link, useLocation } from "react-router";
import styled from "styled-components"

const MyHeaderStyle = styled.header`
    padding: 3rem;
    background-color: #123458;
    nav {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
`

export default function MyHeader() {
    return (
        <MyHeaderStyle>
            <nav>
                <ItemLink name="Home" local="/"/>
                <ItemLink name="Tables" local="/tables"/>
                <ItemLink name="Inserir(Aluno)" local="/insert"/>
            </nav>
        </MyHeaderStyle>
    )
}

interface ItemLinkProps {
    name: string;
    local: string;
}

function ItemLink({name, local}: ItemLinkProps) {
    const location = useLocation()
    const linkStyle = {
        textDecoration: (location.pathname == local) ? "underline": "none",
        color:"white",
        fontSize: "1.5rem"
    };
    return (
        <Link to={local} style={linkStyle}>
            {name}
        </Link>
    )
}