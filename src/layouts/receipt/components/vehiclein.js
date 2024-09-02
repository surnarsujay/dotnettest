import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import successgif from "../../../assets/images/succsessful2.gif";
import "../../../assets/css/successgif.css";
import mplus from "../../../assets/images/mplus.png";
import { useNavigate } from 'react-router-dom';
const VehicleIn = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({});
  
  const receiptRef = useRef(null);
  const duplicateReceiptRef = useRef(null);

  const navigate = useNavigate();

  const handlePassClick = () => {
    navigate('/sales'); // Navigate to the sales page
  };

  const handlePenaltyClick = () => {
    navigate('/sales'); // Navigate to the sales page
  };

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const imei = sessionStorage.getItem("IMEI");
        const emailID = sessionStorage.getItem("Email");
        const password = sessionStorage.getItem("Password");
        const token = sessionStorage.getItem("Token");
        const siteId = sessionStorage.getItem("SiteId");

        const response = await axios.post("/api/AppServerCall/getVehicleTypes", null, {
          params: {
            imei,
            emailID,
            password,
            token,
            siteId,
          },
        });

        console.log("API response:", response.data);

        if (response.data?.Data?.list && Array.isArray(response.data.Data.list)) {
          setVehicleTypes(response.data.Data.list);
        } else {
          console.error("Unexpected response data format:", response.data);
          setVehicleTypes([]);
        }
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
        setVehicleTypes([]);
      }
    };

    fetchVehicleTypes();
  }, []);

  const handleVehicleTypeChange = (e) => {
    const selectedType = vehicleTypes.find((type) => type.vehType === e.target.value);
    setVehicleType(e.target.value);
    setSelectedVehicleType(selectedType);
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
      setModal(false);
      setTimeout(() => {
        setDuplicateModal(true);
      }, 1000);
      // Close the window after printing
      printWindow.close();
    };
  };
  
  const printDuplicateReceipt = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Duplicate Receipt</title>
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
              margin: 10px 0 1px 0;
              margin-bottom: 10px;
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
          ${duplicateReceiptRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => {
      setDuplicateModal(false);
      // Close the window
      printWindow.close();
    };
  };
  

  const handleSubmit = async () => {
    if (!selectedVehicleType) {
      console.error("Vehicle type not selected");
      return;
    }

    const storedSession = {
      imei: sessionStorage.getItem("IMEI"),
      emailID: sessionStorage.getItem("Email"),
      password: sessionStorage.getItem("Password"),
      token: sessionStorage.getItem("Token"),
      rateId: selectedVehicleType.idRate,
      vehNo: vehicleNumber,
      siteId: sessionStorage.getItem("SiteId"),
      deviceId: sessionStorage.getItem("DeviceId"),
      userId: sessionStorage.getItem("IdCustomer"),
      rate: selectedVehicleType.rate,
      vehTypeId: selectedVehicleType.vehTypeId,
      isPrepaid: 0,
      vehType: selectedVehicleType.vehType,
    };

    try {
      const response = await axios.post("/api/AppServerCall/vehicleInRequest", null, {
        params: storedSession,
      });

      console.log("Vehicle checked in:", response.data);
      setVehicleDetails(response.data.Data);
      setSuccess(true);
      setVehicleNumber("");
      setVehicleType("");
      setSelectedVehicleType(null);
      setModal(true);

      setTimeout(() => setSuccess(false), 1000);
    } catch (error) {
      console.error("Error checking in vehicle:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-2 justify-content-center">
        <Col md="8">
          {success && (
            <div className="success-overlay">
              <img src={successgif} alt="Success" className="success-gif" />
            </div>
          )}
          <Card className="formcard">
            <CardBody>
              <CardTitle tag="h6" className="cardt text-center">
                Vehicle In
              </CardTitle>
              <FormGroup>
                <Label for="vehicleType" style={{ fontSize: "18px" }}>
                  Vehicle Type
                </Label>
                <Input
                  type="select"
                  name="vehicleType"
                  id="vehicleType"
                  value={vehicleType}
                  onChange={handleVehicleTypeChange}
                >
                  <option value="" disabled>
                    Select vehicle type
                  </option>
                  {vehicleTypes.map((type) => (
                    <option key={type.idRate} value={type.vehType}>
                      {type.vehType}
                    </option>
                  ))}
                </Input>
              </FormGroup>
           <Row>
           <Label for="vehicleNumber" style={{ fontSize: "18px" }}>
                  Vehicle Number
                </Label>
            <Col md={9}>

            <FormGroup>
               
                <Input
                  type="text"
                  id="vehicleNumber"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="Enter vehicle number"
                />
              </FormGroup>
            </Col>
            <Col md={3}>
               
            <Button type="button" className="btn btn-danger">ANPR </Button>
            </Col>        
           </Row>
         
              <Row className="mb-3 mt-2">
                <Col>
                  <Button color="info" className="mybutton" block onClick={handleSubmit}>
                    Parking In
                  </Button>
                </Col>
              </Row>
              <Row>
              <Col xs="6">
        <Button color="info" className="mybutton" block onClick={handlePassClick}>
          Pass
        </Button>
      </Col>
      <Col xs="6">
        <Button color="info" className="mybutton" block onClick={handlePenaltyClick}>
          Penalty
        </Button>
      </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Vehicle In Details</ModalHeader>

        <ModalBody>
          <div ref={receiptRef} className="receipt">
            <img src={mplus} height="80" width="150" className="center-image" alt="Logo" />
            <div className="receipt-description">
              <p>
                <strong>{vehicleDetails.siteName}</strong>
              </p>
              <p>MANAGED BY</p>
              <p>
                <strong>M PLUS PARKING</strong>
              </p>
            </div>

            <h4 className="receipt-title">
              <strong>VEHICLE IN RECEIPT</strong> {/* Underlined via CSS */}
            </h4>
            <div className="receipt-item">
              <p>
                Ticket Number: <strong>{vehicleDetails.receiptNumber}</strong>
              </p>
              <p>
                Vehicle Number: <strong>{vehicleDetails.vehNo}</strong>
              </p>
              <p>
                Vehicle Type: <strong>{vehicleDetails.vehType}</strong>
              </p>
              <p>
                In Time: <strong>{vehicleDetails.inTime}</strong>
              </p>
              <p>
                Rate: <strong>{vehicleDetails.rate}</strong>
              </p>
            </div>
            <p className="receipt-footer">
              <span style={{ fontSize: "10px", fontFamily: 'Arial' }}>
                We are not responsible for any vehicle damage or theft. Vehicles are parked at the
                owners risk. This receipt is valid for single-use only.
              </span>
            </p>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={printReceipt}>
            Print
          </Button>

          <Button color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={duplicateModal} toggle={() => setDuplicateModal(!duplicateModal)}>
        <ModalHeader toggle={() => setDuplicateModal(!duplicateModal)}>Vehicle In Details</ModalHeader>

        <ModalBody>
          <div ref={duplicateReceiptRef} className="receipt">
            <img src={mplus} height="80" width="150" className="center-image" alt="Logo" />
            <div className="receipt-description">
              <p>
                <strong>{vehicleDetails.siteName}</strong>
              </p>
              <p>MANAGED BY</p>
              <p>
                <strong>M PLUS PARKING</strong>
              </p>
            </div>

            <h4 className="receipt-title">
              <strong>VEHICLE IN RECEIPT DUPLICATE</strong> {/* Underlined via CSS */}
            </h4>
            <div className="receipt-item">
              <p>
                Ticket Number: <strong>{vehicleDetails.receiptNumber}</strong>
              </p>
              <p>
                Vehicle Number: <strong>{vehicleDetails.vehNo}</strong>
              </p>
              <p>
                Vehicle Type: <strong>{vehicleDetails.vehType}</strong>
              </p>
              <p>
                In Time: <strong>{vehicleDetails.inTime}</strong>
              </p>
              <p>
                Rate: <strong>{vehicleDetails.rate}</strong>
              </p>
            </div>
            <p className="receipt-footer">
              <span style={{ fontSize: "10px", fontFamily: 'Arial' }}>
                We are not responsible for any vehicle damage or theft. Vehicles are parked at the
                owners risk. This receipt is valid for single-use only.
              </span>
            </p>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={printDuplicateReceipt}>
            Print Duplicate
          </Button>
          <Button color="secondary" onClick={() => setDuplicateModal(!duplicateModal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default VehicleIn;
