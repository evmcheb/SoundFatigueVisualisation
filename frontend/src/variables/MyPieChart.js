import React from 'react';
//////////////
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Title,
  Font,
} from 'devextreme-react/pie-chart';
//
import { areas } from "../FetchData/FetchDataTwo";
///
class MyPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.pointClickHandler = this.pointClickHandler.bind(this);
    this.legendClickHandler = this.legendClickHandler.bind(this);
  }

  render() {
    return (
      <PieChart
        id="pie"
        dataSource={areas}
        palette="Bright"
       
        onPointClick={this.pointClickHandler}
        onLegendClick={this.legendClickHandler}
      >
        <Series
          argumentField="risk"
          valueField="area"
        >
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>

        <Size width={500} />
        <Title text="Decibel Occurenses" >
          <Font size={28} color="white" />
        </Title>
      </PieChart>
    );
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    let arg = e.target;
    let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
  }
}

export default MyPieChart;