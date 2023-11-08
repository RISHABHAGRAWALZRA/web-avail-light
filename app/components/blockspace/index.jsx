import { useEffect, useRef } from "react"
import { Block } from "./block"
import LatestBlock from "./latestBlock"
export function BlockSpace(props) {
  const bottomRef = useRef(null)
  const blockList = props.blockList

  useEffect(() => {
    bottomRef.current
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [blockList])
  return (<div className="blockspace">
    <h2>Blockchain</h2>
    <div className="blockInfo">
      <div className="blockchain">{
        blockList.map((block, index) => (<Block key={index} block={block}></Block>))
      }
        <div ref={bottomRef} />
      </div>
      <LatestBlock latestBlock={props.latestBlock} />
    </div>
  </div>

  )
}