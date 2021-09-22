import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import FetchData from "FetchData/FetchData";
import axios from "axios";



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

  function timestampToHMS(timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
  }

  var nots = data[0]["notifications"];

  var max_db = data[0]["max_db"];
  var max_pitch = data[0]["max_pitch"];


  var notifications = [];

  if(nots !== undefined && nots.length > 0){
    for(var i = 0; i < nots.length; i++){
      notifications.push(
      <UncontrolledAlert color="warning">
        <span>
          <b>Warning - </b>
          { nots[i]['msg'] } at { timestampToHMS(nots[i]['time']) }!
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


  function setNots(){

      console.log(max_db, max_pitch);

      var url = `http://127.0.0.1:8000/set_notifications/1/`;

      /*fetch(url, {
        method: "POST"

      }).then(function(response){
        console.log(response);
      });*/

      data = { 
          MaxDB: max_db.toString(),
          MaxPitch: max_pitch.toString()
      }

      axios.post(url, data)
          .then(response => (console.log(response)))
  }

  function updateMaxDB(event){
      max_db = event.target.value;
  }

  function updateMaxPitch(event){
      max_pitch = event.target.value;
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
                  <CardTitle tag="h4">Configuration</CardTitle>
                </CardHeader>
                <CardBody>
                  <div style={{display: "flex", flexDirection:"row"}}>
                    <table>
                      <tr>
                        <td style={{padding: "15px"}}>
                          Notify me if decibals exceed:
                        </td>
                        <td>
                            <input onChange={updateMaxDB} type="number" defaultValue={max_db}></input>
                        </td>
                      </tr>
                      <tr>
                        <td style={{padding: "15px"}}>
                          Notify me if the pitch exceeds:
                        </td>
                        <td>
                            <input onChange={updateMaxPitch} type="number" defaultValue={max_pitch}></input>
                        </td>
                      </tr>
                    </table>
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
