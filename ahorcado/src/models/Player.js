class Player {

    constructor(username, wins, lose) {
        this.username = username;
        this.wins = wins;
        this.lose = lose;
    }

    savePlayerLocalStorage() {
        var jsonPlayer = JSON.stringify(this);
  
        localStorage.setItem(this.username, jsonPlayer);
    }

    savePlayerSessionStorage() {
        sessionStorage.clear();
        sessionStorage.setItem(this.username, this.username);
    }

    static updateLose(username) {
        var user = JSON.parse(localStorage.getItem(username));
        user.lose += 1;
        localStorage.setItem(username, JSON.stringify(user));
    }

    static updateWin(username) {
        var user = JSON.parse(localStorage.getItem(username));
        user.wins += 1;
        localStorage.setItem(username, JSON.stringify(user));
    }
}

export default Player;