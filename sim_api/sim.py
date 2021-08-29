"""
Simulator API
Caleb Cheng 23/08/21
pull sample sound data from two different distributions
To use
  - pip install requirements.txt
  - cd sim_api
  - uvicorn sim:app --reload
"""

import hashlib
import json
import time
import numpy as np
from typing import Optional
from db import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Every second, for each RoomSensorId, fetch some random data.

room_sensors = db.query(models.RoomSensor).all()

while True:
    for rs in room_sensors:
        print(rs.RoomID, rs.SensorID)
        hash = hashlib.sha1(f"{rs.RoomID}_{rs.SensorID}".encode())
        phase = int(hash.hexdigest()[:4], 16)
        
        data = {
            "dB":50 * np.sin((2*np.pi/60) * time.time() + phase),
            "pitch": 100 * np.sin(2*np.pi/(60*3) + time.time() + phase)
        }

        newSample = models.Sample(rs.ID, time.time(), 1, json.dumps(data))
        db.add(newSample)
        db.commit()

    time.sleep(1)




from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

@app.get("/{room_id}/{sensor_id}/")
def sin_sensor(room_id: int, sensor_id: int):
    # Get hash room_id and sensor_id to generate phase shift
    hash = hashlib.sha1(f"{room_id}_{sensor_id}".encode())
    # Take first 2 bytes of hash
    phase = int(hash.hexdigest()[:4], 16)
    return {"dB": 50*np.sin((2*np.pi/(60)) * time.time() + phase) + 100, "pitch": 100*np.sin(2*np.pi/(60*3) * time.time()+phase) + 1000}


@app.get("/{room_id}/{sensor_id}/n")
def norm_sensor(room_id: int, sensor_id: int):
    return {"dB": np.random.normal(loc=100, scale=20), "pitch": np.random.normal(loc=1000, scale=200)}


doc = """Usage:
/{room_id}/{sensor_id}/ (Default)
- Returns {dB: , pitch: )
- dB
    - Sine wave
    - Period of 1 minute
    - centered around 100dB
    - amplitude of 50s
- pitch:
    - Sine wave
    - Period of 3 minute
    - centered around 1000Hz
    - amplitude of 100Hz

/{room_id}/{sensor_id}/n
- Returns {dB: , pitch: )
- dB
    - Normal distribution
    - centered around 100db
    - s.d of 20
- pitch
    - Normal distribution
    - centered around 1000Hz
    - s.d. of 200Hz

- dB in decibels
- pitch in Hz
"""

@app.get("/", response_class=PlainTextResponse)
def main():
    return doc
