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
    path: "/Dashboard/:id~:date",
    name: "MainPage",
    icon: "tim-icons icon-components",
    component: Dashboard,
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
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
];
export default routes;
