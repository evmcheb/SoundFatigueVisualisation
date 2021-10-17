import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import FetchData from "FetchData/FetchData";
import axios from "axios";





// reactstrap components
import {

  UncontrolledAlert,

  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,

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
    for(var j = 0; j < rs.length; j++){
      rooms.push(
        <option value={rs[j]["ID"]}>{rs[j]["name"]}</option>
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

      if(max_db === undefined || max_pitch === undefined){
        alert("Invalid value!");
        return;
      }

      var url = "http://127.0.0.1:8000/set_notifications/";

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
      </div>
    </>
  );
}

export default Notifications;
