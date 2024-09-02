/* eslint-disable no-unused-vars */
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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";
import { FaCar } from "react-icons/fa";
// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";
import { FaCarSide } from "react-icons/fa6";
import { RiMotorbikeFill, RiFileList3Line } from 'react-icons/ri';
import Card from 'react-bootstrap/Card';
import { Line } from 'react-chartjs-2';
// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import Tabsales from "layouts/sales/components/tabsale";
import Tabsnew from "layouts/receipt/components/tab";
import Tabreports from "layouts/reports/compnents/tabreports";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaPenAlt } from "react-icons/fa";
import borders from "assets/theme/base/borders";
function Default() {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Car',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Bike',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,99,132,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [30, 45, 55, 45, 65, 50, 35]
      }
    ]
  };



  const { size } = typography;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
      <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total Vehicle"
              count="530"
              icon={{ color: "info", component: <FaCar /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="4 Wheeler"
              count="23"
              icon={{ color: "error", component: <FaCarSide /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="2 Wheeler"
              count="3"
              icon={{ color: "success", component: <RiMotorbikeFill /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="sales"
              count="10,430"
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
            />
          </Grid>
          
        </Grid>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
              <Card sx={{ position: "relative", display: "block", height: "100%", overflow: "hidden",border:'none'}}>
          <ArgonBox m={2}>
              <ArgonBox display="flex" alignItems="center">
                <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                </ArgonBox>
                <ArgonTypography variant="button"  fontWeight="medium">
                  4% more{" "}
                  <ArgonTypography variant="button" fontWeight="regular">
                    in 2022
                  </ArgonTypography>
                </ArgonTypography>
              </ArgonBox>
              <ArgonBox mt={4}>
                <div>
                  <Line
                    data={lineChartData}
                    options={{
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true
                          }
                        }]
                      }
                    }}
                  />
                </div>
              </ArgonBox>
            </ArgonBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} >
        <Tabsnew></Tabsnew>
          </Grid>
          <Grid item xs={12} md={12}>
          <Tabsales></Tabsales>
          </Grid>
          <Grid item xs={12} md={12}>
       <Tabreports></Tabreports>
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
