import { useEffect } from "react";

import { HouseDoorFill, Wifi, GearFill } from "react-bootstrap-icons"

import Home     from "./Home";
import Network  from "./Network";
import Setting  from "./Setting";

import './Header.css'

type Props = {
    setBody: React.Dispatch<React.SetStateAction<JSX.Element | null >>;
    sendMessage: (message: string) => void;
    networks: {  ssid: string; }[];
    unknownNetworks: { ssid: string; rssi: number; encryption: number; }[];
}

const Header = ( { setBody, sendMessage, networks, unknownNetworks }: Props ) => {
    let icons = [
        {icon: <HouseDoorFill size={50} />, link: <Home    sendMessage={sendMessage}                             />, tag: "#home"    },
        {icon: <Wifi          size={50} />, link: <Network networks={networks} unknownNetworks={unknownNetworks} />, tag: "#network" },
        {icon: <GearFill      size={50} />, link: <Setting sendMessage={sendMessage}                             />, tag: "#setting" }
    ];

    useEffect(() => {
        if(window.location.hash === icons[1].tag) {
            setBody(icons[1].link);

        } else if(window.location.hash === icons[2].tag) {
            setBody(icons[2].link);

        } else {
            setBody(icons[0].link);
        }
        
    }, []);

    return (
        <div className="py-4 bg-blue">
            <header className="header">
                <ul className="nav justify-content-center fs-2">
                    {icons.map((icon, index) => (
                        <li key={index} className="nav-item px-2 mx-3" onClick={() => { setBody(icon.link); }} >
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