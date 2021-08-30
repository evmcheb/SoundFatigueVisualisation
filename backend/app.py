from typing import Optional

from fastapi import FastAPI
from db import engine
import models
from sqlmodel import Field, SQLModel, Session, select

SQLModel.metadata.create_all(engine)

app = FastAPI()

@app.get("/room/{room_id}")
def create_officer(room_id: int):
    with Session(engine) as session:
        roomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        return [x.Samples for x in roomSensors]