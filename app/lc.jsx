'use client'
import { useEffect, useState } from "react"
import { createApi } from './api.js'
import init, { check } from "@/avail-light/pkg/wasm_avail_light"
import { BlockSpace } from "./components/blockspace"
import { MatrixSpace } from "./components/matrixspace"
import Navbar from "./components/navbar"


const COMMITMENT_SIZE = 48;
const KATE_PROOF_SIZE = 80;
const EXTENSION_FACTOR = 2;
const SAMPLE_SIZE = 5


export default function LC() {
    const [running, setRunning] = useState(false)
    const [stop, setStop] = useState()
    const [blockList, setBlockList] = useState([])
    const [matrix, setMatrix] = useState(
        {
            row: 0,
            col: 0,
            cells: []
        }
    )


    useEffect(() => {
        init()
    })

    const generateRandomCells = (r, c, count) => {
        const extendedRowCount = r * 2
        const maxCellCount = extendedRowCount * c;
        let size = count;
        if (maxCellCount < count) {
            size = maxCellCount
        }
        let cellList = []
        let randomPointList = randomUniqueNum(maxCellCount, size)
        //console.log(randomPointList)
        randomPointList.forEach((p) => {
            const row = Math.floor(p / c)
            const col = p - row * c
            cellList.push({ row, col })
        })
        return cellList
    }


    const randomUniqueNum = (range, outputCount) => {

        let arr = []
        for (let i = 0; i < range; i++) {
            arr.push(i)
        }

        let result = [];

        for (let i = 1; i <= outputCount; i++) {
            const random = Math.floor(Math.random() * (range - i));
            result.push(arr[random]);
            arr[random] = arr[range - i];
        }

        return result;
    }


    const run = async () => {
        setRunning(true)
        const api = await createApi();

        const unsubscribe = await api.rpc.chain.subscribeFinalizedHeads(async (header) => {

            const blockNumber = header.number.toString()
            const extension = JSON.parse(header.extension)
            const commitment = extension.v1.commitment
            const kateCommitment = commitment.commitment.split('0x')[1]
            const r = commitment.rows
            const c = commitment.cols

            //console.log(`Chain is at block: #${header.extension}`);
            //fetching block hash from number 
            const blockHash = (await api.rpc.chain.getBlockHash(header.number)).toString();
            console.log(`New Block with hash: ${blockHash}, Number: ${blockNumber} `)

            //Detaiils updated on UI
            addBlock(blockNumber, blockHash, r, c, (r * EXTENSION_FACTOR) * c)

            //Query data proof for sample 0,0
            const cells = generateRandomCells(r, c, SAMPLE_SIZE)
            //console.log(cells)
            const kateProof = await api.rpc.kate.queryProof(cells, blockHash);
            const kate_Proof = Uint8Array.from(kateProof)
            const kate_commitment = Uint8Array.from(kateCommitment.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
            let commitments = []
            for (let i = 0; i < (r * EXTENSION_FACTOR); i++) {
                commitments.push(kate_commitment.slice(i * COMMITMENT_SIZE, (i + 1) * COMMITMENT_SIZE))
            }
            let proofs = []
            for (let i = 0; i < SAMPLE_SIZE; i++) {
                proofs.push(kate_Proof.slice(i * KATE_PROOF_SIZE, (i + 1) * KATE_PROOF_SIZE))
            }
            //console.log(proofs, commitments)
            let verfiedCount = 0
            cells.forEach((cell, i) => {
                if (check(proofs[i], commitments[cell.row], c, cell.row, cell.col)) { verfiedCount++ }
            })
            const confidence = 100 * (1 - (1 / (Math.pow(2, verfiedCount))))
            //console.log(verfiedCount)
            setMatrix({
                row: r * EXTENSION_FACTOR,
                col: c,
                cells
            })
        });
        setStop(() => unsubscribe)
    }



    const addBlock = (number, hash, r, c, tCount) => {
        let newBlock = {
            blockNumber: number,
            blockHash: hash,
            matrixRows: r,
            matrixCols: c,
            totalCellCount: tCount,
        };


        //setBlockList(newBlockList)

        setBlockList((list) => {
            let newBlockList = []
            console.log(list.length)
            for (let i = list.length - 1; i >= 0 && i > list.length - 8; i--) {
                newBlockList.push(list[i])
            }
            newBlockList.reverse()
            newBlockList.push(newBlock)
            console.log(newBlockList)
            return newBlockList
        })
    }


    return (
        <div className="LC">
            <Navbar runBtn={running} run={run} stop={stop} setRunning={setRunning} />
            <BlockSpace blockList={blockList} />
            <MatrixSpace matrix={matrix} />
        </div>
    )
}