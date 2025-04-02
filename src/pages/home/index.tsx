import styled from "styled-components"


const HomeStyle = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .nome {
        text-align: center;
        font-size: 6rem;
    }
    .texto {
        font-size: 1.25rem;
    }
`

export default function Home() {
    return(
        <HomeStyle>
            <h1 className="nome">
                Academics!
            </h1>
            <p className="texto">
                Este sistema está servindo como projeto pessoal de aprendizagem. Focando em entender como funciona a 
                interação front-back, e criar sistemas full-stack.
            </p>
            <p>As ferramentas usadas são:</p>
            <ul>
                <li>React</li>
                <li>Typescript</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>PostgreSQL</li>
            </ul>
        </HomeStyle>
    )
}