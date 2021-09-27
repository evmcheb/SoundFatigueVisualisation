"""
db.py
Caleb Cheng
24/08/2021
The purpose of db.py is to provide a generic interface to allow 
reading/writing to storage using an ORM wrapper.
This means that any sort of database type (SQLite, Postgre, MySQL) 
can be implemented with ease.
"""

import sqlalchemy
from sqlalchemy import create_engine,text
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import sessionmaker

engine = "sqlite:///../backend.db"

engine = create_engine(engine, connect_args={"check_same_thread":False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()