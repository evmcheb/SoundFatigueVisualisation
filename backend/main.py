from fetcher import FakeFetcher
import time
from .db import SessionLocal, engine
from .crud import Storage
from . import models

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()
storage = Storage(db)


def handle_resp(resp):
    # db code

    # get the response

    # write into the appropriate tables
    print(resp)

# [(sensorid, roomid), (sensorid, roomid)]
to_fetch = [(0, 1), (1, 0)]

# testing whether fetcher is working or not
def main():
    fetch = FakeFetcher(handle_resp, to_fetch, 2, "http://127.0.0.1:8000")
    fetch.start()
    while True:
        time.sleep(1)

if __name__ == "__main__":
    main()