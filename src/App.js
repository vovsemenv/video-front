import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './about';
import Registration from './Registration';
import CallStart from './CallStart';

import { Container, Navbar, Nav, Row} from 'react-bootstrap'
import Login from './login';
// import Call from './call';

function App() {
  return (
    <Router>
            <Container>
                <Navbar style={{justifyContent:"space-between"}}>
                <Navbar.Brand>AVITO-5 DEMO</Navbar.Brand>
                    <Nav style={{flexGrow:"1"}}>
                        <Nav.Link href="/reg">Регистрация</Nav.Link>
                        <Nav.Link href="/login">Вход</Nav.Link>
                        <Nav.Link href="/call.html">Звонок</Nav.Link>
                    </Nav>
                    <Nav style={{float:"right"}}>Username</Nav>
                </Navbar>
            
      <Switch>
        <Route path="/" component={About} exact/>
        <Route path="/reg" component={Registration} exact/>
        <Route path="/login" component={Login} exact/>
        
      </Switch>
      </Container>
    </Router>
  );
}

export default App;
