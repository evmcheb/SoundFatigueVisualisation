import React from "react";
import { shallow, mount } from "enzyme";
import Dashboard from "./views/Dashboard"
import WorkerDashboard from "./views/WorkerDashboard"
import "setupTest"
import FetchRoomData from "FetchData/FetchRoomData";

import FetchWorkerData from "FetchData/FetchWorkerData";
import MainPage from "./views/MainPage";
import ScrollLineGraph from "variables/ScrollLineGraph";
import TheDateBox from "variables/TheDateBox";
import MyPieChart from "variables/MyPieChart";
import AvgGauge from "variables/AvgGauge";
import MaxGuage from "variables/MaxGuage";
import VerticalBulletChart from "variables/VerticalBulletChart";
import PitchGraph from "variables/PitchGraph";
import { Dropdown } from 'react-bootstrap';
import WorkerGraph from "variables/WorkerGraph";
import AverageWorkGauge from "variables/AverageWorkGuage";
import WorkerPieChart from "variables/WorkerPieChart";
import MaxWorkerGuage from "variables/MaxWorkerGuage";
import VerticalBulletWorker from "variables/VerticalBulletWorker";
import AccordionWorkerDash from "variables/AccordionWorkerDash";
import TotalDosageGuage from "variables/TotalDosageGuage";
import BulletChartGroup from "variables/BulletChartGroup";
import LiveGuage from "variables/LiveGuage";
//console.log(component.debug());
//Testing Room Dashboards
test("Renders Room Dashboard with no parameters", () => {
    const match = { params: { id: 'id' ,date:'date'} }
    const component = shallow(<Dashboard  match={match}/>);
    
   });
test("Main Page is rendered When No Params", () => {
    const match = { params: { id: 'id' ,date:'date'} }
    const component = shallow(<Dashboard  match={match}/>);
    expect(component.find(MainPage).length).toEqual(1);
   });

test("Check If FetchRoomData Is Called For room 1 with An input date of 18-10-2021", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(FetchRoomData).length).toEqual(1);
});
//--------------------------------------
//Testing All data displaying components
test("Check TheDateBox Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(TheDateBox).length).toEqual(1);
});
test("Check ScrollLineGraph Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(ScrollLineGraph).length).toEqual(1);
});
test("Check PieChart Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(MyPieChart).length).toEqual(1);
});
test("Check AvgGauge Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(AvgGauge).length).toEqual(1);
});
test("Check MaxGauge Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(MaxGuage).length).toEqual(1);
});
test("Check Vertical Bar Chart Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(VerticalBulletChart).length).toEqual(1);
});
test("Check Pitch Chart Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<Dashboard match={match}/>);
    expect(component.find(PitchGraph).length).toEqual(1);
});
//-----------------------------------



//Testing Worker Dashboar
test("Renders Worker Dashboard with No Parameters", () => {
    const match = { params: { id: 'id' ,date:'date'} }
    const component = shallow(<WorkerDashboard match={match}/>);
   });
test("Renders Dropdown Menu When No Params", () => {
    const match = { params: { id: 'id' ,date:'date'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    
    expect(component.find(Dropdown).length).toEqual(1);
});
test("Check If FetchWorkerData Is Called For Worker Shane (id:4) with An input date of 18-10-2021", () => {
    const match = { params: { id: '4' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(FetchWorkerData).length).toEqual(1);
});
//Testing All Worker DashBoard components are rendered
//-----------------------------------------
test("Check Worker TheDateBox Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(TheDateBox).length).toEqual(1);
});
test("Check Worker ScrollLineGraph Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(WorkerGraph).length).toEqual(1);
});
test("Check Worker PieChart Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(WorkerPieChart).length).toEqual(1);
});
test("Check Worker AvgGauge Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(AverageWorkGauge).length).toEqual(1);
});
test("Check Worker MaxGauge Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(MaxWorkerGuage).length).toEqual(1);
});
test("Check Worker Vertical Bar Chart Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(VerticalBulletWorker).length).toEqual(1);
});
test("Check Worker Dosimeter Is rendered", () => {
    const match = { params: { id: '1' ,date:'18-10-2021'} }
    const component = shallow(<WorkerDashboard match={match}/>);
    expect(component.find(AccordionWorkerDash).length).toEqual(1);
    const component2 = shallow(<AccordionWorkerDash/>);
    expect(component2.find(TotalDosageGuage).length).toEqual(1);
    expect(component2.find(BulletChartGroup).length).toEqual(1);
});



