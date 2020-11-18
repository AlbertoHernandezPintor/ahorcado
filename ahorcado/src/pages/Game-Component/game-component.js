import React from 'react';
import Template from './game-component.template';
import { Form } from 'react-bootstrap';
import Match from '../../models/Match';
import Player from '../../models/Player';
import Word from '../../components/Word-component/Word-component';

const words = ["vaca", "soleado", "edificio", "cochera", "paracaidista", "murcielago", "nube", "pecera", "trompeta",
"ordenador", "paisaje", "saxofon", "xilofono", "colegio", "percha", "universidad", "mejorar",
"camion", "ferrari", "mercedes", "motocicleta", "bicicleta", "sevilla", "madrid", "salamanca", "valencia",
"america", "asia", "europa", "napoleon", "television", "pantalla", "leon", "selva", "bosque", "persiana",
"piscina", "trampolin", "oscuridad", "luminosidad", "claridad", "obstaculo", "esquina", "zangano", "zorro",
"cerveza", "vino", "ventana", "cascada", "cebra", "caricatura", "creencia", "zocalo", "zumbar", "vibrar"];

const letters= "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: [
        {key: "Fácil", value: "easy"},
        {key: "Intermedio", value: "medium"},
        {key: "Difícil", value: "hard"}
      ],
      difficultySelected: "",
      showAlert: false,
      match: new Match("",  "", []),
      selectedWord: Match.chooseWord(words),
      startGame: false,
      failsAllowed: "",
      showWinAlert: false,
      showLoseAlert: false,
      time: 0
    }

    this.getDifficultyRadios = this.getDifficultyRadios.bind(this);
    this.difficultyChange = this.difficultyChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.setShow = this.setShow.bind(this);
    this.setWinShow = this.setWinShow.bind(this);
    this.setLoseShow = this.setLoseShow.bind(this);
    this.loadHiddenWord = this.loadHiddenWord.bind(this);
    this.letterSelected = this.letterSelected.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.goToStats = this.goToStats.bind(this);
  }

  componentDidMount() {
    let url = new URL(document.location.href);
    var user = JSON.parse(localStorage.getItem(url.searchParams.get("username")));
    var lettersSelection = document.querySelector(".letters-selection-container");

    if (sessionStorage.getItem(url.searchParams.get("username"))) {
      if (user.selectedWord) {
        lettersSelection.classList.remove("disabled");
  
        this.setState({
          difficultySelected: user.difficultySelected,
          selectedWord: user.selectedWord,
          failsAllowed: user.failsAllowed,
          time: user.time,
          match: {
            difficulty: user.difficultySelected,
            selectedWord: user.selectedWord,
            hiddenLetters: user.hiddenLetters
          },
          startGame: true
        });

        this.timer();
      } else {
        lettersSelection.classList.add("disabled");
      }
    } else {
      this.props.history.push({
        pathname: '/error',
      })
    }
}

  difficultyChange(event) {
    this.setState({
      difficultySelected: event.target.id
    });
  }

  startGame() {
    if (this.state.difficultySelected === "") {
      this.setState({
          showAlert: true
      });
    } else {
      var lettersSelection = document.querySelector(".letters-selection-container");
      lettersSelection.classList.remove("disabled");

      this.setState({
        match: {
          difficulty: this.state.difficultySelected,
          selectedWord: this.state.selectedWord,
          hiddenLetters: Match.chooseLettersToNotShow(this.state.difficultySelected, this.state.selectedWord)
        },
        time: Match.setTimer(this.state.difficultySelected),
        startGame: true,
        failsAllowed: Match.calculateFailsAllowed(this.state.difficultySelected),
        showLoseAlert: false,
        showWinAlert: false,
        showAlert: false,
      });

      this.timer();
    }
  }

  timer() {
    if (this.state.difficultySelected !== "difficulty-easy") {
      var interval = setInterval(() => {
        if (this.state.time === 1 || !this.state.startGame) {
          clearInterval(interval);
          this.resetGame();
        }
        this.setState(function(prevs, props){
          return {
            time: prevs.time - 1
        }
        });
      }, 1000);
    }
  }

  setShow() {
    this.setState({
        showAlert: false
    });
  }

  setWinShow() {
    this.setState({
        showWinAlert: false
    });
  }

  setLoseShow() {
    this.setState({
        showLoseAlert: false
    });
  }

  getDifficultyRadios() {
    return this.state.difficulty.map(function(difficulty){
      return <Form.Check type="radio" label={ difficulty.key } key={`difficulty-${difficulty.value}`} name="difficulty-radios" id={`difficulty-${difficulty.value}`} className="difficulty-radio"/>;  
    });
  }

  loadHiddenWord() {
    if (this.state.selectedWord !== "" && this.state.startGame) {
      var i = -1;
      var show;
      var hiddenLetters = this.state.match.hiddenLetters;
      var selectedWord = this.state.selectedWord;

      let url = new URL(document.location.href);
      Match.saveMatchState(this.state.difficultySelected, this.state.selectedWord, this.state.match.hiddenLetters, this.state.time, this.state.failsAllowed, url.searchParams.get("username"));

      return selectedWord.split('').map(function(letter){
        i++;
        show = Match.setLetterShow(i, hiddenLetters);
        return <Word letter={ letter } key={ i } showLetter= { show }></Word>;
      });
    }
  }

  letterSelected(event) {
    var newHiddenLetters = Match.letterSelected(this.state.match.hiddenLetters, event.target.id, this.state.selectedWord);
    if (newHiddenLetters === "fail") {
      this.setState(function (prev, props){
        return {failsAllowed: prev.failsAllowed-1}
      });
    } else {
      this.setState({
        match: {
          hiddenLetters: newHiddenLetters
        }
      });
    }

    if (this.state.failsAllowed === 0) {
      this.resetGame();
    } else if (this.state.match.hiddenLetters.length === 0) {
      this.setState ({
        showWinAlert: true
      });

      let url = new URL(document.location.href);
      Player.updateWin(url.searchParams.get("username"));

      this.resetGame();
    }
  }

  resetGame() {
    var lettersSelection = document.querySelector(".letters-selection-container");
    lettersSelection.classList.add("disabled");

    let url = new URL(document.location.href);
    Match.deleteMatchState(url.searchParams.get("username"));

    if (this.state.failsAllowed === 0 || this.state.time === 1) {
      let url = new URL(document.location.href);
      Player.updateLose(url.searchParams.get("username"));

      this.setState ({
        showLoseAlert: true,
        showAlert: false,
        match: new Match("",  "", []),
        selectedWord: Match.chooseWord(words),
        startGame: false,
        failsAllowed: "",
        time: 1
      });
    } else {
      this.setState({
        showAlert: false,
        match: new Match("",  "", []),
        selectedWord: Match.chooseWord(words),
        startGame: false,
        failsAllowed: "",
        time: 1
      });
    }
  }

  goToStats() {
    let url = new URL(document.location.href);

    this.props.history.push({
      pathname: '/stats',
      search: '?username='+url.searchParams.get("username")
    })
  }

  render () {
    let props = {
      getDifficultyRadios: this.getDifficultyRadios,
      difficultyChange: this.difficultyChange,
      startGame: this.startGame,
      showAlert: this.state.showAlert,
      setShow: this.setShow,
      showWinAlert: this.state.showWinAlert,
      setWinShow: this.setWinShow,
      showLoseAlert: this.state.showLoseAlert,
      setLoseShow: this.setLoseShow,
      loadHiddenWord: this.loadHiddenWord,
      letters: letters,
      letterSelected: this.letterSelected,
      startGameVar: this.state.startGame,
      resetGame: this.resetGame,
      failsAllowed: this.state.failsAllowed,
      goToStats: this.goToStats,
      timer: this.state.time
    }

    return Template({ ...props });
  }
}

export default GameComponent;