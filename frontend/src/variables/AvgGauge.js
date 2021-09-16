import React from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export ,Tooltip} from 'devextreme-react/circular-gauge';
import { avgDecibel,averageDecibelColour,maxDecibel} from "../FetchData/FetchDataTwo";

class App extends React.Component {

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
          <Range startValue={0} endValue={60} />
          <Range startValue={60} endValue={95} />
          <Range startValue={95} endValue={115} />
          <Range startValue={115} endValue={160} />
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

export default App;