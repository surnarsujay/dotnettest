/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";

import Profile from "layouts/login/Profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import Tabsnew from "layouts/receipt/components/tab";
import Receipt from "layouts/receipt";
import Tabsales from "layouts/sales/components/tabsale";
import Sales from "layouts/sales";
import Tabreports from "layouts/reports/compnents/tabreports";
import Reports from "layouts/reports";

import Login from 'layouts/login/Login'
import Pass from "layouts/sales/components/pass";
import Panelty from "layouts/sales/components/panelty";
import SignUpnew from "layouts/login/signupnew";


const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="15px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Recipts",
    key: "recipts",
    route: "/recipts",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="15px" className="ni ni-calendar-grid-58" />
    ),
    component: <Receipt />,
  },
  {
    type: "route",
    name: "Sales",
    key: "sales",
    route: "/sales",
    icon: (
      <ArgonBox component="i" color="info" fontSize="15px" className="ni ni-single-copy-04" />
    ),
    component: <Sales />,
  },
  {
    type: "route",
    name: "Reports",
    key: "report",
    route: "/report",
    icon: (
      <ArgonBox component="i" color="info" fontSize="15px" className="ni ni-collection" />
    ),
    component: <Reports />,
  },
  {
    route: "/login",
    component: < Login />,
  },
  {
    route: "/profile",
    component: < Profile />,
  },

  {
    route: "/pass",
    component: < Pass />,
  },

  {
    route: "/panelty",
    component: < Panelty />,
  },
  {
    route: "/newsignup",
    component: < SignUpnew />,
  },

];

export default routes;
