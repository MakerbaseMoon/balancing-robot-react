import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import axios from 'axios';

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
            setNetworks: setNetworks,
            unknownNetworks: unknownNetworks
        };
    }, [networks, setNetworks, unknownNetworks]);

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

    const sendMessage = useCallback( async(path: string, key: string, data: string) => {
        try {
            const response = await axios.get(`${path}/?${key}=${data}`)
            console.log(`${path}?${key}=${data} response:`, response.data);

        } catch (error) {
            console.error(`${path}?${key}=${data} error:`, error);
        }

    }, []);

    const infoData = useCallback( async() => {
        try {
            const response = await axios.get(`/data`)
            console.log(`data response:`, response.data);
            setNetworks(response.data.save);
            setUnknownNetworks(response.data.scan);
        } catch (error) {
            console.error(`data error:`, error);
        }

    }, []);

    useEffect(() => {
        infoData();

    }, []);

    return (
        <div className='d-flex flex-column vh-100'>
            <Header setBody={setBody} 
                    sendMessage={sendMessage} 
                    networks_t={networks_t} 
                    range_t={ range_t } />
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-lg-2 col-3 d-none d-md-block bg-0"></div>
                    <div className="col-lg-8 col-12  shadow">
                        {body}
                    </div>
                    <div className="col-lg-2 col-3 d-none d-md-block bg-0"></div>
                </div>
            </div>
        </div>
    );
}

export default App;
