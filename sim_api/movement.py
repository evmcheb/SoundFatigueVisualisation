from models import Officer
from db import SessionLocal, engine
import time
import models
import pygame as pg

pg.init()

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()
people = db.query(models.Officer).all()
rooms = db.query(models.Room).all()

class RoomSprite(pg.sprite.Sprite):
    def __init__(self, x, y, size, me):
        super().__init__()
        self.size = size
        self.image = pg.Surface([self.size, self.size])
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

        self.font = pg.font.Font("Roboto-Regular.ttf", 12)
        self.me = me
        self.text = self.font.render(me.Name, False, (0, 0, 0))
    
    def draw(self, surface):
        #surface.blit(self.image, self.rect)
        pg.draw.rect(surface, (0, 0, 0), self.rect, 2)
        #surface.blit(self.image, self.rect)
        surface.blit(self.text, (self.rect.x, self.rect.y+self.size))

    def move(self, x, y):
        self.rect.x = x
        self.rect.y = y

class OfficerSprite(pg.sprite.Sprite):
    def __init__(self, x, y, me):
        super().__init__()
        self.size = 20
        self.image = pg.Surface([self.size, self.size])
        self.image.fill((0, 0, 0))
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

        self.font = pg.font.Font("Roboto-Regular.ttf", 12)
        self.me = me
        self.last = None

        self.text = self.font.render(me.Name, False, (0, 0, 0))
        
    def draw(self, surface):
        surface.blit(self.image, self.rect)
        surface.blit(self.text, (self.rect.x, self.rect.y+self.size))

    def move(self, x, y):
        self.rect.x = x
        self.rect.y = y

    def update_position(self):
        rid = None if not self.last else self.last.ID
        oid = None if not self.me else self.me.ID
        newMovementEvent = models.MovementEvent(rid, oid, time.time())
        db.add(newMovementEvent)
        db.commit()


def main():
    surf = pg.display.set_mode((640, 480))
    clock = pg.time.Clock()
    pg.display.set_caption("Movement event generation")
    font = pg.font.Font("Roboto-Regular.ttf", 12)
    log_text = "begin."
    timer = 0

    room_sprites = []
    officer_sprites = []

    for i, room in enumerate(rooms):
        room_sprites.append(RoomSprite(150*(i%3), (i//3)*150, 100, room))

    for i, officer in enumerate(people):
        officer_sprites.append(OfficerSprite(0 + 100*i, 350, officer))

    officer_dragging = {officer:False for officer in officer_sprites}

    running = True
    while running:
        surf.fill((255, 255, 255))
        for r in room_sprites:
            r.draw(surf)
        for o in officer_sprites:
            o.draw(surf)

        for event in pg.event.get():
            if event.type == pg.QUIT:
                running = False
            elif event.type == pg.MOUSEBUTTONDOWN:
                if event.button == 1:
                    mouse_x, mouse_y = event.pos
                    for officer in officer_sprites:
                        if officer.rect.collidepoint(event.pos):
                            officer_dragging[officer] = True
                            offset_x = officer.rect.x - mouse_x
                            offset_y = officer.rect.y - mouse_y

            elif event.type == pg.MOUSEBUTTONUP:
                if event.button == 1:
                    for officer, dragging in officer_dragging.items():
                        if dragging == True:
                            for room in room_sprites:
                                if officer.last == room.me:
                                    continue
                                if officer.rect.colliderect(room.rect):
                                    officer.last = room.me
                                    log_text = f"{officer.me.Name} moved into {room.me.Name}."
                                    break
                                officer.last = None
                                log_text = f"{officer.me.Name} exited known rooms."
                            officer_dragging[officer] = False

            elif event.type == pg.MOUSEMOTION:
                for officer in officer_sprites:
                    if officer_dragging[officer]:
                        mouse_x, mouse_y = event.pos
                        officer.rect.x = mouse_x + offset_x
                        officer.rect.y = mouse_y + offset_y

        # every 5 seconds, generate new SQL MovementEvents
        if pg.time.get_ticks() - timer > 5000:
            timer = pg.time.get_ticks()
            for officer in officer_sprites:
                officer.update_position()
            print("Updated officer positions")

        log = font.render(log_text, True, (0, 0, 0))
        surf.blit(log, (10, 450))
        pg.display.flip()
        clock.tick(30)


if __name__ == "__main__":
    main()


'''
types = [ "Entry", "Exit", "Update" ]

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
'''