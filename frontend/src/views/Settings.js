import React, { useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button, FormGroup, Input } from "reactstrap";
import { ThemeContext, themes } from "contexts/ThemeContext";

function Settings(props) {
    const globalrange = localStorage.getItem('soundRange');
    const [range, setRange] = useState(globalrange)
    const [alert, setAlert] = useState(false);
    const [alertDesciption, setAlertDesciption] = useState('Range should not be zero');

    const submitSoundRange = () => {

        if (Number(range) !== 0) {
            localStorage.setItem('soundRange', range);
            setAlertDesciption('Range successfully updated')
            setAlert(true)
        }
        else {
            setAlertDesciption('Range should not be zero')
            setAlert(true);
        }
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <h1>Settings</h1>
                        <Card>
                            <CardBody>
                                <div className="typography-line">
                                    <div>
                                        <ThemeContext.Consumer>
                                            {({ changeTheme }) => (
                                                <>
                                                    <span className="color-label"> Change theme </span>{" "}
                                                    <Button
                                                        className="light-badge mr-2"
                                                        onClick={() => changeTheme(themes.light)}
                                                    >
                                                        Light
                                                    </Button>
                                                    <Button
                                                        className="dark-badge ml-2"
                                                        onClick={() => changeTheme(themes.dark)}
                                                    >
                                                        Dark
                                                    </Button>
                                                </>
                                            )}
                                        </ThemeContext.Consumer>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Settings;