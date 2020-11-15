import React from 'react';
import Template from './AlertDimissible-component.template'

class AlertDimissible extends React.Component {
    render () {
        let props = {
            type: this.props.type,
            message: this.props.message,
            show: this.props.show,
            setShow: this.props.setShow
        };

        return (
            Template({ ...props })
        );
    }
}

export default AlertDimissible;