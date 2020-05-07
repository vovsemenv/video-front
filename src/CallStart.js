import React from 'react'
import { Container, Col, Row,Form,Button } from 'react-bootstrap'
export default function CallStart (props){


    return(
        <Container>
        <Row style={{alignItems:"center",height:"100vh"}}>   
            <Col/>
            <Col className="mb-5">
            
            <Form>
                <h1 className="mb-4" style={{textAlign:"center"}}>Звонок</h1>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username для звонка</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                    
                </Form.Group>
                <div style={{display:"flex", justifyContent:"center"}}>
                <Col style={{justifyContent:"center",display:"flex"}}>
                <Button variant="info" type="submit">
                    Проверка
                </Button>
                </Col>
                <Col style={{justifyContent:"center",display:"flex"}}>
                <Button variant="success" type="submit">
                    Звонок
                </Button>
                </Col>
                </div>
            </Form>
            
            </Col>
            <Col/>
        </Row>
    </Container>
    )
}