import { Container, Row, Col, Button } from 'react-bootstrap';
import { Trash3, Clipboard2Pulse, Clipboard2Plus, LockFill, UnlockFill, Wifi, Wifi1, Wifi2 } from 'react-bootstrap-icons';

import './Network.css';

type Props = {
    networks: {  ssid: string; }[];
    unknownNetworks: { ssid: string; rssi: number; encryption: number; }[];
}

const Network = ( { networks, unknownNetworks }: Props ) => {
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
        <Container fluid="md" className="container-fluid">
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
                                <div className='ms-auto'>
                                    <Button className="btn btn-lg btn-outline-secondary m-2" onClick={ () => { editNetwork(index) } }><Clipboard2Pulse /> 修改 </Button>
                                    <Button className="btn btn-lg btn-outline-danger m-2"    onClick={ () => {  delNetwork(index) } }><Trash3 /> 刪除 </Button>
                                </div>
                            </Col>
                        </Row> 
                    );
                })
            }
            <hr />
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
                                    {/* <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div> */}
                                    {/* <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div> */}
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
        </Container>
    );
}

export default Network;