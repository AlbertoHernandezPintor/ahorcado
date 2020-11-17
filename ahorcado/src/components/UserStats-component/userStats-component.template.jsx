/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default (props) =>  {

    return (
        <tr>
            <td>{ props.id }</td>
            <td>{ props.user.username }</td>
            <td>{ props.user.wins }</td>
            <td>{ props.user.lose }</td>
        </tr>
    );
};