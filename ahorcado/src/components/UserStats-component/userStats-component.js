import React from 'react';
import Template from './userStats-component.template';

class UserStatsComponent extends React.Component {
    render () {
        let props = {
            user: this.props.user,
            id: this.props.id
        }

        return Template({ ...props });
    }
}

export default UserStatsComponent;