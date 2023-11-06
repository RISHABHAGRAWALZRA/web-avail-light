import Image from "next/image"
export function Block(props) {

    const block = props.block
    return (
        <div className="block">
            <div className="blockLinkImg">
                <Image
                    src="/link.png"
                    alt="link"
                    width={40}
                    height={20}
                    className="linkImg"
                />

                <Image
                    src="/block.png"
                    alt="block"
                    width={70}
                    height={70}
                    className="blockImg"
                />
            </div>
            <h3 className="blockNumber">#{block.blockNumber}</h3>
        </div>
    )
}