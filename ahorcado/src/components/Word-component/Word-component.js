import React from 'react';
import Template from './Word-component.template'

class Word extends React.Component {
    render () {
        let props = {
            letter: this.props.letter,
            showLetter: this.props.showLetter
        };

        return (
            Template({ ...props })
        );
    }
}

export default Word;