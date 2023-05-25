import { useState } from 'react';

import { Container, Row, Col, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { Trash3, Clipboard2Pulse, Clipboard2Plus, LockFill, UnlockFill, Wifi, Wifi1, Wifi2 } from 'react-bootstrap-icons';

import './Network.css';
import 'bootstrap/dist/css/bootstrap.css';

type Props = {
    sendMessage: (path: string, key: string, data: string) => void;
    networks_t: {
        networks: {  ssid: string; }[];
        setNetworks: React.Dispatch<React.SetStateAction<{ ssid: string; }[]>>;
        unknownNetworks: { ssid: string; rssi: number; encryption: number; }[];
    }
}

const Network = ( { sendMessage, networks_t }: Props ) => {
    const { networks, setNetworks, unknownNetworks } = networks_t;

    const [show,           setShow           ] = useState< boolean >(false);
    const [toastSSID,      setToastSSID      ] = useState< string  >("SSID");
    const [selectedOption, setSelectedOption ] = useState< string  >("wifi0");

    const handleClose = () => setShow(false);
    const handleShow  = () => setShow(true);

    const handleOptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
        const index              = parseInt(selectedOption.slice(4));
        const ssidForm_value     = (document.getElementById("ssidLabel")    as HTMLInputElement).value;
        const passwordForm_value = (document.getElementById("passwordForm") as HTMLInputElement).value;

        console.log(`handleSubmit[${index}]:`, ssidForm_value, passwordForm_value);

        let is_error = false;

        if(ssidForm_value.length <= 0 || ssidForm_value.length > 31) {
            document.getElementById("ssidLabel")?.classList.add("is-invalid");
            document.getElementById("ssidHelp")?.classList.add("invalid-feedback");
            is_error = true;
        } else {
            document.getElementById("ssidLabel")?.classList.remove("is-invalid");
            document.getElementById("ssidHelp")?.classList.remove("invalid-feedback");
        }

        if(passwordForm_value.length < 8 || passwordForm_value.length > 31) {
            document.getElementById("passwordForm")?.classList.add("is-invalid");
            document.getElementById("passwordHelp")?.classList.add("invalid-feedback");
            is_error = true;
        } else {
            document.getElementById("passwordForm")?.classList.remove("is-invalid");
            document.getElementById("passwordHelp")?.classList.remove("invalid-feedback");
        }

        if(is_error) return;

        submitNetwork(index, ssidForm_value, passwordForm_value);

        handleClose();
    }

    const submitNetwork = (index: number, ssid: string, password: string) => {
        console.log(`addNetwork[${index}]:`, ssid, password);
        sendMessage(`/network${index}`, ssid, password);
        setNetworks((prevNetworks) => {
            const newNetworks = [...prevNetworks];
            newNetworks[index] = { ssid: ssid };
            return newNetworks;
        });
    }

    const delNetwork = (index: number) => {
        console.log(`delNetwork[${index}]:`, networks[index]);
        submitNetwork(index, `Network${index}`, `password${index}`);
        setNetworks((prevNetworks) => {
            const newNetworks = [...prevNetworks];
            newNetworks[index] = { ssid: `Network${index}` };
            return newNetworks;
        });
    }
    
    const editNetwork = (index: number) => {
        console.log(`editNetwork[${index}]:`, networks[index]);

        document.getElementById("passwordForm")?.classList.remove("is-invalid");
        document.getElementById("passwordHelp")?.classList.remove("invalid-feedback");
        
        setSelectedOption(`wifi${index}`)
        setToastSSID(networks[index].ssid);
        handleShow();
    }
    
    const newNetwork = (index: number) => {
        console.log(`newNetwork[${index}]:`, unknownNetworks[index]);
        setSelectedOption('wifi0')
        setToastSSID(unknownNetworks[index].ssid);
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
                                    <Button className="btn btn-lg btn-outline-secondary m-2" disabled >
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...
                                    </Button>
                                    <Button className="btn btn-lg btn-outline-danger m-2"    disabled >
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
                                        <Button className="btn btn-lg btn-outline-primary m-2" disabled >
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
                                        { (network.encryption >= 3)? <LockFill size={30} className='mx-3'  /> : <UnlockFill size={30} className='mx-3' /> }
                                        <Button className="btn btn-lg btn-outline-primary m-2" onClick={ () => { newNetwork(index) } }><Clipboard2Plus /> 新增 </Button>
                                    </div>
                                </Col>
                            </Row>
                        );
                    })
                }
            </div>

            <div style={{display: 'none'}} className='fade modal show modal-dialog modal-dialog-centered modal-content modal-header modal-body modal-title modal-footer btn-close form-label form-control form-check form-check-inline form-check-input form-check-label form-floating'></div>
            <Modal show={show} onHide={handleClose} centered backdrop="static"  className='rounded-4'>
                <Modal.Header closeButton>
                    <Modal.Title>密碼新增／更改</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        
                        <Form.Label>SSID</Form.Label>
                        <FloatingLabel  controlId="ssidLabel"
                                        label={toastSSID}
                                        className="mb-3" >
                            <Form.Control type="text" />
                            <Form.Text id="ssidHelp" muted>
                                    帳號最多30個字元。
                            </Form.Text>
                        </FloatingLabel>

                        <Form.Group className="mb-3" controlId="passwordForm">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" aria-describedby="passwordHelpBlock" />
                            <Form.Text id="passwordHelp" muted>
                                密碼需8至30個字元。
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="me-auto">
                        <Form.Check
                            inline
                            label="WiFi 0"
                            type= 'radio'
                            value={'wifi0'}
                            checked={selectedOption === "wifi0"}
                            onChange={handleOptionChange}
                        />
                        <Form.Check
                            inline
                            label="WiFi 1"
                            type= 'radio'
                            value={'wifi1'}
                            checked={selectedOption === "wifi1"}
                            onChange={handleOptionChange}
                        />
                        <Form.Check
                            inline
                            label="WiFi 2"
                            type= 'radio'
                            value={'wifi2'}
                            checked={selectedOption === "wifi2"}
                            onChange={handleOptionChange}
                        />
                    </Form.Group>
                    <div className='me-auto'>
                        <Button className='btn btn-outline-success m-2' onClick={handleSubmit}>
                            儲存網路
                        </Button>
                        <Button className='btn btn-outline-danger m-2' onClick={handleClose}>
                            取消變更
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Network;