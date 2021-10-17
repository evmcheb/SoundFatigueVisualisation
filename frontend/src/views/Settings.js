import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { ThemeContext, themes } from "contexts/ThemeContext";

function Settings(props) {


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