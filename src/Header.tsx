import { useEffect, useState } from "react";

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
    const [ homeBackground,    setHomeBackground    ] = useState("rgba(246, 248, 252, 0)");
    const [ networkBackground, setNetworkBackground ] = useState("rgba(246, 248, 252, 0)");
    const [ settingBackground, setSettingBackground ] = useState("rgba(246, 248, 252, 0)");

    let icons = [
        {icon: <HouseDoorFill size={50} />, link: <Home    sendMessage={sendMessage}                             />, tag: "#home",    backgroundColor: homeBackground,    setBackgroundColors: setHomeBackground    },
        {icon: <Wifi          size={50} />, link: <Network networks={networks} unknownNetworks={unknownNetworks} />, tag: "#network", backgroundColor: networkBackground, setBackgroundColors: setNetworkBackground },
        {icon: <GearFill      size={50} />, link: <Setting sendMessage={sendMessage}                             />, tag: "#setting", backgroundColor: settingBackground, setBackgroundColors: setSettingBackground }
    ];

    useEffect(() => {
        let isSetHash: boolean = true;

        icons.map((icon) => {
            if(window.location.hash === icon.tag) {
                setBody(icon.link);
                icon.setBackgroundColors("rgba(246, 248, 252, 1)");
                isSetHash = false;
            }
        });

        if(isSetHash) {
            setBody(icons[0].link);
            icons[0].setBackgroundColors("rgba(246, 248, 252, 1)");
        }

    }, []);

    const setBackgroundColors = (index: number) => {
        icons.map((icon, i) => {
            if(i === index) {
                icon.setBackgroundColors("rgba(246, 248, 252, 1)");
            } else {
                icon.setBackgroundColors("rgba(246, 248, 252, 0)");
            }
        });
    }

    return (
        <div className="py-4 bg-blue">
            <header className="header">
                <ul className="nav justify-content-center fs-2">
                    {icons.map((icon, index) => (
                        <li key={index} className="nav-item px-2 mx-3" onClick={() => { setBody(icon.link); setBackgroundColors(index); }} style={{backgroundColor: icon.backgroundColor}} >
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