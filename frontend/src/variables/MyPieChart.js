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
import { areas, done } from "../FetchData/FetchRoomData";
///
class MyPieChart extends React.Component {
    constructor(props) {
        super(props);

        this.pointClickHandler = this.pointClickHandler.bind(this);
        this.legendClickHandler = this.legendClickHandler.bind(this);
        this.state = {
            data: { areas },
            render: false
        };
    }


    componentDidMount() {

        setTimeout(function() {
            this.setState({ render: true })
        }.bind(this), 600)

        this.interval = setInterval(() => this.setState({ time: Date.now(), data: { areas } }), 16100);


    }


    render() {

        let renderContainer = false
        if (this.state.render) {
            console.log({ done })
            if (done=== 1 && this.state.data.areas === 0) {

                this.setState({ data: { areas } });

            }
            if (done === -1) {
                this.componentDidMount();
            }
            return ( <PieChart id = "pie"
                dataSource = { areas }
                palette = "Bright"

                onPointClick = { this.pointClickHandler }
                onLegendClick = { this.legendClickHandler } >
                <Series argumentField = "risk"
                valueField = "area" >
                <Label visible = { true } >
                    <Connector visible = { true }width = { 1 }/> 
                    </Label >
                </Series>

                <Size width = { 500 }/> 
                <Title text = "Decibel Occurrences" >
                <Font size = { 28 } color = "gray" / >
                    </Title> 
                </PieChart>
            );
        }


        return (
            renderContainer //Render the dom elements, or, when this.state == false, nothing.

        )

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