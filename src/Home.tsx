import { useState } from 'react';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { CaretUpFill, CaretRightFill, CaretLeftFill, CaretDownFill, ArrowBarUp, ArrowBarDown, ArrowBarLeft, ArrowBarRight } from 'react-bootstrap-icons';

type Props = {
    sendMessage: (path: string, key: string, data: string) => void;
}

const Home = ( { sendMessage }: Props ) => {
    const [rangeValue1, setRangeValue1] = useState(25);
    const [rangeValue2, setRangeValue2] = useState(10);

    const sendCommand1 = (command: number) => {
        command = (command * rangeValue1 * 0.01 ) + 0.5;
        console.log(`fader1: ${command.toFixed(2)}`);
        if(command < 0) command = 0;
        if(command > 1) command = 1;
        sendMessage('', 'fader1', command.toFixed(2));
    }

    const sendCommand2 = (command: number) => {
        command = (command * rangeValue2 * 0.01 ) + 0.5;
        console.log(`fader2: ${command.toFixed(2)}`);
        if(command < 0) command = 0;
        if(command > 1) command = 1;
        sendMessage('', 'fader2', command.toFixed(2));
    }

    const rangeChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue1(parseInt(event.target.value));
    }

    const rangeChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue2(parseInt(event.target.value));
    }
    
    return (
        <Container fluid="md" className="container-fluid">
            <Row className='row mt-3 fs-2'><h2 className='text-center'>創客基地平衡車</h2></Row>
            <Row className='row my-3'>
                <Form.Label className='form-label'>
                    <ArrowBarUp /> {rangeValue1} % <ArrowBarDown />
                </Form.Label>
                <Form.Range className= 'form-range'
                            min      = { 0} 
                            max      = {50} 
                            value    = {rangeValue1 } 
                            onChange = {rangeChange1} />
            </Row>
            <Row className='row my-3 '>
                <Col className='col-md-12 d-grid gap-2'>
                    <Button variant="outline-info" className='btn btn-lg btn-outline-info' 
                            style={{ height: '130px' }}
                            onMouseDown  = { () => { sendCommand1(1); } } 
                            onMouseUp    = { () => { sendCommand1(0); } }
                            onTouchStart = { () => { sendCommand1(1); } } 
                            onTouchEnd   = { () => { sendCommand1(0); } } >
                        <CaretUpFill size={100}/>
                    </Button>
                </Col>
            </Row>
            <Row className='row my-3'>
                <Col className='col-md-6 d-grid gap-2'>
                    <Button variant="outline-info" className='btn btn-lg btn-outline-info' 
                                style={{ height: '200px' }}
                                onMouseDown  = { () => { sendCommand2(1); } } 
                                onMouseUp    = { () => { sendCommand2(0); } }
                                onTouchStart = { () => { sendCommand2(1); } } 
                                onTouchEnd   = { () => { sendCommand2(0); } } >
                        <CaretLeftFill size={100}/>
                    </Button>
                </Col>
                <Col className='col-md-6 d-grid gap-2'>
                    <Button variant="outline-info" className='btn btn-lg btn-outline-info' 
                                style={{ height: '200px' }}
                                onMouseDown  = { () => { sendCommand2(-1); } } 
                                onMouseUp    = { () => { sendCommand2( 0); } }
                                onTouchStart = { () => { sendCommand2(-1); } } 
                                onTouchEnd   = { () => { sendCommand2( 0); } } >
                        <CaretRightFill size={100}/>
                    </Button>
                </Col>
            </Row>
            <Row className='row my-3'>
                <Col className='col-md-12 d-grid gap-2'>
                    <Button variant="outline-info" className='btn btn-lg btn-outline-info' 
                            style={{ height: '130px' }}
                            onMouseDown  = { () => { sendCommand1(-1); } } 
                            onMouseUp    = { () => { sendCommand1( 0); } }
                            onTouchStart = { () => { sendCommand1(-1); } } 
                            onTouchEnd   = { () => { sendCommand1( 0); } } >
                        <CaretDownFill size={100}/>
                    </Button>
                </Col>
            </Row>
            <Row className='row my-3 mb-5'>
                <Form.Range className = 'form-range' 
                            min       = { 0} 
                            max       = {50} 
                            value     = {rangeValue2 } 
                            onChange  = {rangeChange2} />
                <Form.Label className = 'form-label'>
                    <ArrowBarLeft /> {rangeValue2} % <ArrowBarRight />
                </Form.Label>
            </Row>
        </Container>
    );
}

export default Home;