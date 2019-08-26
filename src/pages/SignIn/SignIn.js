import React, { useState, useCallback, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { FirebaseContext } from "../../firebase";
import { useFetchJWTFromDjangoApp, useSignInWithCustomToken } from "./hooks";

const SignIn = props => {
  const firebase = useContext(FirebaseContext);

  // Controlled form - usernme & password values
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const onUsernameChanged = useCallback(value => {
    setUsername(value);
  }, []);
  const onPasswordChanged = useCallback(value => {
    setPassword(value);
  }, []);

  const submitForm = e => {
    e.preventDefault();
    setCredentials({ username, password });
  };

  // Django auth API endpoint data && post
  const [credentials, setCredentials] = useState(null);
  const { JWT, error } = useFetchJWTFromDjangoApp(credentials);

  // Authenticate with firebase
  useSignInWithCustomToken(JWT, firebase);

  return (
    <Row>
      <Col>
        <h1>Sign In</h1>
        {error && (
          <Alert variant="danger">Could not log in. Pls try again.</Alert>
        )}
        <Form onSubmit={submitForm}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={e => onUsernameChanged(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter your existing username
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => onPasswordChanged(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SignIn;
