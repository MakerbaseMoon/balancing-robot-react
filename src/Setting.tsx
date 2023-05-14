import { useState } from 'react';
import      axios   from 'axios';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Setting = () => {
    const [ settingInfo, setSettingInfo ] = useState( {
        mac: "Loading...",
        ip: "Loading...",
        ap: "Loading...",
    });

    const clickAP = () => {
        console.log("clickAP");
        const apSSID = document.getElementById("apSSID") as HTMLInputElement;
        const apPassword = document.getElementById("apPassword") as HTMLInputElement;

        if( apSSID && apPassword ) {
            console.log(`AP SSID: ${apSSID.value}, AP Password: ${apPassword.value}`);
        }
    }

    const settingList = [
        {
            list: [
                { id: "mac", name: "mac", type: "text", placeholder: settingInfo.mac, text: "MAC Address", disabled: true },
                { id: "ip", name: "ip", type: "text", placeholder: settingInfo.ip, text: "IP Address", disabled: true },
            ],
            button: null,
        },
        {
            list: [
                { id: "apSSID", name: "WiFi AP SSID", type: "text", placeholder: settingInfo.ap, text: "WiFi AP SSID", disabled: false },
                { id: "apPassword", name: "WiFi AP Password", type: "password", placeholder: null, text: "WiFi AP Password", disabled: false },
            ],
            button: { click: clickAP, text: "儲存" },
        },
    ];

    const getSettingInfo = async() => {
        try {
            const res = await axios.post('/setting/info');
            console.log(res.data);
            setSettingInfo(res.data);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Container className='container'>
            {
                settingList.map((setting, index) => {
                    return (
                        <Row key={index} className='row my-5'>
                            <Col className='col d-grid gap-2 fs-4'>
                                {/* <div className="card"> */}
                                    <Form>
                                    {
                                        setting.list.map((item, index) => {
                                            return (
                                                <Form.Group key={index} className="mb-3" controlId={item.id}>
                                                    <Form.Label className="form-label">{item.text}</Form.Label>
                                                    <Form.Control   className="form-control" 
                                                                    type={item.type} 
                                                                    placeholder={ (item.placeholder === null)? '' : item.placeholder } 
                                                                    disabled={item.disabled} />
                                                    <Form.Text className="form-text">{item.text}</Form.Text>
                                                </Form.Group>
                                            );
                                        })
                                    }
                                </Form>
                                {
                                    (setting.button === null) ? null : (
                                        <Button className='btn btn-outline-warning' onClick={setting.button.click}>
                                            {setting.button.text}
                                        </Button>
                                    ) 
                                }
                                {/* </div> */}
                            </Col>
                        </Row>
                    );
                })
            }
        </Container>
    );
}

export default Setting;