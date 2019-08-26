import React, { useContext, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { FirebaseContext } from "./firebase";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

function App(props) {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (firebase) {
      firebase.auth.onAuthStateChanged(function(user) {
        if (user) {
          props.history.replace("/");
        } else {
          props.history.replace("/signin");
        }
      });
    }
  }, [firebase]);
  return (
    <Container>
      <Route path="/" exact component={Dashboard} />
      <Route path="/signin" component={SignIn} />
    </Container>
  );
}

export default withRouter(App);
