import { useEffect, useState } from "react";

import { HouseDoorFill, Wifi, GearFill } from "react-bootstrap-icons"

import Home     from "./Home";
import Network  from "./Network";
import Setting  from "./Setting";

import './Header.css'

type Props = {
    setBody: React.Dispatch<React.SetStateAction<JSX.Element | null >>;
    sendMessage: (message: string) => void;
    networks_t: {
        networks: { ssid: string; }[];
        unknownNetworks: { ssid: string; rssi: number; encryption: number; }[];
    }
    range_t: {
        rangeValue1: number;
        setRangeValue1: React.Dispatch<React.SetStateAction<number>>;
        rangeValue2: number;
        setRangeValue2: React.Dispatch<React.SetStateAction<number>>;
        rangeValue3: number;
        setRangeValue3: React.Dispatch<React.SetStateAction<number>>;
        rangeValue4: number;
        setRangeValue4: React.Dispatch<React.SetStateAction<number>>;
    };
}

const Header = ( { setBody, sendMessage, networks_t, range_t }: Props ) => {
    const [ homeBackground,    setHomeBackground    ] = useState("rgba(246, 248, 252, 0)");
    const [ networkBackground, setNetworkBackground ] = useState("rgba(246, 248, 252, 0)");
    const [ settingBackground, setSettingBackground ] = useState("rgba(246, 248, 252, 0)");

    let icons = [
        {icon: <HouseDoorFill size={50} />, link: <Home    sendMessage={sendMessage}                         />, tag: "#home",    backgroundColor: homeBackground,    setBackgroundColors: setHomeBackground    },
        {icon: <Wifi          size={50} />, link: <Network sendMessage={sendMessage} networks_t={networks_t} />, tag: "#network", backgroundColor: networkBackground, setBackgroundColors: setNetworkBackground },
        {icon: <GearFill      size={50} />, link: <Setting sendMessage={sendMessage} range_t={range_t}       />, tag: "#setting", backgroundColor: settingBackground, setBackgroundColors: setSettingBackground }
    ];

    useEffect(() => {
        let isSetHash: boolean = true;

        icons.map((icon) => {
            if(window.location.hash === icon.tag) {
                setBody(icon.link);
                icon.setBackgroundColors("rgba(246, 248, 252, 1)");
                isSetHash = false;
            }

            return null;
        });

        if(isSetHash) {
            setBody(icons[0].link);
            icons[0].setBackgroundColors("rgba(246, 248, 252, 1)");
        }

    });

    const setBackgroundColors = (index: number) => {
        icons.map((icon, i) => {
            if(i === index) {
                icon.setBackgroundColors("rgba(246, 248, 252, 1)");
            } else {
                icon.setBackgroundColors("rgba(246, 248, 252, 0)");
            }

            return null;
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
