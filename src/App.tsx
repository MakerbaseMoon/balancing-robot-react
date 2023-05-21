import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import Header   from "./Header";

import './App.css'

const App = () => {
    // Body Component
    const [body, setBody] = useState< JSX.Element | null >( null );

    // Network Component
    const [ networks, setNetworks ] = useState< { ssid: string; }[] >( [] );
    const [ unknownNetworks, setUnknownNetworks ] = useState< { ssid: string; rssi: number; encryption: number; }[] >( [] );
    const networks_t = useMemo(() => {
        return {
            networks: networks,
            unknownNetworks: unknownNetworks
        };
    }, [networks, unknownNetworks]);

    // Range Component
    const [rangeValue1, setRangeValue1] = useState(0);
    const [rangeValue2, setRangeValue2] = useState(0);
    const [rangeValue3, setRangeValue3] = useState(0);
    const [rangeValue4, setRangeValue4] = useState(0);
    const range_t = useMemo(() => {
        return {
            rangeValue1: rangeValue1,
            setRangeValue1: setRangeValue1,
            rangeValue2: rangeValue2,
            setRangeValue2: setRangeValue2,
            rangeValue3: rangeValue3,
            setRangeValue3: setRangeValue3,
            rangeValue4: rangeValue4,
            setRangeValue4: setRangeValue4
        };
    }, [rangeValue1, setRangeValue1, rangeValue2, setRangeValue2, rangeValue3, setRangeValue3, rangeValue4, setRangeValue4]);

    // Websocket
    const ws = useRef< WebSocket | null >( null );

    // WebSocket send message to ESP32 Server
    const sendMessage = useCallback((message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        }
    }, []);

    // Websocket Event
    const connectWebSocket = useCallback(() => {
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
                } else if(data.title === 'PID') {
                    let p_stability = parseInt( ( (data.data.p_stability / 5000) + 0.5 ).toString() );
                    let d_stability = parseInt( ( (data.data.d_stability / 5000) + 0.5 ).toString() );
                    let p_speed     = parseInt( ( (data.data.p_speed     / 5000) + 0.5 ).toString() );
                    let i_speed     = parseInt( ( (data.data.i_speed     / 5000) + 0.5 ).toString() );

                    setRangeValue1( p_stability > 100? 100 : p_stability < -100? -100 : p_stability );
                    setRangeValue2( d_stability > 100? 100 : d_stability < -100? -100 : d_stability );
                    setRangeValue3( p_speed     > 100? 100 : p_speed     < -100? -100 : p_speed     );
                    setRangeValue4( i_speed     > 100? 100 : i_speed     < -100? -100 : i_speed     );
                }

            } catch (error) {
                console.log("Error:", error);
            }
        };
    
        ws.current.onclose = () => {
            console.log('WebSocket connection closed.');
            setTimeout(connectWebSocket, 2000);
        };
    }, []);
    
    useEffect(() => {
        connectWebSocket();

        return () => {
            if(ws.current) {
                ws.current.close();
            }
        };
    }, [connectWebSocket]);

    return (
        <div className='d-flex flex-column vh-100'>
            <Header setBody={setBody} 
                    sendMessage={sendMessage} 
                    networks_t={networks_t} 
                    range_t={ range_t } />
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
