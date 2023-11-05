export function Cell(props) {
    const color = props.color
    return (
        <div style={{ backgroundColor: color }} className="cell"></div>
    )
}