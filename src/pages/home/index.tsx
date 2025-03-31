import styled from "styled-components"


const HomeStyle = styled.section`
    .nome {
        text-align: center;
        font-size: 22rem;
    }
`

export default function Home() {
    return(
        <HomeStyle>
            <h1 className="nome">
                Hello!
            </h1>
        </HomeStyle>
    )
}