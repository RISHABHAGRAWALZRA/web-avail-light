export default function LatestBlock(props) {

    const latestBlock = props.latestBlock
    const number = latestBlock.number
    const hash = latestBlock.hash
    const tCount = latestBlock.totalCellCount
    const confidence = latestBlock.confidence
    return <div className="latestBlock">
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0", padding: "0" }}><h3>Block Number</h3><h3>#{number}</h3></div>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0", padding: "0" }}><h3>Block Hash</h3><h3>{hash}</h3></div>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0", padding: "0" }}><h3>Total Cell Count</h3><h3>{tCount}</h3></div>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0", padding: "0" }}><h3>Confidence</h3><h3>{confidence}</h3></div>
    </div>

}