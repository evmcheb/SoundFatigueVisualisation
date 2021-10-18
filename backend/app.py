# from models import MovementEvent
import sys
sys.path.insert(1, './backend')
from typing import Optional
import json
import time
from fastapi import FastAPI, Request
import db
import models
from sqlmodel import Field, SQLModel, Session, select, update
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import and_
from operator import add

import datetime
from datetime import datetime
SQLModel.metadata.create_all(db.engine)

#from datetime import datetime, timedelta
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
    with Session(db.engine) as session:
        #if not start_time:
        #    start_time = time.time() - 5*60
        #if not end_time:
        #    end_time = time.time()
        #start_time < models.Sample.Timestamp,
               # end_time > models.Sample.Timestamp
        current_day = datetime.today()
        d1 = current_day.strftime("%d/%m/%Y")
        ts = datetime.strptime(d1, "%d/%m/%Y").timestamp()
        if not start_time:
            # Show 
            start_time = ts
            #start_time = time.time() - 5*60
        if not end_time:
            end_time = time.time()

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
for the specified date in a timeString format
'''
@app.get("/room/{room_id}/{input_date}")
def query_room(room_id: int, start_time: Optional[int] = None, end_time: Optional[int] = None,input_date:Optional[str] =None):
    with Session(db.engine) as session:
        
        ####For time string
        
        if(str(input_date[0])=='0'):
            
            input_date_string = str(input_date)
        else:
            input_date_string = str(input_date)
        
       # ts = datetime.datetime.strptime(input_date, "%d-%m-%Y").timestamp()
        
        if not start_time:
            # Show 
            start_time = 0
           # start_time = ts
            #start_time = time.time() - 5*60
        if not end_time:
            end_time = 0
            #end_time = ts + SECONDS_IN_A_DAY
            

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
            timeStringArr = []
            for x in rs.Samples:
                now = str(datetime.fromtimestamp(int(x.Timestamp)))
               # timeStringArr.append(str(now.day)+"-"+str(now.month)+"-"+ str(now.year)+"-"+str(now.hour) +":"+ str(now.minute) +":"+ str(now.second))
                timeStringArr.append(now)
            
            splitting = input_date_string.split("-")
            new_case_date = splitting[2] + "-" + splitting[1]+"-"+splitting[0]
            
            #print(timeStringArr)
            rs_series["x"] = [x for x in timeStringArr if x[0:10]== new_case_date]
            #rs_series["x"] = [x.Timestamp for x in valid_samples]
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
for an input date
WIP
'''
@app.get("/officer/{officer_id}/{input_date}")
def query_officer(officer_id: int, start_time: Optional[int] = None, end_time: Optional[int] = None,input_date:Optional[str] =None):
    with Session(db.engine) as session:
        if(str(input_date[0])=='0'):
            input_date_string = str(input_date)
        else:
            input_date_string = str(input_date)
        
    with Session(db.engine) as session:
        if not start_time:
            dateTimeStamp = datetime.strptime(input_date, "%d-%m-%Y").timestamp()
            # start at midnight
            start_time = dateTimeStamp
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

        print(f"Length of samples: {len(timestamps)}")
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
        timeStringArr = []

        for x in timestamps:
            now = str(datetime.fromtimestamp(int(x)))
            timeStringArr.append(now)
        
        splitting = input_date_string.split("-")
        new_case_date = splitting[2] + "-" + splitting[1]+"-"+splitting[0]
        timestamps = [x for x in timeStringArr if x[0:10]== new_case_date]
        
        rs_series = {"OfficerID": officer_id, "OfficerName":Officer.Name, "CurrentRoom": MovementEvents[-1].RoomID,'x':timestamps, "dB":dbs, "pitches":pitches}
        if(len(timestamps) == 0):
            # timestamps are not input_date
            rs_series["dB"] = []
            rs_series["pitches"] = []
            rs_series["CurrentRoom"] = None
        
        return rs_series

@app.get("/room/")
def get_rooms():
    with Session(db.engine) as session:
        ret = []
        rooms = session.exec(select(models.Room)).all()
        for r in rooms:
            ret.append({"Name":r.Name, 'Description':r.Description,"ID":r.ID})
        return ret

