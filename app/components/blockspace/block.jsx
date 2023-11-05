import Image from "next/image"
export function Block(props) {

    const block = props.block
    return (
        <div className="block">
            <Image
                src="/link.png"
                alt="link"
                width="70"
                height="30"
                className="linkImg"
            />
            <div>
                <Image
                    src="/block.png"
                    alt="block"
                    width="120"
                    height="120"
                    className="blockImg"
                />
                <h3 className="blockNumber">#{block.blockNumber}</h3>
            </div>
        </div>
    )
}