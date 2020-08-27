import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Register from "./pages/Register";
import ApolloProvider from "./ApolloProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { AuthProvider } from "./context/auth";
import DynamicRoute from "./util/DynamicRoute"

const App = () => {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Router>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute exact path="/register" component={Register} authenticated/>
              <DynamicRoute exact path="/login" component={Login} guest/>
              <DynamicRoute exact path="/" component={Home} guest/>
            </Switch>
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