@app.get("/officer/")
def get_officers():
    with Session(db.engine) as session:
        ret = []
        officers = session.exec(select(models.Officer)).all()
        for o in officers:
            ret.append({"Name":o.Name, "ID":o.ID})
        return ret

'''
This function should return the amount of sound exposed to a single officer
Over a specific time period. 
WIP
'''
@app.get("/officer/{officer_id}/")
def query_officer(officer_id: int, start_time: Optional[int] = None, end_time: Optional[int] = None):
    with Session(db.engine) as session:
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
            
        rs_series = {"OfficerID": officer_id, "OfficerName":Officer.Name, "CurrentRoom": MovementEvents[-1].RoomID,'x':timestamps, "dB":dbs, "pitches":pitches}
        return rs_series


@app.post("/set_notifications/")
async def query_update_nots(request: Request):
    data = await request.body()

    json_data = json.loads(data)

    max_db = json_data["MaxDB"]
    max_pitch = json_data["MaxPitch"]
    room_id = json_data["RoomID"]

    with Session(db.engine) as session:
        session.exec(update(models.Room).where(models.Room.ID == room_id).values(MaxDB=max_db, MaxPitch=max_pitch))
        session.commit()
 
@app.get("/sensor/{sensor_id}/")
def query_sensor(room_id: int, start_time: int, end_time: int):
    with Session(db.engine) as session:
        roomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        return [x.Samples for x in roomSensors]


@app.get("/notification_history/")
def query_nots():
    with Session(db.engine) as session:
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

    with Session(db.engine) as session:

        series = {"notifications": [], "rooms": []}

        rooms = session.exec(select(models.Room)).all()

        for room in rooms:
            room_data = {"ID": room.ID, "name": room.Name, "maxDB": room.MaxDB, "maxPitch": room.MaxPitch}
            series['rooms'].append(room_data)

        #Get timestamp of the latest sample last checked for notifications
        last_sample = session.exec(select(models.Sample).where(models.Sample.Notification == 1).order_by(models.Sample.ID.desc())).first()

        if last_sample == None:
            last_sample = session.exec(select(models.Sample)).first()

        samples = session.exec(select(models.Sample).where(models.Sample.ID > last_sample.ID).order_by(models.Sample.Timestamp.asc())).all()

        time_db = 0
        started_db = False
        peak_db = 0

        time_pitch = 0
        started_pitch = False
        peak_pitch = 0

        interval = 300

        i = 0
        for item in samples:         
            i += 1
            room = session.exec(select(models.Room).join(models.RoomSensor, models.RoomSensor.RoomID == models.Room.ID).join(models.Sample, models.Sample.RoomSensorID == models.RoomSensor.ID).where(models.Sample.RoomSensorID == item.RoomSensorID)).first()

            if time_db == 0 or time_pitch == 0:
                        time_db = item.Timestamp
                        time_pitch = item.Timestamp

            if started_db and json.loads(item.MeasurementsJSON)['dB'] < room.MaxDB and (item.Timestamp - time_db) > interval and item.NotificationSeen != 1:
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

            if started_pitch and json.loads(item.MeasurementsJSON)['pitch'] < room.MaxPitch and (item.Timestamp - time_pitch) > interval and item.NotificationSeen != 1:
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
                
                if started_db:
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
                
                if started_pitch:
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



    ret.append(series)
    return ret


def timeToUNIX(t):
        unixtime = time.mktime(datetime.strptime(t, "%d-%m-%Y-%H:%M:%S").timetuple())
        return unixtime



@app.get("/rooms/{input_date}")
def query_rooms(start_time: Optional[int] = None, end_time: Optional[int] = None,input_date:Optional[str] =None):
    with Session(db.engine) as session:
        
        rooms = session.exec(select(models.Room).order_by(models.Room.ID.asc())).all()

        ret = [[]]

        for room in rooms:
            sensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room.ID)).all()

            rsum = 0
            count = 0
            
            for sensor in sensors:
                sample = session.exec(select(models.Sample).where(models.Sample.RoomSensorID == sensor.ID).order_by(models.Sample.ID.desc())).first()

                rsum += json.loads(sample.MeasurementsJSON)['dB']
                count += 1
            
            avg = rsum / count
            ret[0].append(avg)
        
        return ret