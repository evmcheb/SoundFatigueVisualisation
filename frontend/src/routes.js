import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Settings from "views/Settings";


var routes = [{
        path: "/dashboard",
        name: "Dashboard",
        icon: "tim-icons icon-chart-pie-36",
        component: Dashboard,
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