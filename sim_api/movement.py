from db import SessionLocal, engine
import time
import models

types = [ "Entry", "Exit", "Update" ]

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()
people = db.query(models.Officer).all()
rooms = db.query(models.Room).all()
while True:
    print("Select officer to generate movement event: ")
    for i, person in enumerate(people):
        print(f'{i}) {person.Name}')
    select = int(input("Person: 0-"+str(len(people)-1)+": "))

    print("Which room: ")
    for i, room in enumerate(rooms):
        print(f'{i}) {room.Name} {room.Description}')
    room_select = int(input("Room: 0-"+str(len(rooms)-1)+": "))


    print("Event type: ")
    for i, type in enumerate(types):
        print(f'{i}) {type}')

    type_select = int(input("Type: 0-"+str(len(types)-1)+": "))

    newMovementEvent = models.MovementEvent(rooms[room_select].ID, people[select].ID, type_select, time.time())
    db.add(newMovementEvent)
    db.commit()