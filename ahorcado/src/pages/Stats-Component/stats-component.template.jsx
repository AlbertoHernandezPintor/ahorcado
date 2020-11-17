/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './stats-component.css';
import { Container, Table, Row, Col, Button} from 'react-bootstrap';

export default (props) => {
    return (
        <Container fluid className="stats-page">
            <Row>
                <Col md="12" className="stats-title mt-5 d-flex justify-content-center">
                    <p>Estadísticas</p>
                </Col>

                <Col md="12" className="mb-4">
                    <Button variant="primary" className="game-buttons mt-4 mr-3" type="button" onClick={ props.sortByWins }>Ordenar por partidas ganadas</Button>
                    <Button variant="primary" className="game-buttons mt-4" type="button" onClick={ props.sortByLose }>Ordenar por partidas perdidas</Button>
                </Col>

                <Col md="12" className="d-flex justify-content-center">
                    <Table bordered>
                        <thead>
                            <tr>
                            <th>Posición</th>
                            <th>Usuario</th>
                            <th>Ganadas</th>
                            <th>Perdidas</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            { props.getStats() }
                        </tbody>
                    </Table>
                </Col>

                <Col md="12" className="d-flex justify-content-center mb-4">
                    <Button variant="primary" className="game-buttons mt-4" type="button" onClick={ props.goToGame }>Volver</Button>
                </Col>
            </Row>
        </Container>
    );
};