/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './login-component.css';

export default () =>  {
    return (
        <body>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <h1>AHORCADO</h1>
                    </Col>
                    <Col  md="12">
                        Adfios
                    </Col>
                </Row>
            </Container>
        </body>
    );
};