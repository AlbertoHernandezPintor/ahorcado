class Match {
    constructor(difficulty, selectedWord, hiddenLetters) {
        this.difficulty = difficulty;
        this.selectedWord = selectedWord;
        this.hiddenLetters = hiddenLetters;
    }

    static chooseWord(words) {
        return words[Math.floor(Math.random() * (words.length - 1))].toUpperCase();
    }

    static setTimer(difficultySelected) {
        if (difficultySelected === "difficulty-easy") {
            return "limitless";
        } else if (difficultySelected === "difficulty-medium") {
            return 60;
        }else {
            return 180;
        }
    }

    static chooseLettersToNotShow(difficultySelected, selectedWord) {
        var hiddenPositions = [];
        var i, position;

        if (difficultySelected === "difficulty-easy") {
            for (i = 0; i < Math.floor(selectedWord.length * 0.4); i++) {
                position = Math.floor(Math.random() * (selectedWord.length - 1));

                if (hiddenPositions.includes(position)) {
                    i--;
                } else  {
                    hiddenPositions.push(position);
                }
            }
        } else if (difficultySelected === "difficulty-medium") {
            for (i = 0; i < Math.floor(selectedWord.length * 0.6); i++) {
                position = Math.floor(Math.random() * (selectedWord.length - 1));

                if (hiddenPositions.includes(position)) {
                    i--;
                } else  {
                    hiddenPositions.push(position);
                }
            }
        } else {
            for (i = 0; i < Math.floor(selectedWord.length * 0.7); i++) {
                position = Math.floor(Math.random() * (selectedWord.length - 1));

                if (hiddenPositions.includes(position)) {
                    i--;
                } else  {
                    hiddenPositions.push(position);
                }
            }
        }

        return hiddenPositions;
    }

    static letterSelected(hiddenLetters, letter, selectedWord) {
        var fail = 1;

        if (selectedWord.split('').includes(letter)) {
            for(var i = 0; i < hiddenLetters.length; i++) {
                if (selectedWord.split('')[hiddenLetters[i]] === letter) {
                    hiddenLetters.splice(i, 1);
                    fail = 0;
                }
            }
        }

        if (fail === 1) {
            return "fail";
        } else {
            return hiddenLetters;
        }
    }

    static setLetterShow(i, hiddenLetters) {
        return hiddenLetters.includes(i);
    }

    static calculateFailsAllowed(difficulty) {
        if (difficulty === "difficulty-easy"){
            return 8;
        } else if (difficulty === "difficulty-medium") {
            return 6;
        } else {
            return 4;
        }
    }

    static saveMatchState(difficulty, selectedWord, hiddenLetters, failsAllowed, username) {
        var user = JSON.parse(localStorage.getItem(username));
        var newUser = {
            username: username,
            wins: user.wins,
            lose: user.lose,
            difficultySelected: difficulty,
            selectedWord: selectedWord,
            hiddenLetters: hiddenLetters,
            failsAllowed: failsAllowed
        }

        localStorage.setItem(username, JSON.stringify(newUser));
    }

    static deleteMatchState(username) {
        var user = JSON.parse(localStorage.getItem(username));
        var newUser = {
            username: username,
            wins: user.wins,
            lose: user.lose,
        }

        localStorage.setItem(username, JSON.stringify(newUser));
    }
}

export default Match;