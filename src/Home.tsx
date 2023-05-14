import axios from 'axios';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { CaretUpFill, CaretRightFill, CaretLeftFill, CaretDownFill, CarFront } from 'react-bootstrap-icons';

const Home = () => {
    /**
     * Send command to ESP32
     * @param command 0: stop, 1: forward, 2: backward, 3: right, 4: left
     */
    const sendCommand = (command: number) => {
        console.log(`sendCommand[${command}]`);

        // POST /command
        // axios.post('/command', { command: command });
    }

    return (
        <Container className='container'>
            <Row className='row my-5 fs-2'><h2 className='text-center'>創客基地平衡車</h2></Row>
            <Row><CarFront size={50} className='car'></CarFront></Row>
            <Row className='row my-3 '>
                <Col className='col-md-12 d-grid gap-2'>
                    <Button className='btn btn-lg btn-outline-info' 
                            style={{ height: '130px' }}
                            onMouseDown ={ () => { sendCommand(1); } } 
                            onMouseUp   ={ () => { sendCommand(0); } }
                            onTouchStart={ () => { sendCommand(1); } } 
                            onTouchEnd  ={ () => { sendCommand(0); } } >
                        <CaretUpFill size={100}/>
                    </Button>
                </Col>
            </Row>
            <Row className='row my-3'>
                <Col className='col-md-6 d-grid gap-2'>
                    <Button className='btn btn-lg btn-outline-info' 
                                style={{ height: '200px' }}
                                onMouseDown ={ () => { sendCommand(4); } } 
                                onMouseUp   ={ () => { sendCommand(0); } }
                                onTouchStart={ () => { sendCommand(4); } } 
                                onTouchEnd  ={ () => { sendCommand(0); } } >
                        <CaretLeftFill size={100}/>
                    </Button>
                </Col>
                <Col className='col-md-6 d-grid gap-2'>
                    <Button className='btn btn-lg btn-outline-info' 
                                style={{ height: '200px' }}
                                onMouseDown ={ () => { sendCommand(3); } } 
                                onMouseUp   ={ () => { sendCommand(0); } }
                                onTouchStart={ () => { sendCommand(3); } } 
                                onTouchEnd  ={ () => { sendCommand(0); } } >
                        <CaretRightFill size={100}/>
                    </Button>
                </Col>
            </Row>
            <Row className='row my-3'>
                <Col className='col-md-12 d-grid gap-2'>
                <Button className='btn btn-lg btn-outline-info' 
                            style={{ height: '130px' }}
                            onMouseDown ={ () => { sendCommand(2); } } 
                            onMouseUp   ={ () => { sendCommand(0); } }
                            onTouchStart={ () => { sendCommand(2); } } 
                            onTouchEnd  ={ () => { sendCommand(0); } } >
                        <CaretDownFill size={100}/>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
