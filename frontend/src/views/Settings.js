import React, { useState } from "react";

 // reactstrap components
 import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
 import RangeAlert from "components/Modals/RangeAlert";

 function Settings() {
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
                         <RangeAlert
                             modalTitle={"Alert"}
                             modalDescription={alertDesciption}
                             alert={alert}
                             onClickOk={() => setAlert(false)}
                         />
                         <Card>
                             <CardHeader className="mb-5">
                                 <CardTitle tag="h3">
                                     Sound Range Settings
                                 </CardTitle>
                             </CardHeader>
                             <CardBody>
                                 <div className="typography-line">
                                     <h1>
                                         <span>Notify me if decibels exceed:</span>
                                         <FormGroup>
                                             <Input type="number" value={range} name="number" id="number" placeholder="0 DB" onChange={(e) => setRange(e.target.value)} />
                                         </FormGroup>
                                     </h1>
                                 </div>
                                 <div className="typography-line">
                                     <h1>
                                         <FormGroup>
                                             <Button onClick={submitSoundRange}>Submit</Button>
                                         </FormGroup>
                                     </h1>
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