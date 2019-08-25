import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = props => {
  const [tenantId, setTenantId] = useState(null);
  useEffect(() => {
    setTenantId(localStorage.getItem("tenantId"));
  }, []);
  return (
    <Row>
      <Col>
        <h1>Dash</h1>
        <h2>Tenant id: {tenantId}</h2>
      </Col>
    </Row>
  );
};

export default Dashboard;
