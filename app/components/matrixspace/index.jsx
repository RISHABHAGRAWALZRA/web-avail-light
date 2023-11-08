import { Cell } from "./cell"
import { Canvas } from "./canvas"
export function MatrixSpace(props) {

    let r = props.matrix.row
    let c = props.matrix.col
    let cells = props.matrix.cells


    let matrix = new Array(r * c).fill(1)
    let row = new Array(256).fill(1)
    let col = new Array(256).fill(1)

    const checkForSampleCell = (row, col) => {
        return cells.some((cell) => {
            return cell.row == row && cell.col == col
        })
    }
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

    const colorCheck = (r, c) => {
        //console.log("Checking....")
        let row = r
        let col = c
        if (checkForSampleCell(row, col)) {
            return "#3bff00"
        }
        return "#ff0000"
    }

    return (<div className="matrixspace">
        <h2>Data Sampling</h2>
        {/* <div className="canvas">
            <Canvas matrix={props.matrix} />
        </div> */}



        <div className="matrix">

            {
                row.map((ele, i) => (
                    <div style={{ display: "flex" }} key={i}>
                        {col.map((ele, j) => (
                            <Cell color={colorCheck(i, j)} key={j} />
                        ))}
                    </div>
                ))

            }
        </div>
    </div>
    )
}