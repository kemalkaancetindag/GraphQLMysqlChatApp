import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(
      username: $username

      password: $password
    ) {
      username
      email
      createdAt
      token
    }
  }
`;

const Login = (props) => {
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      props.history.push("/");
    },
  });

  const [errors, setErrors] = useState({});

  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const submitLoginForm = (e) => {
    e.preventDefault();
    loginUser({ variables });
  };
  return (
    <Row className="bg-white py-5 justify-content-center ">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLoginForm}>
          <Form.Group>
            <Form.Label className={errors.username && "text-danger"}>
              {errors.username ?? "Username"}
            </Form.Label>
            <Form.Control
              className={errors.username && "is-invalid"}
              type="text"
              value={variables.username}
              onChange={(e) =>
                setVariables({ ...variables, username: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && "text-danger"}>
              {errors.password ?? "Password"}
            </Form.Label>
            <Form.Control
              className={errors.password && "is-invalid"}
              type="password"
              value={variables.password}
              onChange={(e) =>
                setVariables({ ...variables, password: e.target.value })
              }
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Loading.." : "Login"}
            </Button>
            <br></br>
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
