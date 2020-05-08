import React,{useState} from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './about';
import Registration from './Registration';
import Call from './Call';

import { Container, Navbar, Nav, Row} from 'react-bootstrap'
import Login from './login';
// import Call from './call';
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  }
let setter;
function exit(){
  document.cookie = "name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  document.token = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  setter("");
  window.location.href = "/login";
}
function App() {
  let r = ""
  let butts;
  
  if(getCookie("name")!=undefined) {
    r=getCookie("name");
    butts = [<Nav.Link href="/call.html">Звонок</Nav.Link>,
    <Nav.Link>Имя пользователя: {r}</Nav.Link>,
    <Nav.Link onClick={exit}>Выход</Nav.Link>
    ]
  
  }else{
    butts = [<Nav.Link href="/login">Вход</Nav.Link>,
    <Nav.Link href="/reg">Регистрация</Nav.Link>
    ]
  }
  let [username,setUsername] = useState(r);
  setter = setUsername
  return (
    <Router>
            <Container>
                <Navbar expand="lg" style={{justifyContent:"space-between"}}>
                <Navbar.Brand href="/"><img style={{width:"64px"}} src="https://i.imgur.com/4a6UJXk.jpg"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{flexGrow:"1",justifyContent:"space-between"}}>
                    
                        {butts}

                    </Nav>
                    </Navbar.Collapse>
                    
        
      
                </Navbar>
            
      <Switch>
        <Route path="/" component={About} exact/>
        <Route path="/reg" exact> <Registration setter={setUsername}></Registration> </Route>
        <Route path="/login"  exact> <Login setter={setUsername} ></Login> </Route>

        
      </Switch>
      </Container>
    </Router>
  );
}

export default App;
