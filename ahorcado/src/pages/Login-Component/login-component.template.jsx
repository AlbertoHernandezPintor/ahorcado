/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import './login-component.css';
import AlertDimissible from '../../components/AlertDimissible-component/AlertDimissible-component'

export default (props) =>  {
    return (
        <Container fluid className="login-page text-center">
            <Row>
                <Col md="12" className="mt-5">
                    <p className="game-title">AHORCADO</p>
                </Col>
                <Col  md="12" className="justify-content-center d-flex">
                    <Card className="text-center w-50">
                        <Card.Body>
                            <Card.Title className="mb-3" >Introduce tu nombre de usuario</Card.Title>

                            <div className="d-flex justify-content-center">
                                <InputGroup className="w-50 mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><i className="fa fa-user"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                    placeholder = "Username"
                                    aria-label = "Username"
                                    aria-describedby = "basic-addon1"
                                    value = { props.username }
                                    onChange = { props.updateUsername }
                                    name = "username"
                                    />
                                </InputGroup>
                            </div>

                            <Button type="button" variant="primary" className="mb-3" onClick={ props.playGame }>Jugar</Button>

                            <AlertDimissible type="warning" message="Debe introducir un nombre de usuario" show={ props.showAlert } setShow={ props.setShow }></AlertDimissible>
                        </Card.Body>
                        <Card.Footer className="text-muted">Alberto Hernández Pintor - Máster MIMO <i className="fa fa-copyright"></i></Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};