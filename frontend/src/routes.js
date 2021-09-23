import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import FetchDataTwo from "./FetchData/FetchDataTwo";
import MainPage from "./views/MainPage";

var routes = [
  
  {
    path: "/mainpage",
    name: "Main Room Page",
    icon: "tim-icons icon-chart-pie-36",
    component: MainPage,
    layout: "/admin",
  },
  {
    path: "/userprofile",
    name: "UserProfile",
    icon: "tim-icons icon-chart-pie-36",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  
  
];
export default routes;
