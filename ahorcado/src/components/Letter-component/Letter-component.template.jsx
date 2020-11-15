/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Card } from 'react-bootstrap';
import './Letter-component.css'

export default (props) =>  {

    return (
        <div className="d-flex justify-content-center mr-2 letters mb-2" id={ props.letter }>
            <Card className="text-center" onClick={ props.click }>
                <Card.Body id={ props.letter }>
                    <p>{ props.letter }</p>
                </Card.Body>
            </Card>
        </div>
    );
};