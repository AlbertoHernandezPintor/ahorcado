/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './Word-component.css';

export default (props) =>  {

    return (
        <div className="d-flex justify-content-center letter-container" id={ props.letter }>
            <p className="letter" hidden= { props.showLetter }>{ props.letter }</p>
        </div>
    );
};