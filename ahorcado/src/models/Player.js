class Player {

    constructor(username) {
        this.username = username;
    }

    savePlayerLocalStorage() {
        var jsonPlayer = JSON.stringify(this);
  
        localStorage.setItem(this.username, jsonPlayer);
    }

    savePlayerSessionStorage() {
        sessionStorage.clear();
        sessionStorage.setItem(this.username, this.username);
    }
}

export default Player;