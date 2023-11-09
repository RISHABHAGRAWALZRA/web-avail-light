import Image from "next/image"
import { Progress } from "@nextui-org/react";
import { useState, useEffect } from "react";
export function Block(props) {

    const block = props.block

    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(props.progress)
    }, [props.progress])

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 100 : v + 10));
        }, 5000);

    }, []);
    return (
        <div className="block">
            <div className="blockLinkImg">
                {/* <Image
                    src="/link.png"
                    alt="link"
                    width={40}
                    height={20}
                    className="linkImg"
                /> */}

                <Image
                    src="/block.png"
                    alt="block"
                    width={70}
                    height={70}
                    className="blockImg"
                />
                <Progress className={{ indicator: "#00537c" }} size="sm" aria-label="finalizing..." value={value} />
            </div>
            <h3 className="blockNumber">#{block.blockNumber}</h3>
        </div>
    )
}