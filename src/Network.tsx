import { useState } from 'react';
import      axios   from 'axios';

import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Trash3, Clipboard2Pulse, Clipboard2Plus, LockFill, UnlockFill, Wifi, Wifi1, Wifi2 } from 'react-bootstrap-icons';

import './Network.css';
import 'bootstrap/dist/css/bootstrap.css';
interface MyVerticallyCenteredModalProps {
    show: boolean;
    onHide: () => void;
}  

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    return (
        
        <Modal
            className='modal-dialog modal-lg modal-dialog-centered modal-content'
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='modal-header'>
            <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
            </Modal.Title>
            <button type="button" className="btn-close" aria-label="Close" onClick={props.onHide}></button>
            </Modal.Header>
            <Modal.Body className='modal-body'>
            <h4>Centered Modal</h4>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
            <Button type="button" className="btn btn-outline-primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const Network = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        handleShow();
    }
    
    const newNetwork = (index: number) => {
        console.log(`newNetwork[${index}]:`, unknownNetworks[index]);
        handleShow();
    }
    

    return (
        <Container fluid="md" className="container-fluid position-relative">
            <div style={{display: 'none'}} className='fade modal-backdrop show'></div>
            {
                networks.map((network, index) => {
                    return (
                        <Row key={index} className='row wifi-border align-items-center justify-content-center py-2 my-3'>
                            <Col className='col'>
                                <span className='fs-4'>{network.name}</span>
                            </Col>
                            <Col className='col d-grid gap-2 d-md-flex justify-content-md-end'>
                                <div className='ms-auto' >
                                    <Button variant="outline-secondary" className="btn btn-lg btn-outline-secondary m-2"  onClick={ () => { editNetwork(index) } }><Clipboard2Pulse /> 修改 </Button>
                                    <Button variant="outline-danger" className="btn btn-lg btn-outline-danger m-2"    onClick={ () => {  delNetwork(index) } }><Trash3 /> 刪除 </Button>
                                </div>
                            </Col>
                        </Row> 
                    );
                })
            }
            <hr />
            {
                unknownNetworks.map((network, index) => {
                    return (
                        <Row key={index} className='row wifi-border align-items-center justify-content-center py-2 my-3'>
                            <Col className='col'>
                                <span className='fs-4'>{network.name}</span>
                            </Col>
                            <Col className='col d-grid gap-3 me-auto d-md-flex justify-content-md-end'>
                                <div className='ms-auto'>
                                    { (network.wifi === 0)? <Wifi size={30} className='mx-3 mt-2' /> : (network.wifi === 1)? <Wifi1 size={30} className='mx-3 mt-2' /> : <Wifi2 size={30} className='mx-3 mt-2'  /> }
                                    { (network.lock)? <LockFill size={30} className='mx-3'  /> : <UnlockFill size={30} className='mx-3' /> }
                                    <Button variant="outline-primary" className="btn btn-lg btn-outline-primary m-2" onClick={ () => { newNetwork(index) } }><Clipboard2Plus /> 新增 </Button>
                                </div>
                            </Col>
                        </Row>
                    );
                })
            }
            <div style={{display: 'none'}} className='modal-dialog modal-dialog-centered modal-dialog-scrollable'></div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Check
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Network;