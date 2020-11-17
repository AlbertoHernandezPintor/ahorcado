import React from 'react';
import Template from './stats-component.template';
import UserStats from '../../components/UserStats-component/userStats-component';

class StatsComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            users: []
        }
    
        this.getStats = this.getStats.bind(this);
        this.goToGame = this.goToGame.bind(this);
        this.sortByLose = this.sortByLose.bind(this);
        this.sortByWins = this.sortByWins.bind(this);
    }

    componentDidMount() {
        var users = [];

        for(var i = 0; i < localStorage.length; i++) {
            users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        this.setState({
            users: users
        });
    }

    getStats() {
        var j = 0;

        console.log(this.state.getStats);
        return this.state.users.map(function(user){
            j++;
            return <UserStats user={ user } key= { j } id={ j }></UserStats>
        });
    }

    goToGame() {
        let url = new URL(document.location.href);

        this.props.history.push({
            pathname: '/game',
            search: '?username='+url.searchParams.get("username")
        })
    }

    sortByWins() {
        var users = this.state.users;

        users.sort(function(a, b) {
            if (a.wins > b.wins) {
                return -1;
            } else if (a.wins < b.wins) {
                return 1;
            } else {
                return 0;
            }
        });

        this.setState({
            users: users
        });        
    }

    sortByLose() {
        var users = this.state.users;

        users.sort(function(a, b) {
            if (a.lose > b.lose) {
                return -1;
            } else if (a.lose < b.lose) {
                return 1;
            } else {
                return 0;
            }
        });

        this.setState({
            users: users
        });    
    }

    render () {
        let props = {
            getStats: this.getStats,
            goToGame: this.goToGame,
            sortByWins: this.sortByWins,
            sortByLose: this.sortByLose
        }

        return Template({ ...props });
      }
}

export default StatsComponent;