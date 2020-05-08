import React,{useState} from 'react'
import { Container, Col, Row,Form,Button,Modal} from 'react-bootstrap'

let setter;
let modalshow;
async function login(){
    
    let email = document.querySelector("#email").value;
        
        let password = document.querySelector("#password").value;
        
        let s = await fetch("/api/user/login",{
            body:JSON.stringify({email:email,password:password}),
            method:"POST"
        })
        let res = await s.json()
        if(res["account"]){
            
            document.cookie = `name=${res.account.email}`
            
            document.cookie = `token=${res.account.token}`

            setter(res.account.email)
            window.location.href = "/call.html";
        }else{
            modalshow();
        }
          
        
}

export default function Login (props){

    setter = props.setter;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    modalshow = handleShow;
    return(
        
            <Container>
                <Row style={{alignItems:"center",height:"90vh"}}>   
                    <Col sm="0" lg="4" />
                    <Col className="mb-5">
                    
                    <Form>
                        <h1 className="mb-4" style={{textAlign:"center"}}>Вход</h1>
                        <Form.Group controlId="email">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                            
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div style={{display:"flex", justifyContent:"center"}}>
                        <Button onClick={login} variant="primary">
                            Войти
                        </Button>
                        </div>
                    </Form>
                    
                    </Col >
                    <Col sm="0" lg="4" />
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Ошибка</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Неправильный пароль</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    
                    </Modal.Footer>
                </Modal>
                </Row>
            </Container>
        
        )
}