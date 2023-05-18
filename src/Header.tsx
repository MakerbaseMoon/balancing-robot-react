import { useEffect } from "react";

import { HouseDoorFill, Wifi, GearFill } from "react-bootstrap-icons"

import Home     from "./Home";
import Network  from "./Network";
import Setting  from "./Setting";

import './Header.css'

type Props = {
    setBody: React.Dispatch<React.SetStateAction<JSX.Element | null >>;
    sendMessage: (message: string) => void;
}

const Header = ( { setBody, sendMessage }: Props ) => {
    let icons = [
        {icon: <HouseDoorFill size={50} />, link: <Home    sendMessage={sendMessage} />, tag: "#home"    },
        {icon: <Wifi          size={50} />, link: <Network                           />, tag: "#network" },
        {icon: <GearFill      size={50} />, link: <Setting sendMessage={sendMessage} />, tag: "#setting" }
    ];

    useEffect(() => {
        if(window.location.hash == "#network") {
            setBody(<Network />);
        } else if(window.location.hash == "#setting") {
            setBody(<Setting sendMessage={sendMessage} />);
        } else {
            setBody(<Home sendMessage={sendMessage} />);
        }
        
    }, []);

    return (
        <div className="py-4 bg-blue">
            <header className="header">
                <ul className="nav justify-content-center fs-2">
                    {icons.map((icon, index) => (
                        <li key={index} className="nav-item px-2 mx-3" onClick={() => { setBody(icon.link); }}>
                            <a href={icon.tag} style={{color: 'black'}}>
                                {icon.icon}
                            </a>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default Header;
