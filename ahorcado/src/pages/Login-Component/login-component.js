import React from 'react';
import Template from './login-component.template';
import Player from '../../models/Player'

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      showAlert: false
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.playGame = this.playGame.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  playGame(event) {
    event.preventDefault();

    if (this.state.username !== "") {
      var player = new Player(this.state.username, 0, 0);

      if (localStorage.getItem(this.state.username) === null) {
        player.savePlayerLocalStorage();
        player.savePlayerSessionStorage();
      } else {
        player.savePlayerSessionStorage();
      }

      this.props.history.push({
        pathname: '/game',
        search: '?username='+this.state.username
      })
        
    } else {
      this.setState(function(){
          return {
            showAlert: true
          }
      });
    }
  }

  updateUsername(event) {
    const target = event.target;

    this.setState(function(){
      return {
        [target.name]: target.value
      }
    });
  }

  setShow() {
    this.setState(function(){
      return {
        showAlert: false
      }
    });
  }

  render () {
    let props = {
      username: this.state.username ,
      playGame: this.playGame,
      updateUsername: this.updateUsername,
      showAlert: this.state.showAlert,
      setShow: this.setShow,
    }

    return Template({ ...props });
  }
}

export default LoginComponent;