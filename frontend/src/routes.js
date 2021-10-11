import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import FetchDataTwo from "./FetchData/FetchDataTwo";
import Users from "views/Users.js";
import MainPage from "views/MainPage";
import Settings from "views/Settings";
import WorkerDashboard from "views/WorkerDashboard";

var routes = [

    {
        path: "/mainpage",
        name: "Dashboard",
        icon: "tim-icons icon-chart-pie-36",
        component: MainPage,
        layout: "/admin",
    },
    {
      path: "/Dashboard/:id~:date",
      name: "Room Analytics",
      icon: "tim-icons icon-components",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/WorkerDashboard/:id~:date",
      name: "Worker Dashboard",
      icon: "tim-icons icon-components",
      component: WorkerDashboard,
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
    {
        path: "/settings",
        name: "settings",
        icon: "tim-icons icon-align-center",
        component: Settings,
        layout: "/admin",
    },
    
];
export default routes;