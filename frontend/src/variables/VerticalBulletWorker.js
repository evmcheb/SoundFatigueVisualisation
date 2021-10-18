import React from 'react'
import { ChartBullet, ChartContainer } from '@patternfly/react-charts';

import  { averagesOverHours ,done,maxDbHours} from "../FetchData/FetchWorkerData";


class VerticalBulletWorker extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: {averagesOverHours,maxDbHours},
          render:false
        };

      }

      componentDidMount(){
          
            setTimeout(function(){
             
                this.setState({render:true})
            }.bind(this),5000)

          this.interval = setInterval(() => this.setState({  data: {averagesOverHours,maxDbHours }}), 20000);
          
      }
     

      render(){
       
        let renderContainer = false;
        if(this.state.render ===true) {
      
            if(done===1 && this.state.data.averagesOverHours ===0){

                console.log(maxDbHours)
                this.setState({data: {averagesOverHours,maxDbHours}});
                
                
            }

            if(done===-1){

                this.componentDidMount();
            }
            

        return (
            
            <>
            
            <ChartContainer 
                ariaDesc="Storage capacity"
                ariaTitle="Bullet chart example"
                height={750}
                width={3025}
              >
              <ChartBullet
                primaryDotMeasureLegendData = {[{name:'Dot: Max dB and Time of Occurence'}]}
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeErrorMeasureLegendData={[{ name: 'Critical' }]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                comparativeWarningMeasureLegendData={[{ name: 'Warning' }]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 50,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[0].time, y: this.state.data.maxDbHours[0].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[0].value }]}
                primarySegmentedMeasureLegendData={[{ name: 'Bar: Average dB' }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                
                standalone={false}
                title="00:00 - 01:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 325,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[1].time, y: this.state.data.maxDbHours[1].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[1].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="01:00 - 02:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 575,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[2].time, y: this.state.data.maxDbHours[2].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[2].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="02:00 - 03:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y:95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 825,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[3].time, y: this.state.data.maxDbHours[3].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[3].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="03:00 - 04:00"
                width={500}
              />
              
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 1075,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[4].time, y: this.state.data.maxDbHours[4].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[4].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="04:00 - 05:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 1325,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[5].time, y: this.state.data.maxDbHours[5].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[5].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="05:00 - 06:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 1575,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[6].time, y: this.state.data.maxDbHours[6].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[6].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="06:00 - 07:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 1825,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[7].time, y: this.state.data.maxDbHours[7].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[7].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="07:00 - 08:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 2075,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[8].time, y: this.state.data.maxDbHours[8].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[8].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="08:00 - 09:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 2325,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[9].time, y: this.state.data.maxDbHours[9].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[9].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="09:00 - 10:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 2575,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[10].time, y: this.state.data.maxDbHours[10].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[10].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="10:00 - 11:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 2825,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[11].time, y: this.state.data.maxDbHours[11].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[11].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="11:00 - 12:00"
                width={500}
              />
              {/* after midday */}


              
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 3075,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[12].time, y: this.state.data.maxDbHours[12].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[12].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="12:00 - 13:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 3325,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[13].time, y: this.state.data.maxDbHours[13].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[13].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="13:00 - 14:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 3575,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[14].time, y: this.state.data.maxDbHours[14].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[14].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="14:00 - 15:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 3825,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[15].time, y: this.state.data.maxDbHours[15].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[15].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="15:00 - 16:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 4075,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[16].time, y: this.state.data.maxDbHours[16].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[16].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="16:00 - 17:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 4325,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[17].time, y: this.state.data.maxDbHours[17].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[17].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="17:00 - 18:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 4575,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[18].time, y: this.state.data.maxDbHours[18].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[18].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="18:00 - 19:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: this.state.data.maxDbHours[18].time, y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 4825,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[19].time, y: this.state.data.maxDbHours[19].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[19].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="19:00 - 20:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 5075,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[20].time, y: this.state.data.maxDbHours[20].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[20].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="20:00 - 21:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 5325,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[21].time, y: this.state.data.maxDbHours[21].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[21].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="21:00 - 22:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 5575,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[22].time, y: this.state.data.maxDbHours[22].value  }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[22].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="22:00 - 23:00"
                width={500}
              />
              <ChartBullet
                comparativeErrorMeasureData={[{name: 'Critical', y: 130}]}
                comparativeWarningMeasureData={[{name: 'Warning', y: 95}]}
                constrainToVisibleArea
                height={750}
                horizontal={false}
                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                maxDomain={{y: 140}}
                padding={{
                  bottom: 125, // Adjusted to accommodate legend
                  left: 5825,
                  right: 50,
                  top: 50
                }}
                primaryDotMeasureData={[{ name: this.state.data.maxDbHours[23].time, y: this.state.data.maxDbHours[23].value }]}
                primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.averagesOverHours[23].value }]}
                qualitativeRangeData={[{ name: 'Range', y: 70 }, { name: 'Range', y: 90 },{name: 'Range',y:112},{name: 'Range',y:140}]}
                standalone={false}
                title="23:00 - 24:00"
                
                width={500}
              />
            </ChartContainer>
      </>
);
}


return (
    
    renderContainer //Render the dom elements, or, when this.state == false, nothing.
    
  )

}

  
}

export default VerticalBulletWorker;