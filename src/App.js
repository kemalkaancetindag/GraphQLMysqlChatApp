import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";

import Register from "./pages/Register";
import ApolloProvider from "./ApolloProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <ApolloProvider>
      <Router>
        <Container className="pt-5">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default App;
