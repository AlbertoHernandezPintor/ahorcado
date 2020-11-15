import React from 'react';
import Template from './Letter-component.template';

class Letter extends React.Component {
    render () {
        let props = {
            letter: this.props.letter,
            click: this.props.click
        };

        return (
            Template({ ...props })
        );
    }
}

export default Letter;