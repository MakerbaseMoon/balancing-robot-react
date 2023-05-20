import { useState, useEffect, useRef } from 'react';

import Header   from "./Header";
import Network  from "./Network";

import './App.css'

const App = () => {
    // Body Component
    const [body, setBody] = useState< JSX.Element | null >( null );

    // Network Component
    const [ networks, setNetworks ] = useState< { ssid: string; }[] >( [] );
    const [ unknownNetworks, setUnknownNetworks ] = useState< { ssid: string; rssi: number; encryption: number; }[] >( [] );

    // Websocket
    const ws = useRef< WebSocket | null >( null );

    // WebSocket send message to ESP32 Server
    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        }
    };

    // Websocket Event
    const connectWebSocket = () => {
        const host: string = window.location.hostname;
        ws.current = new WebSocket(`ws://${host}/ws`);
    
        ws.current.onopen = () => {
            console.log('WebSocket connection connected.');
        };
    
        ws.current.onmessage = (event) => {
            console.log('Received message:', event.data);
            try {
                const data = JSON.parse(event.data);
                if(data.title === 'WiFi scan') {
                    setUnknownNetworks(data.list);
                } else if(data.title === 'WiFi save') {
                    setNetworks(data.list);
                }

            } catch (error) {
                console.log("Error:", error);
            }
        };
    
        ws.current.onclose = () => {
            console.log('WebSocket connection closed.');
            setTimeout(connectWebSocket, 2000);
        };
    };
    
    useEffect(() => {
        connectWebSocket();

        return () => {
            if(ws.current) {
                ws.current.close();
            }
        };
    }, []);

    useEffect(() => {
        if(window.location.hash === "#network") {
            setBody(<Network networks={networks} unknownNetworks={unknownNetworks} />);
        }
    }, [networks, unknownNetworks]);

    return (
        <div className='d-flex flex-column vh-100'>
            <Header setBody={setBody} sendMessage={sendMessage} networks={networks} unknownNetworks={unknownNetworks} />
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-lg-3 col-3 d-none d-md-block bg-0"></div>
                    <div className="col-lg-6 col-12 col-sm-12 shadow">
                        {body}
                    </div>
                    <div className="col-lg-3 col-3 d-none d-md-block bg-0"></div>
                </div>
            </div>
        </div>
    );
}

export default App;
