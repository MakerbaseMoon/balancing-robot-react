import { useState, useRef } from 'react';

import { Container, Row, Button, Form } from 'react-bootstrap';

type Props = {
    sendMessage:  (message: string) => void;
    range_t: {
        rangeValue1: number;
        setRangeValue1: React.Dispatch<React.SetStateAction<number>>;
        rangeValue2: number;
        setRangeValue2: React.Dispatch<React.SetStateAction<number>>;
        rangeValue3: number;
        setRangeValue3: React.Dispatch<React.SetStateAction<number>>;
        rangeValue4: number;
        setRangeValue4: React.Dispatch<React.SetStateAction<number>>;
    };
}

const Setting = ( { sendMessage, range_t }: Props ) => {
    const { rangeValue1, setRangeValue1, rangeValue2, setRangeValue2, 
            rangeValue3, setRangeValue3, rangeValue4, setRangeValue4 } = range_t;

    const [rangeDisable, setRangeDisable] = useState( true );

    const btnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(rangeDisable) {
            event.currentTarget.innerText = 'Lock';
            event.currentTarget.classList.remove('btn-outline-info');
            event.currentTarget.classList.add('btn-outline-warning');

        } else{
            event.currentTarget.innerText = 'unLock';
            event.currentTarget.classList.remove('btn-outline-warning');
            event.currentTarget.classList.add('btn-outline-info');
            // sendMessage('Save');
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
            const value: number = 0.5 + 0.005 * newValue;
            sendMessage(JSON.stringify({ [event.target.id]: parseFloat(value.toFixed(2)) }));
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