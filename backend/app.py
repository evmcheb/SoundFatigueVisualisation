from models import MovementEvent
from typing import Optional
import json
import time
from fastapi import FastAPI, Request
from db import engine
import models
from sqlmodel import Field, SQLModel, Session, select, update
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import and_

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


@app.post("/set_notifications/")
async def query_update_nots(request: Request):
    data = await request.body()

    json_data = json.loads(data)

    max_db = json_data["MaxDB"]
    max_pitch = json_data["MaxPitch"]
    room_id = json_data["RoomID"]

    with Session(engine) as session:

        session.exec(update(models.Room).where(models.Room.ID == room_id).values(MaxDB=max_db, MaxPitch=max_pitch))
        session.commit()
        
 
@app.get("/sensor/{sensor_id}/")
def query_sensor(room_id: int, start_time: int, end_time: int):
    with Session(engine) as session:
        roomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        return [x.Samples for x in roomSensors]


@app.get("/notification_history/")
def query_nots():
    with Session(engine) as session:
        notifications = session.exec(select(models.Notification)).all()


        series = {"notifications": [], "rooms": []}
        ret = []

        rooms = session.exec(select(models.Room)).all()

        for room in rooms:
            room_data = {"ID": room.ID, "name": room.Name, "maxDB": room.MaxDB, "maxPitch": room.MaxPitch}
            series["rooms"].append(room_data)

        for nts in notifications:
            room = session.exec(select(models.Room).where(models.Room.ID == nts.RoomID)).one()
            room_name = room.Name

            series["notifications"].append({"start_time": nts.StartTime, "end_time": nts.EndTime, "msg": nts.msg, "room": room_name, "peak": nts.peak})


        
        ret.append(series)
        return ret

@app.get("/notifications/")
def query_notification():
    ret = []

    with Session(engine) as session:

        series = {"notifications": [], "rooms": []}

        rooms = session.exec(select(models.Room)).all()

        for room in rooms:
            room_data = {"ID": room.ID, "name": room.Name, "maxDB": room.MaxDB, "maxPitch": room.MaxPitch}
            series['rooms'].append(room_data)

        #Get timestamp of the latest sample last checked for notifications
        last_sample = session.exec(select(models.Sample).where(models.Sample.Notification == 1).order_by(models.Sample.Timestamp.desc())).first()

        samples = session.exec(select(models.Sample).where(models.Sample.Timestamp > last_sample.Timestamp).order_by(models.Sample.Timestamp.asc())).all()


        time_db = 0
        started_db = False
        peak_db = 0

        time_pitch = 0
        started_pitch = False
        peak_pitch = 0

        i = 0
        for item in samples:
            i += 1
            room = session.exec(select(models.Room).join(models.RoomSensor, models.RoomSensor.RoomID == models.Room.ID).join(models.Sample, models.Sample.RoomSensorID == models.RoomSensor.ID).where(models.Sample.RoomSensorID == item.RoomSensorID)).first()

            if time_db == 0 or time_pitch == 0:
                        time_db = item.Timestamp
                        time_pitch = item.Timestamp

            if started_db and json.loads(item.MeasurementsJSON)['dB'] < max_db and (item.Timestamp - time_db) > 300 and not item.NotificationSeen:
                series["notifications"].append({"start_time": time_db, "end_time": item.Timestamp, "msg": "High decibal warning", "room": room.Name, "peak": str(peak_db) + "dB"})

                nt = models.Notification()
                nt.msg = "High decibal warning"
                nt.StartTime = time_db
                nt.EndTime = item.Timestamp
                nt.RoomID = room.ID
                nt.peak = peak_db

                session.add(nt)
                session.exec(update(models.Sample).where(item.ID == models.Sample.ID).values(NotificationSeen=True))
                session.commit()

                started_db = False
                time_db = 0
                peak_db = 0

            if json.loads(item.MeasurementsJSON)['dB'] > room.MaxDB and not started_db:
                time_db = item.Timestamp
                started_db = True
                peak_db = json.loads(item.MeasurementsJSON)['dB']

            if started_pitch and json.loads(item.MeasurementsJSON)['pitch'] < max_pitch and (item.Timestamp - time_pitch) > 300 and not item.NotificationSeen:
                series["notifications"].append({"start_time": time_db, "end_time": item.Timestamp, "msg": "High pitch warning", "room": room.Name, "peak": str(peak_pitch) + "Hz"})

                nt = models.Notification()
                nt.msg = "High pitch warning"
                nt.StartTime = time_pitch
                nt.EndTime = item.Timestamp
                nt.RoomID = room.ID
                nt.peak = peak_pitch

                session.add(nt)
                session.exec(update(models.Sample).where(item.ID == models.Sample.ID).values(NotificationSeen=True))
                session.commit()

                started_pitch = False
                time_pitch = 0
                peak_pitch = 0
                                
            if json.loads(item.MeasurementsJSON)['pitch'] > room.MaxPitch and not started_pitch:
                time_pitch = item.Timestamp
                started_pitch = True
                peak_pitch = json.loads(item.MeasurementsJSON)['pitch']
            

            if started_db and json.loads(item.MeasurementsJSON)['dB'] > peak_db:
                peak_db = json.loads(item.MeasurementsJSON)['dB']

            if started_pitch and json.loads(item.MeasurementsJSON)['pitch'] > peak_pitch:
                peak_pitch = json.loads(item.MeasurementsJSON)['pitch']

            if i == len(samples):
                session.exec(update(models.Sample).where(models.Sample.ID == item.ID).values(Notification=1))
                session.commit()


    ret.append(series)
    return ret





