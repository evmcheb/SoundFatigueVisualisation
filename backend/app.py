from models import MovementEvent
from typing import Optional
import json
import time
from fastapi import FastAPI, Request
from db import engine
import models
from sqlmodel import Field, SQLModel, Session, select, update
from fastapi.middleware.cors import CORSMiddleware

SQLModel.metadata.create_all(engine)

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''
This function should return the amount of sound in a room
over a specific time period. 
'''
@app.get("/room/{room_id}/")
def query_room(room_id: int, start_time: Optional[int] = None, end_time: Optional[int] = None):
    with Session(engine) as session:
        #if not start_time:
        #    start_time = time.time() - 5*60
        #if not end_time:
        #    end_time = time.time()
        #start_time < models.Sample.Timestamp,
               # end_time > models.Sample.Timestamp

        RoomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        ret = []

        Room = session.exec(select(models.Room).where(models.Room.ID == room_id)).one()
        max_db = Room.MaxDB
        max_pitch = Room.MaxPitch


        for rs in RoomSensors:
            rs_series = {"SensorID": rs.SensorB.ID, "SensorName":rs.SensorB.Name}
            valid_samples = session.exec(select(models.Sample).where(
                models.Sample.RoomSensorID == rs.ID,
                models.Sample.Timestamp,
                models.Sample.Timestamp
            )).all()
            rs_series["x"] = [x.Timestamp for x in valid_samples]
            #rs_series["x"] = [x.Timestamp for x in rs.Samples if start_time <= x.Timestamp <= end_time]
            data = [json.loads(x.MeasurementsJSON) for x in valid_samples]
            rs_series["dB"] = [x['dB'] for x in data]
            rs_series["pitch"] = [x["pitch"] for x in data]
            ret.append(rs_series)

            rs_series["notifications"] = []


            for item in rs.Samples:
                if json.loads(item.MeasurementsJSON)['dB'] > max_db and not item.Notification:
                    session.exec(update(models.Sample).where(models.Sample.ID == item.ID).values(Notification=True))

                    if not item.NotificationSeen:
                        rs_series["notifications"].append({"time": item.Timestamp, "msg": "High decibal warning"})
                
                if json.loads(item.MeasurementsJSON)['pitch'] > max_pitch and not item.Notification:
                    session.exec(update(models.Sample).where(models.Sample.ID == item.ID).values(Notification=True))

                    if not item.NotificationSeen:
                        rs_series["notifications"].append({"time": item.Timestamp, "msg": "High pitch warning"})

            session.commit()
        
        return ret


'''
This function should return the amount of sound exposed to a single officer
Over a specific time period. 
WIP
'''
@app.get("/officer/{officer_id}/")
def query_officer(officer_id: int, start_time: Optional[int] = None, end_time: Optional[int] = None):
    with Session(engine) as session:
        if not start_time:
            start_time = time.time() - 5*60
        if not end_time:
            end_time = time.time()
        Officer = session.exec(select(models.Officer).where(models.Officer.ID == officer_id)).one()
        MovementEvents = session.exec(select(models.MovementEvent).where(
            models.MovementEvent.OfficerID == officer_id,
            start_time < models.MovementEvent.Timestamp,
            end_time > models.MovementEvent.Timestamp
            )).all()

        if len(MovementEvents) < 1:
            return []

        # Calculate intersection of MovementEvents and Samples in that room
        cur_room = MovementEvents[0].RoomID
        enter_time = MovementEvents[0].Timestamp
        ret = []
        for e in MovementEvents:
            if e.RoomID != cur_room:
                # we have changed room, so calculate sound exposure in cur_room
                # since enter_time til now
                # get the AVERAGE sound/pitch because there are multiple sensors in the room
                RoomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == cur_room)).all()
                for rs in RoomSensors:
                    rs_series = {"SensorID": rs.SensorB.ID, "SensorName":rs.SensorB.Name}
                    valid_samples = session.exec(select(models.Sample).where(
                        models.Sample.RoomSensorID == rs.ID,
                        enter_time < models.Sample.Timestamp,
                        e.Timestamp > models.Sample.Timestamp
                    )).all()
                    rs_series["x"] = [x.Timestamp for x in valid_samples]
                    #rs_series["x"] = [x.Timestamp for x in rs.Samples if start_time <= x.Timestamp <= end_time]
                    data = [json.loads(x.MeasurementsJSON) for x in valid_samples]
                    rs_series["dB"] = [x['dB'] for x in data]
                    rs_series["pitch"] = [x["pitch"] for x in data]
                    ret.append(rs_series)

        
        return MovementEvents
        # return MovementEvents


@app.post("/set_notifications/{room_id}/")
async def query_update_nots(room_id: int, request: Request):
    data = await request.body()

    json_data = json.loads(data)

    max_db = json_data["MaxDB"]
    max_pitch = json_data["MaxPitch"]

    with Session(engine) as session:

        session.exec(update(models.Room).where(models.Room.ID == room_id).values(MaxDB=max_db, MaxPitch=max_pitch))
        session.commit()
        
 
@app.get("/sensor/{sensor_id}/")
def query_sensor(room_id: int, start_time: int, end_time: int):
    with Session(engine) as session:
        roomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        return [x.Samples for x in roomSensors]


@app.get("/notification_history/{room_id}/")
def query_nots(room_id: int, start_time: int = time.time() - 5 * 60, end_time: int = time.time()):
    with Session(engine) as session:
        Room = session.exec(select(models.Room).where(models.Room.ID == room_id)).one()
        ret = []

        max_db = Room.MaxDB
        max_pitch = Room.MaxPitch

        for rs in Room.RoomSensors:
            rs_series = {"SensorID": rs.SensorB.ID, "SensorName":rs.SensorB.Name}
            rs_series["notifications"] = []

            rs_series["max_db"] = max_db
            rs_series["max_pitch"] = max_pitch

            for item in rs.Samples:
                if json.loads(item.MeasurementsJSON)['dB'] > max_db and item.NotificationSeen:
                    rs_series["notifications"].append({"time": item.Timestamp, "msg": "High decibal warning"})
                
                if json.loads(item.MeasurementsJSON)['pitch'] > max_pitch and item.NotificationSeen:
                    rs_series["notifications"].append({"time": item.Timestamp, "msg": "High pitch warning"})


            ret.append(rs_series)
        return ret
