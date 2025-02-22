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



// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

function SidenavFooter() {
  const [controller] = useArgonController();
  const { miniSidenav } = controller;

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
     
    </ArgonBox>
  );
}

export default SidenavFooter;
