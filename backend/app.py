from models import MovementEvent
from typing import Optional
import json
import time
from fastapi import FastAPI, Request
from db import engine
import models
from sqlmodel import Field, SQLModel, Session, select, update
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
from sqlalchemy import and_
=======
from operator import add
>>>>>>> 6f97598f5bcf3660c2336c63b349f13b9b069dcb

from datetime import date
import datetime
import ciso8601
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

SECONDS_IN_A_DAY = 86400
'''
This function should return the amount of sound in a room
over a specific time period. 
'''
@app.get("/room/{room_id}/")
def query_room(room_id: int, start_time: Optional[int] = None, end_time: Optional[int] = None):
    with Session(engine) as session:
<<<<<<< HEAD
        #if not start_time:
        #    start_time = time.time() - 5*60
        #if not end_time:
        #    end_time = time.time()
        #start_time < models.Sample.Timestamp,
               # end_time > models.Sample.Timestamp
=======
        current_day = date.today()
        d1 = current_day.strftime("%d/%m/%Y")
        ts = datetime.datetime.strptime(d1, "%d/%m/%Y").timestamp()
        if not start_time:
            # Show 
            start_time = ts
            #start_time = time.time() - 5*60
        if not end_time:
            end_time = time.time()
>>>>>>> 6f97598f5bcf3660c2336c63b349f13b9b069dcb

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

            session.commit()
        
        return ret

'''
This function should return the amount of sound in a room
for the specified date
'''
@app.get("/room/{room_id}/{input_date}")
def query_room(room_id: int, start_time: Optional[int] = None, end_time: Optional[int] = None,input_date:Optional[str] =None):
    with Session(engine) as session:
        
        ####For time string
        
        if(str(input_date[0])=='0'):
            
            input_date_string = str(input_date[1:])
        else:
            input_date_string = str(input_date)
        
        ts = datetime.datetime.strptime(input_date, "%d-%m-%Y").timestamp()
        
        if not start_time:
            # Show 
            start_time = ts
            #start_time = time.time() - 5*60
        if not end_time:
            end_time = ts + SECONDS_IN_A_DAY
            

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
            #time.strftime("%H:%M:%S", time.gmtime(timeStampPopulate))
            #rs_series["x"] = [time.strftime('%H:%M:%S',time.gmtime(x.Timestamp)) for x in valid_samples]
            
            rs_series["x"] = [x.Timestamp[10:] for x in rs.Samples if x.Timestamp[0:9]==input_date_string]
            print(len(rs_series['x']))
            if(len(rs_series['x']) !=0):
                data = [json.loads(x.MeasurementsJSON) for x in valid_samples]
                rs_series["dB"] = [x['dB'] for x in data]
                rs_series["pitch"] = [x["pitch"] for x in data]
            else:
                data = [json.loads(x.MeasurementsJSON) for x in valid_samples]
                rs_series["dB"] = []
                rs_series["pitch"] = []
            ret.append(rs_series)

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
        timestamps = []
        dbs = []
        pitches = []
        e = MovementEvents[0]
        for e in MovementEvents:
            # we have changed room, so calculate sound exposure in cur_room
            # since enter_time til now
            # get the AVERAGE sound/pitch because there are multiple sensors in the room
            # assumption - data comes in every second
            RoomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == e.RoomID)).all()
            for rs in RoomSensors:
                valid_samples = session.exec(select(models.Sample).where(
                    models.Sample.RoomSensorID == rs.ID,
                    start_time <= models.Sample.Timestamp,
                    e.Timestamp >= models.Sample.Timestamp
                )).all()
                timestamps.extend([x.Timestamp for x in valid_samples])
                data = [json.loads(x.MeasurementsJSON) for x in valid_samples]
                dbs.extend([x['dB'] for x in data])
                pitches.extend([x['pitch'] for x in data])

            start_time = e.Timestamp

        # remove duplicates by taking averages
        for i, t in enumerate(timestamps):
            dups = [idx+i for idx, t1 in enumerate(timestamps[i+1:]) if t1 == t]
            if not dups:
                continue
            db_dups = []
            pitch_dups = []
            for dup in dups:
                db_dups.append(dbs[dup])
                pitch_dups.append(pitches[dup])
                del dbs[dup]
                del pitches[dup]
                del timestamps[dup]
            dbs[i] = sum(db_dups)/len(db_dups)
            pitches[i] = sum(pitch_dups)/len(pitch_dups)
        print(len(timestamps), len(dbs), len(pitches))
            
        rs_series = {"OfficerID": officer_id, "OfficerName":Officer.Name, 'x':timestamps, "dB":dbs, "pitches":pitches}
        return rs_series


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
    
# this show retrive a list of notifications that have not been marked as seen
@app.get("/notifications/")
def notification_queue(room_id: Optional[int]):
    with Session(engine) as session:
        if room_id:
            notifications = session.exec(select(models.Notification).where(
                models.Notification.RoomID == room_id,
                models.Notification.Seen == False
            )).all()
            return notifications
        else:
            notifications = session.exec(select(models.Notification).where(
                models.Notification.Seen == False
            )).all()
            return notifications

@app.post("/seen_notification/")
async def mark_as_seen(room_id: int, request: Request):
    data = await request.body()
    json_data = json.loads(data)
    rid = int(json_data["ID"])
    with Session(engine) as session:
        session.exec(update(models.Notification).where(models.Notification.ID == room_id).values(Seen=True))
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