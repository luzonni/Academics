import Curso from "@shared/Curso";


export default function Item({id_curso, nome, carga_horaria}: Curso) {
    return (
        <tr>
            <td>{id_curso}</td>
            <td>{nome}</td>
            <td> {carga_horaria}</td>
        </tr>
    )
}