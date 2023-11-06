//import { Cell } from "./cell"
import { Canvas } from "./canvas"
export function MatrixSpace(props) {

    let r = props.matrix.row
    let c = props.matrix.col
    let cells = props.matrix.cells


    // let matrix = new Array(65536).fill(1)

    // const checkForSampleCell = (row, col) => {
    //     return cells.some((cell) => {
    //         return cell.row == row && cell.col == col
    //     })
    // }
    // const colorCheck = (i) => {
    //     //console.log("Checking....")
    //     let row = Math.floor(i / 256)
    //     let col = i % 256
    //     if (checkForSampleCell(row, col)) {
    //         return "#3bff00"
    //     } else if (row < r && col < c) {
    //         return "#ff0000"
    //     }
    //     return "#d1d1d1"
    // }

    return (<div className="matrixspace">
        <h2>Data Sampling</h2>
        <div className="canvas">
            <Canvas matrix={props.matrix} />
        </div>



        {/* <div className="matrix">

            {
                matrix.map((ele, i) => (
                    <Cell color={colorCheck(i)} key={i} />
                ))
            }
        </div> */}
    </div>
    )
}