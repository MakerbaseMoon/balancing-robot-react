import { useState, useRef } from 'react';

import { Container, Row, Button, Form } from 'react-bootstrap';

type Props = {
    sendMessage:  (message: string) => void
}

const Setting = ( { sendMessage }: Props ) => {
    const [rangeValue1, setRangeValue1] = useState(0);
    const [rangeValue2, setRangeValue2] = useState(0);
    const [rangeValue3, setRangeValue3] = useState(0);
    const [rangeValue4, setRangeValue4] = useState(0);

    const [rangeDisable, setRangeDisable] = useState( true );

    const btnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(rangeDisable) {
            event.currentTarget.innerText = 'Lock';
        } else{
            event.currentTarget.innerText = 'unLock';
        }

        setRangeDisable(!rangeDisable);
    }

    const rangeList = [
        { id: 'fader3', text: 'P-Stability', value: rangeValue1 },
        { id: 'fader4', text: 'D-Stability', value: rangeValue2 },
        { id: 'fader5', text: 'P-Speed',     value: rangeValue3 },
        { id: 'fader6', text: 'I-Speed',     value: rangeValue4 },
    ];

    const timerRef = useRef(undefined as NodeJS.Timeout | undefined);

    const rangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);

        if(event.target.id === 'fader3') {
            setRangeValue1(newValue);
        } else if(event.target.id === 'fader4') {
            setRangeValue2(newValue);
        } else if(event.target.id === 'fader5') {
            setRangeValue3(newValue);
        } else if(event.target.id === 'fader6') {
            setRangeValue4(newValue);
        }

        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            const value = 0.5 + 0.005 * newValue;
            sendMessage(`${event.target.id}: ${value.toFixed(2)}`);
        }, 50);
    }

    return (
        <Container fluid="md" className="container-fluid">
            <Row className='row my-5'>
                <Button className='btn btn-lg btn-outline-info' onClick={btnClick}>unLock</Button>
            </Row>
            <Row className='row my-5'>
                {
                    rangeList.map((range) => {
                        return (
                            <Row className='row my-3' key={range.id}>
                                <Form.Label className='form-label'>
                                    {range.text} {range.value > 0? '+' : ''}{range.value} %
                                </Form.Label>
                                <Form.Range id        = { range.id }
                                            className = 'form-range'
                                            min       = {         -100 } 
                                            max       = {          100 }
                                            disabled  = { rangeDisable }
                                            value     = { range.value  }
                                            onChange  = { rangeChange  } />
                            </Row>
                        );
                    })
                }
            </Row>
        </Container>
    );
}

export default Setting;