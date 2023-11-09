'use client'
import { useEffect, useRef, useState } from "react"
const SCALE_WIDTH = 1;
const SCALE_HEIGHT = 0.5
const MATRIX_WIDTH_EXTENDED = 256;
const MATRIX_HEIGHT_EXTENDED = 512;
export function Canvas(props) {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);



    useEffect(() => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
        const handleResize = () => {
            //console.log(width, height)
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    },);

    const ref = useRef()

    let r = props.matrix.row
    let c = props.matrix.col
    let cells = props.matrix.cells

    useEffect(() => {
        const canvas = ref.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const render = () => {
            draw(ctx)
        }
        const id = window.requestAnimationFrame(render)
        return () => window.cancelAnimationFrame(id)
    })

    function draw(ctx) {

        ctx.save();
        ctx.strokeStyle = "#ced8ff";
        for (let i = 0; i < MATRIX_HEIGHT_EXTENDED * SCALE_HEIGHT; i += SCALE_HEIGHT) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(MATRIX_WIDTH_EXTENDED * SCALE_WIDTH, i);
            ctx.stroke();
        }
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = "#ced8ff";
        for (let i = 0; i < MATRIX_WIDTH_EXTENDED * SCALE_WIDTH; i += SCALE_WIDTH) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, MATRIX_HEIGHT_EXTENDED * SCALE_HEIGHT);
            ctx.stroke();
        }
        ctx.restore();

        ctx.save()
        for (let i = 0; i < MATRIX_HEIGHT_EXTENDED; i++) {
            for (let j = 0; j < MATRIX_WIDTH_EXTENDED; j++) {
                if (i < r && j < c) {
                    if (checkForSampleCell(i, j)) {
                        ctx.fillStyle = 'green'
                    } else {
                        ctx.fillStyle = 'red'
                    }
                    ctx.fillRect(j * SCALE_WIDTH, i * SCALE_HEIGHT, SCALE_WIDTH, SCALE_HEIGHT);
                }
            }
        }
        ctx.restore()

    }

    const checkForSampleCell = (row, col) => {
        return cells.some((cell) => {
            return cell.row == row && cell.col == col
        })
    }

    return <canvas ref={ref} width={width - 100} height={height - 450}  {...props}></canvas>
} 