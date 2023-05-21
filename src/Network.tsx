import { useState } from 'react';

import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Trash3, Clipboard2Pulse, Clipboard2Plus, LockFill, UnlockFill, Wifi, Wifi1, Wifi2 } from 'react-bootstrap-icons';

import './Network.css';
import 'bootstrap/dist/css/bootstrap.css';

type Props = {
    networks: {  ssid: string; }[];
    unknownNetworks: { ssid: string; rssi: number; encryption: number; }[];
}

const Network = ( { networks, unknownNetworks }: Props ) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
                networks.length <= 0 ?
                ["", "", ""].map((item, index) => {
                    return (
                        <Row key={index} className='row wifi-border align-items-center justify-content-center py-2 my-3'>
                            <Col className='col'>
                                <span className='fs-4'>
                                    <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div> Loading...
                                </span>
                            </Col>
                            <Col className='col d-grid gap-2 d-md-flex justify-content-md-end'>
                                <div className='ms-auto'>
                                    <Button className="btn btn-lg btn-outline-secondary m-2" onClick={ () => { editNetwork(index) } }>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...
                                    </Button>
                                    <Button className="btn btn-lg btn-outline-danger m-2"    onClick={ () => {  delNetwork(index) } }>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    );
                }) : networks.map((network, index) => {
                    return (
                        <Row key={index} className='row wifi-border align-items-center justify-content-center py-2 my-3'>
                            <Col className='col'>
                                <span className='fs-4'>{network.ssid}</span>
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
            <div className='scrollbar'>
                {
                    unknownNetworks.length <= 0 ?
                    ["", "", "", "", ""].map((network, index) => {
                        return (
                            <Row key={index} className='row wifi-border align-items-center justify-content-center py-2 my-3'>
                                <Col className='col'>
                                    <span className='fs-4'>
                                            <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div> Loading...
                                    </span>
                                </Col>
                                <Col className='col d-grid gap-3 me-auto d-md-flex justify-content-md-end'>
                                    <div className='ms-auto'>
                                        <Button className="btn btn-lg btn-outline-primary m-2" onClick={ () => { newNetwork(index) } }>
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }) : unknownNetworks.map((network, index) => {
                        return (
                            <Row key={index} className='row wifi-border align-items-center justify-content-center py-2 my-3'>
                                <Col className='col'>
                                    <span className='fs-4'>{network.ssid}</span>
                                </Col>
                                <Col className='col d-grid gap-3 me-auto d-md-flex justify-content-md-end'>
                                    <div className='ms-auto'>
                                        { (network.rssi > -70)? <Wifi size={30} className='mx-3 mt-2' /> : (network.rssi > -80)? <Wifi2 size={30} className='mx-3 mt-2'  /> : <Wifi1 size={30} className='mx-3 mt-2' /> }
                                        { (network.encryption < 3)? <LockFill size={30} className='mx-3'  /> : <UnlockFill size={30} className='mx-3' /> }
                                        <Button className="btn btn-lg btn-outline-primary m-2" onClick={ () => { newNetwork(index) } }><Clipboard2Plus /> 新增 </Button>
                                    </div>
                                </Col>
                            </Row>
                        );
                    })
                }
            </div>
            <div style={{display: 'none'}} className='fade modal show modal-dialog modal-dialog-centered modal-content modal-header modal-body modal-title modal-footer btn-close form-label form-control form-check form-check-inline form-check-input form-check-label'></div>
            <Modal show={show} onHide={handleClose} centered backdrop="static"  className='rounded-4'>
                <Modal.Header closeButton>
                    <Modal.Title>密碼新增／更改</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>SSID</Form.Label>
                            <Form.Control type="text" placeholder="SSID" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div key={`inline-radio`} className="me-auto">
                        <Form.Check
                            inline
                            label="WiFi 1"
                            name="group1"
                            type= 'radio'
                            id={`inline-radio-1`}
                        />
                        <Form.Check
                            inline
                            label="WiFi 2"
                            name="group1"
                            type= 'radio'
                            id={`inline-radio-2`}
                        />
                        <Form.Check
                            inline
                            label="WiFi 3"
                            name="group1"
                            type= 'radio'
                            id={`inline-radio-3`}
                        />
                    </div>
                    <div className='me-auto'>
                        <Button className='btn btn-outline-danger m-2' onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button className='btn btn-outline-success m-2' onClick={handleClose}>
                            Save
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Network;