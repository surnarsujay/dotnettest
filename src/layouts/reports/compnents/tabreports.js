import React, { useState } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Reportsale from './reportsale'; // Import the Reportsale component
import Details from './details'; // Import the Details component

import p1 from '../../../assets/images/sales1.jpg';
import p2 from '../../../assets/images/detailteam.avif';
import p3 from '../../../assets/images/datewisereport.jpg';
import p4 from '../../../assets/images/site2.avif';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/tab.css'; // Import the custom CSS file
import DateRangeReport from './daterangereport';
import UserSiteReport from './usersitereport';

const Tabreports = () => {
  const [modalSales, setModalSales] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [modalDaterange, setModalDaterange] = useState(false);
  const [modalUsersite, setModalUsersite] = useState(false);

  const toggleModalSales = () => setModalSales(!modalSales);
  const toggleModalDetails = () => setModalDetails(!modalDetails);
  const toggleModalDaterange = () => setModalDaterange(!modalDaterange);
  const toggleModalUsersite = () => setModalUsersite(!modalUsersite);

  return (
    <Container>
      <Row>
        {/* Sales card */}
        <Col md="6" onClick={toggleModalSales}>
      
          <Card className="clickable-card" style={{ boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
          <CardBody>
              <CardTitle tag="h4" style={{ fontWeight: '800' }}>Sales</CardTitle>
            </CardBody>
            <CardImg top className='cimg' width="100%" height="330px" src={p1} alt="Sales" />
          
          </Card>
        </Col>
     
        {/* Details card */}
        <Col md="6" onClick={toggleModalDetails}>
          <Card className="clickable-card" style={{ boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
          <CardBody>
              <CardTitle tag="h4" style={{ fontWeight: '800' }}>Details</CardTitle>
            </CardBody>

            <CardImg className='cimg' top width="100%" height="330px" src={p2} alt="Details" />
           
          </Card>
        </Col>

      </Row>
<br></br>
      <Row>
      <Col md="6" onClick={toggleModalDaterange}>
          <Card className="clickable-card" style={{ boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
          <CardBody>
              <CardTitle tag="h4" style={{ fontWeight: '800' }}>Date Range Reports</CardTitle>
            </CardBody>

            <CardImg className='cimg' top width="100%" height="330px" src={p3} alt="Details" />
           
          </Card>
        </Col>

        <Col md="6" onClick={toggleModalUsersite}>
          <Card className="clickable-card" style={{ boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
          <CardBody>
              <CardTitle tag="h4" style={{ fontWeight: '800' }}>Todays Sale Reports</CardTitle>
            </CardBody>

            <CardImg className='cimg' top width="100%" height="330px" src={p4} alt="Details" />
           
          </Card>
        </Col>
      </Row>

      {/* Modal for Sales */}
      <Modal isOpen={modalSales} toggle={toggleModalSales} size="lg" centered>
        <ModalHeader toggle={toggleModalSales}>Sales</ModalHeader>
        <ModalBody>
          <Reportsale />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModalSales}>Close</Button>
        </ModalFooter>
      </Modal>

      {/* Modal for Details */}
      <Modal isOpen={modalDetails} toggle={toggleModalDetails} size="lg" centered>
        <ModalHeader toggle={toggleModalDetails}>Details</ModalHeader>
        <ModalBody>
          <Details />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModalDetails}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDaterange} toggle={toggleModalDaterange} size="lg" centered>
        <ModalHeader toggle={toggleModalDaterange}>Daterange</ModalHeader>
        <ModalBody>
          <DateRangeReport />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModalDaterange}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUsersite} toggle={toggleModalUsersite} size="lg" centered>
        <ModalHeader toggle={toggleModalUsersite}>User site</ModalHeader>
        <ModalBody>
          <UserSiteReport />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModalUsersite}>Close</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Tabreports;
