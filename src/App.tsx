import { useState, useEffect, useRef } from 'react';

import Header   from "./Header";
import Home     from "./Home";

import './App.css'

const App = () => {
    const ws = useRef( null as WebSocket | null);

    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        }
    };

    const [body, setBody] = useState( null as JSX.Element | null );

    const connectWebSocket = () => {
        ws.current = new WebSocket('ws://192.168.181.149/ws');
        console.log('Connecting to WebSocket...');
    
        ws.current.onopen = () => {
            console.log('WebSocket connection established.');
            sendMessage("Hello Server!");
        };
    
        ws.current.onmessage = (event) => {
            console.log('Received message:', event.data);
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

    return (
        <div className='d-flex flex-column vh-100'>
            <Header setBody={setBody} sendMessage={sendMessage}/>
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
