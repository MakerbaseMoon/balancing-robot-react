import { useState } from 'react';
import      axios   from 'axios';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Trash3, Clipboard2Pulse, Clipboard2Plus, LockFill, UnlockFill, Wifi, Wifi1, Wifi2 } from 'react-bootstrap-icons';

import './Network.css';

const Network = () => {
    const [ networks, setNetworks ] = useState( [
        { name: "Network 1" },
        { name: "Network 2" },
        { name: "Network 3" },
    ] );
    const [ unknownNetworks, setUnknownNetworks ] = useState( [
        { name: "Network 4", wifi: 0, lock: false },
        { name: "Network 5", wifi: 2, lock: false },
        { name: "Network 6", wifi: 1, lock: false },
        { name: "Network 7", wifi: 2, lock: false },
        { name: "Network 8", wifi: 1, lock: true  },
    ] );

    const getNetworkList = async() => {
        try {
            const res = await axios.post('/network/list');
            console.log(res.data);
            setNetworks(res.data);
        } catch(error) {
            console.log(error);
        }
    }

    const getUnknownNetworkList = async() => {
        try {
            const res = await axios.post('/network/unknown/list');
            console.log(res.data);
            setNetworks(res.data);
        } catch(error) {
            console.log(error);
        }
    }
    
    const delNetwork = (index: number) => {
        console.log(`delNetwork[${index}]:`, networks[index]);
    }
    
    const editNetwork = (index: number) => {
        console.log(`editNetwork[${index}]:`, networks[index]);
    }
    
    const newNetwork = (index: number) => {
        console.log(`newNetwork[${index}]:`, unknownNetworks[index]);
    }

    return (
        <Container className="container">
            {
                networks.map((network, index) => {
                    return (
                        <Row key={index} className='row wifi-border justify-content-center py-2 my-3'>
                            <Col className='col'>
                                <span className='fs-4'>{network.name}</span>
                            </Col>
                            <Col className='col d-grid gap-2 d-md-flex justify-content-md-end'>
                                <Button className="btn btn-lg btn-outline-secondary" onClick={ () => { editNetwork(index) } }><Clipboard2Pulse /> 修改 </Button>
                                <Button className="btn btn-lg btn-outline-danger"    onClick={ () => {  delNetwork(index) } }><Trash3 /> 刪除 </Button>
                            </Col>
                        </Row> 
                    );
                })
            }
            <hr />
            {
                unknownNetworks.map((network, index) => {
                    return (
                        <Row key={index} className='row wifi-border justify-content-center py-2 my-3'>
                            <Col className='col'>
                                <span className='fs-4'>{network.name}</span>
                            </Col>
                            <Col className='col d-grid gap-3 d-md-flex justify-content-md-end'>
                                { (network.wifi === 0)? <Wifi size={30} /> : (network.wifi === 1)? <Wifi1 size={30} /> : <Wifi2 size={30} /> }
                                { (network.lock)? <LockFill size={30} /> : <UnlockFill size={30} /> }
                                <Button className="btn btn-lg btn-outline-primary" onClick={ () => { newNetwork(index) } }><Clipboard2Plus /> 新增 </Button>
                            </Col>
                        </Row>
                    );
                })
            }
        </Container>
    );
}

export default Network;