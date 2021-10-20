---
description: User guide on using and viewing the features of the Worker Dashboard.
---

# Worker Dashboard

#### Main Page

When no worker is selected displayed is a drop down menu of the different workers. These workers have been created and exists in the backend.

Selecting a worker will have the worker id and the current date passed into the href link and the user will be directed to that workers personal dashboard

For example Shane has a worker id of 4 and is selected from the dropdown on the 17th of October, therefore the url will be "http://localhost:3000/admin/WorkerDashboard/4\~17-10-2021"&#x20;

#### The Date Box&#x20;

&#x20;The first feature, going top to bottom, is the Date Box where users are able to click the box and a calendar is displayed, the calendar has the option of selecting any date (except future dates), the selected date will then be displayed once the button "View New Date" is clicked

If there is no data for that date coming from the Api then no data should be displayed on the Worker Dashboard

If the date selected is not the current date then all data, the 24 hours for that date, will be displayed on the Worker Dashboard.

If the date is the current date then the data shown will be up to what is coming from the simulation and the API

#### Main Line Graph

Next feature is the line graph of all the decibel readings, the graph is zoomable and pannable. On the y-axis is the decibel value and the x- axis is the timestamp for that decibel reading. Users have the capability of zooming in all the way to a certain point where the exact second that dB reading has occurred.

The Graph features 16 dotted lines on the y-axis going from 0-140, with a colour of green-yellow-red depending on how dangerous the decibel reading is considered.

The Graph has 1 solid line indicating the Average dB reading from all the data. It too will be green/yellow/red depending on the value.

If new data is being fed into the API (i.e. The data is being updated in real time) the Graph will be continuously updating.&#x20;

Below the Graph displayed is what room the worker is currently in.

![Image 1: Main Line Chart Zoomed In WIth Current Room Displayed](<../.gitbook/assets/Screen Shot 2021-10-17 at 11.19.02 pm.png>)



#### Decibel Occurrences

A continuously updating pie chart indicating how many decibel readings the worker experienced were within a certain range.

* Safe: 0-70 dB&#x20;
* Dangerous: 70-90 dB
* Threatening: 90-112 dB
* Unsafe: >112 dB

The legend is clickable so that the pie chart can display and compare the different ranges.

#### Average Gauge

A continuously updating gauge is used to display the average decibel reading for the worker, it has the same range as the pie chart indicating green-yellow-orange-red for Safe, Dangerous, Threatening and UnSafe.&#x20;

On hover of the indicator it will display the exact value of the average value for the user.

#### Max Gauge

Next to the Average Gauge is the Max Gauge that indicates the Max decibel reading the worker has experienced for the day.

#### Averages & Max Decibels For Every Hour

A continuously updating vertical bullet chart is used to display the averages and max decibels across the 24 hours for every 1 hour interval that the worker has experienced.

The bar is used to display the average dB value and the bullet point is used to display the max dB for that hour. There exists 2 lines indicating to users a level that would consider Warning and a level that is Critical to workers. The ranges of Safe, Dangerous, Threatening and UnSafe are also displayed on the chart going from a light grey to a dark grey.

On hover of elements, the values are displayed. Hovering the bar will display the average dB for that hour, hovering the different ranges will display the value for that range, and hovering the bullet point will display the time of occurrence for that max dB and the value of the dB reading.&#x20;

If no data exists yet for that hour no bar will be displayed until data for that hour is in the API. It will then continuously change until that hour is up and then will continue for the next Bar.

#### Dosimeter

A noise Dosimeter is a a sound level meter intended specifically to measure the noise exposure over a period of time (i.e. 8 working hours), usually to comply with Health and Safety regulations.

The Dosimeter features another gauge similar to the others that is from 0-100% and displays the percentage of exposure to harmful noises that the worker has experienced. A total dose of 100% indicates that the worker has reached the level of noise exposure for that day according to Health and Safety guidelines.

Below the the Total Dosimeter Gauge is a horizontal bullet chart indicating the different ranges of harmful dB values and how long the worker can be exposed to that level. For example the worker can experience 85-88 dB values for a max of 8 hours (28800 seconds) until his total dosage would reach 100% for that day. The higher the level of dB the quicker the total dosage will increase.&#x20;

Going down the horizontal bar charts, the different values of dB increase and the times the worker can be exposed to that dB level lowers.

On hover of the bar, the amount of seconds the worker has been exposed to for that dB range is displayed.

![Image 2: Total Dosage Meter Around 80%](<../.gitbook/assets/Screen Shot 2021-10-18 at 12.27.29 am.png>)

![Image 3: Dosimeter Chart](<../.gitbook/assets/Screen Shot 2021-10-18 at 12.27.40 am.png>)

