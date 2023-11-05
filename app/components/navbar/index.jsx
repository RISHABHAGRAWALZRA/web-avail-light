"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = (props) => {

    //update the size of the logo when the size of the screen changes
    const [width, setWidth] = useState(0);
    const running = props.runBtn
    const run = props.run
    const stop = props.stop
    const setRunning = props.setRunning
    const updateWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        updateWidth();
    }, []);


    return (
        <div className="navbar">
            <div className="logotitle">
                <Image
                    src="/avail.png"
                    alt="Logo"
                    width={width < 1024 ? "50" : "70"}
                    height={width < 1024 ? "30" : "60"}
                    className="logo"
                />
                <h1 className="heading">Avail Web Light Client</h1>
            </div>
            <button className="run" onClick={() => { running ? (stop(), setRunning(false)) : run() }}>{running ? "STOP" : "RUN"}</button>
        </div>
    );
};

export default Navbar;