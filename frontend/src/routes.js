import Dashboard from "views/Dashboard.js";

import Notifications from "views/Notifications.js";

import Settings from "views/Settings";
import WorkerDashboard from "views/WorkerDashboard";

var routes = [


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