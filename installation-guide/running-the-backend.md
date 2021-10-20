# Running the backend

## Backend

The purpose of the backend is to provide an abstracted API for the frontend to interact with. It allows the frontend to easily query the raw data in the SQLite database. The backend was built using [`FastAPI`](https://fastapi.tiangolo.com)and[`sqlmodel`](https://sqlmodel.tiangolo.com).&#x20;

To start the backend API, we must first

1. [Install the requirements](how-to-install.md#installing-python-requirements) for Python
2. Ensure the database is [created correctly](how-to-install.md#creating-the-database).&#x20;

We can then start the backend: `uvicorn app:app`. This will run a HTTP server on `http://127.0.0.1:8000`

{% hint style="info" %}
During development, it can be useful to turn on hot-reloads for FastAPI. This can be done using `uvicorn app:app --reload`
{% endhint %}
