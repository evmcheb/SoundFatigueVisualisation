---
description: User guide on using and viewing the features of the Room Dashboard.
---

# Room Dashboard

## Main Page

The initial Room Dashboard is a display of all the rooms that exist. It contains links to each separate room where the visualisations are displayed for that room.

The href for main page is "`http://localhost:3000/admin/Dashboard/:id~:date`"&#x20;

Where: id will be the room id and date is entered as `dd-mm-yyyy`

For example "`http://localhost:3000/admin/Dashboard/1~15-10-2021`" will display the visualisations for room 1 for the 15th of October 2021.

Clicking the links contained on the Main Page will direct you automatically to the selected room and the current dates' data will be entered.

Displayed are the gauges displaying live decibel reading for the separate rooms.

## Room Dashboards

#### The Date Box

The first feature, going top to bottom, is the Date Box where users are able to click the box and a calendar is displayed, the calendar has the option of selecting any date (except future dates), the selected date will then be displayed once the button "View New Date" is clicked

If there is no data for that date coming from the Api then no data should be displayed on the Room Dashboard

If the date selected is not the current date then all data, the 24 hours for that date, will be displayed on the Room Dashboard.

If the date is the current date then the data shown will be up to what is coming from the simulation and the API

![Image 1: Selecting a Date to Display](<../.gitbook/assets/Screen Shot 2021-10-17 at 10.01.34 pm.png>)

#### Main Line Graph

Next feature is the line graph of all the decibel readings, the graph is zoomable and pannable. On the y-axis is the decibel value and the x- axis is the timestamp for that decibel reading. Users have the capability of zooming in all the way to a certain point where the exact second that dB reading has occurred.

The Graph features 16 dotted lines on the y-axis going from 0-140, with a colour of green-yellow-red depending on how dangerous the decibel reading is considered.

The Graph has 1 solid line indicating the Average dB reading from all the data. It too will be green/yellow/red depending on the value.

If new data is being fed into the API (i.e. The data is being updated in real time) the Graph will be continuously updating.&#x20;

![Image 2: Line Graph ](<../.gitbook/assets/Screen Shot 2021-10-17 at 10.09.43 pm.png>)

#### Decibel Occurrences

A continuously updating pie chart indicating how many decibel readings were within a certain range

* Safe: 0-70 dB&#x20;
* Dangerous: 70-90 dB
* Threatening: 90-112 dB
* Unsafe: >112 dB

![Image 3: Pie chart displaying the decibel occurrences count](<../.gitbook/assets/Screen Shot 2021-10-17 at 10.21.27 pm.png>)

The legend is clickable so that the pie chart can display and compare the different ranges.

![Image 4: Pie Chart with Safe unselected](<../.gitbook/assets/Screen Shot 2021-10-17 at 10.23.04 pm.png>)

#### Average Gauge

A continuously updating gauge is used to display the average decibel reading in the room, it has the same range as the pie chart indicating green-yellow-orange-red for Safe, Dangerous, Threatening and UnSafe.&#x20;

When hovering on the indicator, it will display the exact value of the average value for the user.

![Image 5: Average Gauge in the Safe Zone ](<../.gitbook/assets/Screen Shot 2021-10-17 at 10.33.10 pm.png>)

#### Max Gauge

Next to the Average Gauge is the Max Gauge that indicates the Max decibel reading in the room across the data. Same gauge display as Image 5.

#### Averages & Max Decibels For Every Hour

A continuously updating vertical bullet chart is used to display the averages and max decibels across the 24 hours for every 1-hour interval.

The bar is used to display the average dB value and the bullet point is used to display the max dB for that hour. There exists 2 lines indicating to users a level that would consider Warning and a level that is Critical to workers. The ranges of Safe, Dangerous, Threatening and UnSafe are also displayed on the chart going from a light grey to a dark grey.

On hover of elements, the values are displayed. Hovering the bar will display the average dB for that hour, hovering the different ranges will display the value for that range, and hovering the bullet point will display the time of occurrence for that max dB and the value of the dB reading.&#x20;

If no data exists yet for that hour no bar will be displayed until data for that hour is in the API. It will then continuously change until that hour is up and then will continue for the next Bar.

![Image 6: Vertical Bullet Chart for Room](<../.gitbook/assets/Screen Shot 2021-10-17 at 10.50.14 pm.png>)

#### Pitch Line Chart

Lastly featured is a continuously updating line graph of the pitch readings in the room. On the y-axis is the pitch value and the x-axis is the timestamp for said value.

The graph is zoomable and pannable.
