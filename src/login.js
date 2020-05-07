import React from 'react'
import { Container, Col, Row,Form,Button } from 'react-bootstrap'

export default function Login (props){


    return(
        
            <Container>
                <Row style={{alignItems:"center",height:"90vh"}}>   
                    <Col/>
                    <Col className="mb-5">
                    
                    <Form>
                        <h1 className="mb-4" style={{textAlign:"center"}}>Вход</h1>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                            
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div style={{display:"flex", justifyContent:"center"}}>
                        <Button variant="primary" type="submit">
                            Войти
                        </Button>
                        </div>
                    </Form>
                    
                    </Col>
                    <Col/>
                </Row>
            </Container>
        
        )
}