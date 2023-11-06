import { Block } from "./block"
export function BlockSpace(props) {
  const blockList = props.blockList
  return (<div className="blockspace">
    <div className="blockTitle">
      <h2>Blockchain</h2>
    </div>
    <div className="blockchain">{
      blockList.map((block, index) => (<Block key={index} block={block}></Block>))
    }
    </div>
  </div>

  )
}