import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import FetchData from "FetchData/FetchData";
import axios from "axios";
import { Dropdown} from 'react-bootstrap';




// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardColumns,
} from "reactstrap";



function Notifications() {


  //Gather notification history
  var data = FetchData(2);

  var nots = data[0]["notifications"];
  var rs = data[0]["rooms"];

  var max_db = 140;
  var max_pitch = 120;
  var room_id = 1;


  var notifications = [];
  var rooms = [];


  if(nots !== undefined && nots.length > 0){
    for(var i = 0; i < nots.length; i++){

      var start_time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(nots[i]['start_time']*1000);
      var end_time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(nots[i]['end_time']*1000);
      var end_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(nots[i]['end_time']*1000);

      notifications.push(
      <UncontrolledAlert color="warning">
        <span>
          <b>Warning - </b>
          { nots[i]['msg'] } from { start_time } to { end_time } in {nots[i]['room']} peaking at {nots[i]['peak']} on { end_date }!
        </span>
      </UncontrolledAlert>)
    }

  }else{
    notifications.push(
      <span>
        No notification history.
      </span>
    )
  }

  if(rs !== undefined && rs.length > 0){
    for(var i = 0; i < rs.length; i++){
      rooms.push(
        <option value={rs[i]["ID"]}>{rs[i]["name"]}</option>
      )
    }
  }else{
    rooms.push(
      <span>
        No rooms found.
      </span>
    )
  }




  function setNots(){

      if(max_db == undefined || max_pitch == undefined){
        alert("Invalid value!");
        return;
      }

      var url = `http://127.0.0.1:8000/set_notifications/`;

      data = { 
          MaxDB: max_db.toString(),
          MaxPitch: max_pitch.toString(),
          RoomID: room_id.toString()
      }

      axios.post(url, data)
          .then(response => (console.log('Notification settings saved.')))
  }

  function updateMaxDB(event){
      max_db = event.target.value;
  }

  function updateMaxPitch(event){
      max_pitch = event.target.value;
  }

  function handleRoomChange(value){
      room_id = value;
  }



  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col>
            <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-settings" data-notify="icon" style={{padding: "15px"}}/>
                    Configuration
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div style={{display: "flex", flexDirection:"row", alignItems: "center"}}>
                    <table style={{marginRight: "30px"}}>
                      <tr>
                        <td style={{padding: "15px"}}>
                          Notify me if decibals exceed:
                        </td>
                        <td>
                            <input onChange={updateMaxDB} type="number" defaultValue={max_db}></input>
                        </td>
                        <td>dB</td>
                      </tr>
                      <tr>
                        <td style={{padding: "15px"}}>
                          Notify me if the pitch exceeds:
                        </td>
                        <td>
                            <input onChange={updateMaxPitch} type="number" defaultValue={max_pitch}></input>
                        </td>
                        <td>Hz</td>
                      </tr>
                    </table>
                    For room: 
                    <select style={{padding: "10px", marginLeft: "10px"}} id="room_select" onChange={(val) => handleRoomChange(val.target.value)}>
                       {rooms}
                    </select>
                    <div style={{padding: "15px", textAlign: "center", minHeight:"100%"}}>
                      <button onClick={setNots} style={{minHeight: "100%", padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.2)", color: "white", border: "1px solid black", borderRadius: "15%"}}>Save</button>
                    </div>
                  </div>
                </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Notification History</CardTitle>
              </CardHeader>
              <CardBody>
                { notifications }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Notifications Style</CardTitle>
              </CardHeader>
              <CardBody>
                <Alert color="info">
                  <span>This is a plain notification</span>
                </Alert>
                <UncontrolledAlert color="info">
                  <span>This is a notification with close button.</span>
                </UncontrolledAlert>
                <UncontrolledAlert className="alert-with-icon" color="info">
                  <span className="tim-icons icon-bell-55" data-notify="icon" />
                  <span data-notify="message">
                    This is a notification with close button and icon.
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert className="alert-with-icon" color="info">
                  <span className="tim-icons icon-bell-55" data-notify="icon" />
                  <span data-notify="message">
                    This is a notification with close button and icon and have
                    many lines. You can see that the icon and the close button
                    are always vertically aligned. This is a beautiful
                    notification. So you don't have to worry about the style.
                  </span>
                </UncontrolledAlert>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Notification states</CardTitle>
              </CardHeader>
              <CardBody>
                <UncontrolledAlert color="primary">
                  <span>
                    <b>Primary - </b>
                    This is a regular notification made with ".alert-primary"
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="info">
                  <span>
                    <b>Info - </b>
                    This is a regular notification made with ".alert-info"
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="success">
                  <span>
                    <b>Success - </b>
                    This is a regular notification made with ".alert-success"
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="warning">
                  <span>
                    <b>Warning - </b>
                    This is a regular notification made with ".alert-warning"
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="danger">
                  <span>
                    <b>Danger - </b>
                    This is a regular notification made with ".alert-danger"
                  </span>
                </UncontrolledAlert>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="6">
                      <CardTitle tag="h4">
                        Notifications Places
                        <p className="category">Click to view notifications</p>
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tl")}
                          >
                            Top Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tc")}
                          >
                            Top Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tr")}
                          >
                            Top Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bl")}
                          >
                            Bottom Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bc")}
                          >
                            Bottom Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("br")}
                          >
                            Bottom Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notifications;
