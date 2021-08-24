"""fetcher.py
Caleb Cheng
24/08/2021

The purpose of this module is to provide a generic class that 
can pull data off a SPECIFIC wireless sound meter in a SPECIFIC room.

The generic class is then implemented for the sim_api wireless sensor simulator
"""

import requests
import time

class LevelFetcher:
    """Takes one argument [period], the time between successive fetch call"""
    def __init__(self, period):
        self.period = period
        self.running = False
        
    def run(self):
        while self.running:

