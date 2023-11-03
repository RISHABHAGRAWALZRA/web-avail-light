import { Block } from "./block"
export function BlockSpace(props) {
    const blockList = props.blockList
    return (
        <div className="blockspace">{
            blockList.map((block, index) => (<Block key={index} block={block}></Block>))
        }
        </div>
    )
}