import React from 'react'
import { ChartBullet, ChartContainer } from '@patternfly/react-charts';
import { barChartData, done } from "../FetchData/FetchWorkerData";


class BulletChartGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { barChartData },
      render: false
    };


  }

  componentDidMount() {

    setTimeout(function () {
      this.setState({ render: true })
    }.bind(this), 8000)

    this.interval = setInterval(() => this.setState({ data: { barChartData } }), 20000);

  }


  render() {

    let renderContainer = false
    if (this.state.render) {

      if (done === 1 && this.state.data.barChartData.length === 0) {



        this.setState({ data: { barChartData } });


      }
      if (done === -1) {
        this.componentDidMount();
      }

      return (
        // <>

        <div style={{ marginLeft: '190px', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <ChartContainer
            ariaDesc="Storage capacity"
            ariaTitle="Bullet chart"
            height={1000}
            // width={1000}
          >
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 28800 }]}
              constrainToVisibleArea
              groupSubTitle="Over 24 Hours"
              groupTitle="Dosage"
              height={575}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 28800 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 275 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[0].value }]}
              standalone={false}
              subTitle="MAX: 8 Hours"
              title="85 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 14400 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 14400 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 450 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[1].value }]}

              standalone={false}
              subTitle="MAX: 4 Hours"
              title="88 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 7200 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 7200 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 625 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[2].value }]}

              standalone={false}
              subTitle="MAX: 2 Hours"
              title="91 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 3600 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 3600 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 800 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[3].value }]}

              standalone={false}
              subTitle="MAX: 1 Hour"
              title="94 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 1800 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 1800 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 975 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[4].value }]}

              standalone={false}
              subTitle="MAX: 30 Minutes"
              title="97 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 900 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 900 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 1150 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[5].value }]}

              standalone={false}
              subTitle="MAX: 15 Minutes"
              title="100 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 450 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 450 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 1325 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[6].value }]}

              standalone={false}
              subTitle="MAX: 7 Minutes 30 Seconds"
              title="103 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 225 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 225 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 1500 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[7].value }]}

              standalone={false}
              subTitle="MAX: 3 Minutes 45 Seconds"
              title="106 DB"
              width={732.5}
            />
            <ChartBullet
              comparativeErrorMeasureData={[{ name: 'Max Seconds', y: 110 }]}
              constrainToVisibleArea
              height={600}
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              maxDomain={{ y: 110 }}
              padding={{
                bottom: 100, // Adjusted to accommodate legend
                left: 200, // Adjusted to accommodate labels
                right: 50,
                top: 1675 // Adjusted to accommodate group labels
              }}
              primarySegmentedMeasureData={[{ name: 'Measure', y: this.state.data.barChartData[8].value }]}
              primarySegmentedMeasureLegendData={[{ name: 'Seconds of DB Value' }]}


              standalone={false}
              subTitle="MAX: 1 Minute 50 Seconds"
              title=">109 DB"

              width={732.5}

            />

          </ChartContainer>
        </div>
        // </>
      );
    }


    return (
      renderContainer //Render the dom elements, or, when this.state == false, nothing.

    )

  }


}

export default BulletChartGroup;