'''
@app.get("/notifications/")
def query_notifications():
    with Session(engine) as session:
        rooms = session.exec(select(models.Room)).all()


        series = {"notifications": [], "rooms": []}
        ret = []

        for room in rooms:
        
            room_name = room.Name
            max_db = room.MaxDB
            max_pitch = room.MaxPitch

            room_data = {"ID": room.ID, "name": room_name, "maxDB": max_db, "maxPitch": max_pitch}
            series["rooms"].append(room_data)

            RoomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room.ID)).all()

            for rs in RoomSensors:

                time_db = 0
                started_db = False
                peak_db = 0

                time_pitch = 0
                started_pitch = False
                peak_pitch = 0

                for item in rs.Samples:
                    if time_db == 0 or time_pitch == 0:
                        time_db = item.Timestamp
                        time_pitch = item.Timestamp

                    if started_db and json.loads(item.MeasurementsJSON)['dB'] < max_db and (item.Timestamp - time_db) > 300 and not item.NotificationSeen:
                        series["notifications"].append({"start_time": time_db, "end_time": item.Timestamp, "msg": "High decibal warning", "room": room_name, "peak": str(peak_db) + "dB"})

                        nt = models.Notification()
                        nt.msg = "High decibal warning"
                        nt.StartTime = time_db
                        nt.EndTime = item.Timestamp
                        nt.RoomID = room.ID
                        nt.peak = peak_db

                        session.add(nt)
                        session.exec(update(models.Sample).where(item.ID == models.Sample.ID).values(NotificationSeen=True))
                        session.commit()

                        started_db = False
                        time_db = 0
                        peak_db = 0

                    if json.loads(item.MeasurementsJSON)['dB'] > max_db and not started_db:
                        time_db = item.Timestamp
                        started_db = True
                        peak_db = json.loads(item.MeasurementsJSON)['dB']

                    if started_pitch and json.loads(item.MeasurementsJSON)['pitch'] < max_pitch and (item.Timestamp - time_pitch) > 300 and not item.NotificationSeen:
                        series["notifications"].append({"start_time": time_db, "end_time": item.Timestamp, "msg": "High pitch warning", "room": room_name, "peak": str(peak_pitch) + "Hz"})

                        nt = models.Notification()
                        nt.msg = "High pitch warning"
                        nt.StartTime = time_pitch
                        nt.EndTime = item.Timestamp
                        nt.RoomID = room.ID
                        nt.peak = peak_pitch

                        session.add(nt)
                        session.exec(update(models.Sample).where(item.ID == models.Sample.ID).values(NotificationSeen=True))
                        session.commit()

                        started_pitch = False
                        time_pitch = 0
                        peak_pitch = 0
                                        
                    if json.loads(item.MeasurementsJSON)['pitch'] > max_pitch and not started_pitch:
                        time_pitch = item.Timestamp
                        started_pitch = True
                        peak_pitch = json.loads(item.MeasurementsJSON)['pitch']

                    if started_db or started_pitch:
                        session.exec(update(models.Sample).where(models.Sample.ID == item.ID).values(NotificationSeen=True))
                        session.commit()
                    

                    if started_db and json.loads(item.MeasurementsJSON)['dB'] > peak_db:
                        peak_db = json.loads(item.MeasurementsJSON)['dB']

                    if started_pitch and json.loads(item.MeasurementsJSON)['pitch'] > peak_pitch:
                        peak_pitch = json.loads(item.MeasurementsJSON)['pitch']


    ret.append(series)
    
    return ret'''
