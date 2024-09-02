import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Table } from 'reactstrap';
import axios from 'axios';
import '../css/tab.css'; // Import your CSS file for custom styling
import mplus from "../../../assets/images/mplus.png";
import '../../../assets/css/successgif.css';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
const UserSiteReport = () => {
  const [reportData, setReportData] = useState([]);
  const receiptRef = useRef(null);
  const [summary, setSummary] = useState({
    twoWheelerCount: 0,
    twoWheelerAmount: 0,
    fourWheelerCount: 0,
    fourWheelerAmount: 0,
    twoWheelerPassCount: 0,
    fourWheelerPassCount: 0,
    todaytwoWheelerPassCount: 0,
    todayfourWheelerPassCount: 0,
    todaytwoWheelerPassAmount: 0,
    todayfourWheelerPassAmount: 0,
    boomBarrierPenaltyCount: 0,
    boomBarrierPenaltyAmount: 0,
    nightParkingPenaltyCount: 0,
    nightParkingPenaltyAmount: 0,
  });

  const handleShowReport = async () => {
    try {
      // Retrieve required session parameters from sessionStorage
      const imei = sessionStorage.getItem('IMEI');
      const emailID = sessionStorage.getItem('Email');
      const password = sessionStorage.getItem('Password');
      const token = sessionStorage.getItem('Token');

      if (!imei || !emailID || !password || !token) {
        console.error('Required session parameters are missing');
        return;
      }

      // Get today's date as a Date object and in YYYY-MM-DD format
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];

      const url = `/api/AppServerCall/getRequests`;
      const data = {
        imei,
        emailID,
        password,
        token,
        search: todayStr, // Use today's date as the search parameter
        type: 1
      };

      const response = await axios.post(url, data);

      console.log('User and Site wise sales data:', response.data);
      let list = [];


      if (response.data && response.data.Data && Array.isArray(response.data.Data.list)) {
        const list = response.data.Data.list;
        setReportData(list);

        // Calculate summary
        const newSummary = {
          twoWheelerCount: list.filter(item => item.vehtype === '2 Wheeler').length,
          fourWheelerCount: list.filter(item => item.vehtype === '4 Wheeler').length,
          twoWheelerAmount: list
            .filter(item => item.vehtype === '2 Wheeler')
            .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0),
          fourWheelerAmount: list
            .filter(item => item.vehtype === '4 Wheeler')
            .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0),
          boomBarrierPenaltyCount: 0,
          nightParkingPenaltyCount: 0,
          boomBarrierPenaltyAmount: 0,
          nightParkingPenaltyAmount: 0,
          twoWheelerPassCount: 0,
          fourWheelerPassCount: 0,
          twoWheelerPassAmount: 0,
          fourWheelerPassAmount: 0,
          todaytwoWheelerPassCount: 0,
          todayfourWheelerPassCount: 0,
          todaytwoWheelerPassAmount: 0,
          todayfourWheelerPassAmount: 0
        };

        list.forEach(item => {
          const passStartDate = new Date(item.passstartdate);
          const penaltyTime = new Date(item.penaltytime);

          // Check for penalties today
          if (penaltyTime.toDateString() === today.toDateString()) {
            if (item.penaltytype === 'Boom Barrier Damage') {
              newSummary.boomBarrierPenaltyCount += 1;
              newSummary.boomBarrierPenaltyAmount += parseFloat(item.penaltyamount || 0);
            } else if (item.penaltytype === '4WH Night Parking') {
              newSummary.nightParkingPenaltyCount += 1;
              newSummary.nightParkingPenaltyAmount += parseFloat(item.penaltyamount || 0);
            }
          }

          // Filter passes based on the start date and update summary
          if (passStartDate <= today) {
            if (item.passtype === '2WH MONTHLY PASS') {
              newSummary.twoWheelerPassAmount += parseFloat(item.passamount || 0);
              newSummary.twoWheelerPassCount += 1;
            } else if (item.passtype === '4WH MONTHLY PASS') {
              newSummary.fourWheelerPassAmount += parseFloat(item.passamount || 0);
              newSummary.fourWheelerPassCount += 1;
            } else if (item.passtype === '4WH Quarterly Pass') {
              newSummary.fourWheelerPassAmount += parseFloat(item.passamount || 0);
              newSummary.fourWheelerPassCount += 1;
            }
          }

          // Check for passes on the selected date
          if (passStartDate.toDateString() === today.toDateString()) {
            if (item.passtype === '2WH MONTHLY PASS') {
              newSummary.todaytwoWheelerPassAmount += parseFloat(item.passamount || 0);
              newSummary.todaytwoWheelerPassCount += 1;
            } else if (item.passtype === '4WH MONTHLY PASS') {
              newSummary.todayfourWheelerPassAmount += parseFloat(item.passamount || 0);
              newSummary.todayfourWheelerPassCount += 1;
            } else if (item.passtype === '4WH Quarterly Pass') {
              newSummary.todayfourWheelerPassAmount += parseFloat(item.passamount || 0);
              newSummary.todayfourWheelerPassCount += 1;
            }
          }
        });

        setSummary(newSummary);
      } else {
        console.error('Unexpected data format:', response.data);
        setReportData([]);
      }

    } catch (error) {
      console.error('Error fetching user and site wise sales data:', error);
    }
  };


  const printReceipt = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            .receipt {
              text-align: center;
            }
            .center-image {
              display: block;
              margin: 0 auto;
            }
            .receipt-description {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-bottom: 10px;
              margin: 10px 0 1px 0;
            }
            .receipt-description p {
              font-size: 12px;
              margin: 5px 0 1px 0;
              line-height: 1.1;
              color: #555;
            }
            .receipt-item p {
              font-size: 12px;
              margin: 1px 0;
              line-height: 1.1;
              white-space: nowrap;
            }
            .receipt-title {
              font-size: 14px;
              margin: 10px 0;
              text-align: center;
              border-bottom: 1px solid #000;
              padding-bottom: 5px;
            }
            .receipt-item p {
              font-size: 12px;
              margin: 1px 0;
              line-height: 1.1;
              white-space: nowrap;
              position: relative;
            }
            .receipt-item p:last-of-type {
              padding-bottom: 10px;
              border-bottom: 1px solid #000;
            }
            .receipt-footer {
              font-size: 5px;
              line-height: 1.1;
              color: #555;
              font-family: Arial;
            }
          </style>
        </head>
        <body>
          ${receiptRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => {
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
  };

  const totalVeh = summary.twoWheelerCount + summary.fourWheelerCount;
  const totalAmount = summary.twoWheelerAmount + summary.fourWheelerAmount + summary.todaytwoWheelerPassAmount + summary.todayfourWheelerPassAmount + summary.boomBarrierPenaltyAmount + summary.nightParkingPenaltyAmount;




  const generatePDF = (receiptRef) => {
    const receiptElement = receiptRef.current;

    // Add padding/margin to the receipt element
    const originalStyle = receiptElement.style.cssText;
    receiptElement.style.padding = '10px';
    receiptElement.style.margin = '10px';
    receiptElement.style.boxSizing = 'border-box';
    receiptElement.style.fontSize = '14px';

    html2canvas(receiptElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('User and Site Wise Sales Data Report.pdf');

      // Reset the style after generating the PDF
      receiptElement.style.cssText = originalStyle;
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
          <Card className='formcard'>
            <CardBody>
              <CardTitle tag="h6" className="cardt text-center">Todays Sale Report</CardTitle>
              <Button className='mybutton' color="info" block onClick={handleShowReport}>Show</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {reportData.length > 0 && (
        <Row className="justify-content-center mt-4">
          <Col md="8">
            <Card>
              <CardBody>
                <CardTitle tag="h6" className="cardt text-center">User and Site Wise Sales Data</CardTitle>
                <div id="printable-receipt" ref={receiptRef} className="receipt">
                  <img src={mplus} height="80" width="150" className="center-image" alt="Logo" />
                  <div className="receipt-description">
                    <p>
                      <strong>{reportData[0]?.siteName || 'Site Name'}</strong>
                    </p>
                    <p>MANAGED BY</p>
                    <p>
                      <strong>M PLUS PARKING</strong>
                    </p>
                  </div>
                  <h4 className="receipt-title"><strong>User and Site Wise Sales Data: {new Date().toLocaleDateString()}</strong></h4>

                  {/* Summary Table */}
                  <Table >
                    <thead>
                      <tr>
                        <th style={{ fontSize: '13px' }}>VEH</th>
                        <th style={{ fontSize: '13px' }}>QTY</th>
                        <th style={{ fontSize: '13px' }}>AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontSize: '12px' }}>2 W</td>
                        <td style={{ fontSize: '12px' }}>{summary.twoWheelerCount}</td>
                        <td style={{ fontSize: '12px' }}>{summary.twoWheelerAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '12px' }}>4 W</td>
                        <td style={{ fontSize: '12px' }}>{summary.fourWheelerCount}</td>
                        <td style={{ fontSize: '12px' }}>{summary.fourWheelerAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '12px' }}>2W Pass In</td>
                        <td style={{ fontSize: '12px' }}>{summary.twoWheelerPassCount}</td>
                        <td style={{ fontSize: '12px' }}>0.00</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '12px' }}>4W Pass In</td>
                        <td style={{ fontSize: '12px' }}>{summary.fourWheelerPassCount}</td>
                        <td style={{ fontSize: '12px' }}>0.00</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '12px' }}>Today 2W Pass</td>
                        <td style={{ fontSize: '12px' }}>{summary.todaytwoWheelerPassCount}</td>
                        <td style={{ fontSize: '12px' }}>{summary.todaytwoWheelerPassAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '12px' }}>Today 4W Pass</td>
                        <td style={{ fontSize: '12px' }}>{summary.todayfourWheelerPassCount}</td>
                        <td style={{ fontSize: '12px' }}>{summary.todayfourWheelerPassAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '12px' }}>Boom Barrier</td>
                        <td style={{ fontSize: '12px' }}>{summary.boomBarrierPenaltyCount}</td>
                        <td style={{ fontSize: '12px' }}>{summary.boomBarrierPenaltyAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: '12px' }}>Night Parking</td>
                        <td style={{ fontSize: '12px' }}>{summary.nightParkingPenaltyCount}</td>
                        <td style={{ fontSize: '12px' }}>{summary.nightParkingPenaltyAmount.toFixed(2)}</td>
                      </tr>
                      <tr style={{ fontWeight: 'bold' }}>
                        <td style={{ fontSize: '12px' }}>Total</td>
                        <td style={{ fontSize: '12px' }}>{totalVeh}</td>
                        <td style={{ fontSize: '12px' }}>{totalAmount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <p className="receipt-footer">
                    <br />
                    <span style={{ fontSize: "10px", fontFamily: 'Arial' }}>
                      We are not responsible for any vehicle damage or theft. Vehicles are parked at the
                      owners risk. This receipt is valid for single-use only.
                    </span>
                  </p>
                </div>
                <Row>
                  <Col md={6}>
                    <Button className="w-100" onClick={() => generatePDF(receiptRef)}>
                      Download PDF
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button className="w-100" color="primary" onClick={printReceipt}>
                      Print Receipt
                    </Button>
                  </Col>
                </Row>
              </CardBody>

            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );};

export default UserSiteReport;
