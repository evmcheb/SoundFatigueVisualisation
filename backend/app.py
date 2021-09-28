from models import MovementEvent
from typing import Optional
import json
import time
from fastapi import FastAPI
from db import engine
import models
from sqlmodel import Field, SQLModel, Session, select
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
        if not start_time:
            start_time = time.time() - 5*60
        if not end_time:
            end_time = time.time()

        RoomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        ret = []
        for rs in RoomSensors:
            rs_series = {"SensorID": rs.SensorB.ID, "SensorName":rs.SensorB.Name}
            valid_samples = session.exec(select(models.Sample).where(
                models.Sample.RoomSensorID == rs.ID,
                start_time < models.Sample.Timestamp,
                end_time > models.Sample.Timestamp
            )).all()
            rs_series["x"] = [x.Timestamp for x in valid_samples]
            #rs_series["x"] = [x.Timestamp for x in rs.Samples if start_time <= x.Timestamp <= end_time]
            data = [json.loads(x.MeasurementsJSON) for x in valid_samples]
            rs_series["dB"] = [x['dB'] for x in data]
            rs_series["pitch"] = [x["pitch"] for x in data]
            ret.append(rs_series)
        return ret


'''
This function should return the amount of sound exposed to a single officer
Over a specific time period. 
WIP
'''
@app.get("/officer/{officer_id}/")
def query_officer(officer_id: int, start_time: int = time.time() - 5*60, end_time: int = time.time()):
    with Session(engine) as session:
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
        
 
@app.get("/sensor/{sensor_id}/")
def query_sensor(room_id: int, start_time: int, end_time: int):
    with Session(engine) as session:
        roomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        return [x.Samples for x in roomSensors]