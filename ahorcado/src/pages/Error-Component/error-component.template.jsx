/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './error-component.css'

export default () => {
    return (
        <div className="error">
            <h1>Error no ha iniciado sesión</h1>
            <p>Por favor <a href="/">Inicie Sesión</a></p>
        </div>
    );
};