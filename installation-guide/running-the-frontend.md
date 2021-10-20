---
description: This page details how to install and start the frontend
---

# Running the Frontend

1. Node.js is required
   1. https://nodejs.org/en/download/
   2. Download the latest installer for your device and follow the instructions given
   3. To verify if Node is installed: "$npm -v" into terminal. At the time of development for this project the version installed is 6.14.14
2. Download project files
3. cd into SoundFatigueVisualisation on your terminal
4. $cd frontend
5. $npm install
6. At this stage double-check the API is running
   1. view the API at "[http://127.0.0.1:8000](http://127.0.0.1:8000)" or a different local link depending on what port the Uvicorn is running at.
   2. If an ERR\_CONNECTION\_REFUSED is shown then API is not running and need to double-check Running the backend
7. $npm start
8. Node should then display the webpage on your device. Good to go!
