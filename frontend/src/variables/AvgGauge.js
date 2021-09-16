import React from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export ,Tooltip} from 'devextreme-react/circular-gauge';
import { avgDecibel,averageDecibelColour,maxDecibel} from "../FetchData/FetchDataTwo";

class AvgGauge extends React.Component {

  render() {
    return (
      <CircularGauge
        id="gauge"
        value={avgDecibel}
      >
        <Scale startValue={0} endValue={maxDecibel} tickInterval={10}>
          <Label useRangeColors={true} />
        </Scale>
        <RangeContainer palette="bright">
          <Range startValue={0} endValue={70} />
          <Range startValue={70} endValue={91} />
          <Range startValue={91} endValue={112} />
          <Range startValue={112} endValue={160} />
        </RangeContainer>
        <Tooltip enabled={true} />
        <Title text="Average Decibels in Room" >
          <Font size={28} color="white" />
        </Title>
        <Export enabled={false} />
      </CircularGauge>
    );
  }
}

export default AvgGauge;