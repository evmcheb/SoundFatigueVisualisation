import pytest
from fastapi.testclient import TestClient
from sqlalchemy.sql.expression import null
from starlette.status import HTTP_200_OK
import sys
sys.path.insert(1, './')
from backend.app import *

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

def test_amount_of_sound_in_room_over_specific_time_period(client):
    """return the amount of sound in a room over a specific time period

    Args:
        client ([type]): TestClient
    """
    response = client.get("/room/1/")
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert isinstance(result, list)
    assert "SensorID" in result[0]
    assert "SensorName" in result[0]
    assert isinstance(result[0].get('x'), list)
    assert isinstance(result[0].get('dB'), list)
    assert isinstance(result[0].get('pitch'), list)

def test_amount_of_sound_in_room_for_specified_date(client):
    """return the amount of sound in a room for the specified date in a timestring format

    Args:
        client ([type]): TestClient
    """
    response = client.get("/room/1/12-10-2021")
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert isinstance(result, list)
    assert "SensorID" in result[0]
    assert "SensorName" in result[0]
    assert isinstance(result[0].get('x'), list)
    assert isinstance(result[0].get('dB'), list)
    assert isinstance(result[0].get('pitch'), list)


def test_amount_of_sound_exposed_to_single_officer_for_input_date(client):
    """return the amount of sound exposed to a single officer for an input date WIP

    Args:
        client ([type]): TestClient
    """
    response = client.get("/officer/1/12-10-2021")
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert isinstance(result, dict)
    assert "OfficerID" in result
    assert "OfficerName" in result
    assert "CurrentRoom" in result
    assert isinstance(result.get('x'), list)
    assert isinstance(result.get('dB'), list)
    assert isinstance(result.get('pitches'), list)


def test_amount_of_sound_exposed_to_single_officer_specified_time_period(client):
    """return the amount of sound exposed to a single officer over a specific time period WIP

    Args:
        client ([type]): TestClient
    """
    payload = {"start_time": 1633954900}
    response = client.get("/officer/1/", params=payload)
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert isinstance(result, dict)
    assert "OfficerID" in result
    assert "OfficerName" in result
    assert "CurrentRoom" in result
    assert isinstance(result.get('x'), list)
    assert isinstance(result.get('dB'), list)
    assert isinstance(result.get('pitches'), list)


def test_notification_history(client):
    """return the rooms info along with notification history

    Args:
        client ([type]): TestClient
    """

    response = client.get("/notification_history")
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert isinstance(result, list)
    assert "notifications" in result[0]
    assert isinstance(result[0]["notifications"], list)
    assert isinstance(result[0]["rooms"], list)
    assert isinstance(result[0]["rooms"][0], dict)
    assert all(key in result[0]["rooms"][0] for key in ["ID","name","maxDB","maxPitch"])

def test_sensor(client):
    """return the rooms sensor info based on sensor id

    Args:
        client ([type]): TestClient
    """
    payload = {"start_time": 1633954000, "end_time":1633954900}
    response = client.get("/sensor/1/", params=payload)
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert isinstance(result, list)
    assert isinstance(result[0], list)
    assert "ID" in result[0][0]
    assert "Timestamp" in result[0][0]
    assert "MeasurementsJSON" in result[0][0]


def test_set_notification(client):
    """set notification for specific room with given request body payload

    Args:
        client ([type]): TestClient
    """
    payload = {
        "MaxDB": 37.2,
        "MaxPitch": 51.048,
        "RoomID": 1
    }
    response = client.post("/set_notifications/", json=payload)
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert result == None


def test_rooms(client):
    """return the rooms sensor info based on sensor id

    Args:
        client ([type]): TestClient
    """
    response = client.get("/rooms/18-10-2021")
    result = response.json()
    assert response.status_code == HTTP_200_OK
    assert isinstance(result, list)
    if len(result) > 1:
        assert isinstance(result[0], float)
