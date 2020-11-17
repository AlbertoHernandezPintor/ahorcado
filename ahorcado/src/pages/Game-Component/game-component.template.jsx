/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import './game-component.css';
import AlertDimissible from '../../components/AlertDimissible-component/AlertDimissible-component';
import Letter from '../../components/Letter-component/Letter-component';

export default (props) => {
    return (
        <Container fluid className="game-page">
            <Row>
                <Col md="4" className="d-flex align-items-center game-config">
                    <Row>
                        <Col md="12" className="d-flex justify-content-center title-game-config mb-4">
                            <p>Configuración del juego</p>
                        </Col>
                        <Col md="12" className="d-flex justify-content-center">
                            <Form>
                                <Form.Group controlId="difficulty" onChange= { props.difficultyChange }>
                                    <Form.Label className="config-option">Dificultad</Form.Label>      
                                    { props.getDifficultyRadios() }
                                </Form.Group>

                                <AlertDimissible type="warning" message="Debe introducir una dificultad" show={ props.showAlert } setShow={ props.setShow }></AlertDimissible>

                                <Form.Group>
                                    <Button variant="primary" className="mr-2 game-buttons" type="button" onClick= { props.startGame } disabled={ props.startGameVar }>Comenzar partida</Button>
                                    <Button variant="primary" className="game-buttons" type="button" disabled={ !props.startGameVar } onClick={ props.resetGame }>Reiniciar partida</Button>
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Button variant="primary" className="game-buttons" type="button" disabled={ props.startGameVar } onClick={ props.goToStats }>Estadísticas</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Col>

                <Col md="8">
                    <div className="mt-5 d-flex justify-content-center">
                        { props.loadHiddenWord() }
                    </div>

                    <Row className="mt-5 d-flex justify-content-center letters-selection-container">
                        {props.letters.split('').map(function(letter){
                            return <Letter letter={ letter } key={ letter } click={ props.letterSelected }></Letter>;
                        })}
                    </Row>

                    <div className="mt-5 ml-5 fails">
                        Fallos permitidos: { props.failsAllowed }
                    </div>

                    <div className="mt-5 ml-5 fails">
                        Tiempo: { props.timer }
                    </div>

                    <AlertDimissible type="success" message="Has ganado" show={ props.showWinAlert } setShow={ props.setWinShow }></AlertDimissible>
                    <AlertDimissible type="danger" message="Has perdido" show={ props.showLoseAlert } setShow={ props.setLoseShow }></AlertDimissible>
                </Col>
            </Row>
        </Container>
    );
};