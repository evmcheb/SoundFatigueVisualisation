import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import FetchDataTwo from "./FetchData/FetchDataTwo";
import Users from "views/Users.js";
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
    path: "/users",
    name: "Users",
    icon: "tim-icons icon-single-02",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
];
export default routes;
