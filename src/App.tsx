import { useState, useEffect, useRef } from 'react';

import Header   from "./Header";
import Home     from "./Home";

const App = () => {
    const ws = useRef( null as WebSocket | null);

    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        }
    };

    const [body, setBody] = useState( <Home sendMessage={sendMessage} /> );

    const connectWebSocket = () => {
        ws.current = new WebSocket('ws://192.168.0.71/ws');
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
        <>
            <Header setBody={setBody} sendMessage={sendMessage} />
            { body }
        </>
    );
}

export default App;
