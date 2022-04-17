import React, {Component} from "react";
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";
import AlphaButtons from "./AlphaButtons";
import {randomWord} from "./words";
import "./styles/Hangman.css"
import "./styles/AlphaButtons.css"



class Hangman extends Component{
    static defaultProps = {
        maxGuesses: 6,
        images : [img0, img1, img2, img3, img4, img5, img6],
        alt : ["Initial Image", "1st wrong", "2nd wrong", "3rd wrong", "4th wrong", "5th wrong", "6th wrong"]
    }
    constructor(props){
        super(props);
        this.state = {
            wrongNum: 0,
            guessedWordSet: new Set(),
            correctAnswer: randomWord(),
            won: false
        }
        this.click = this.click.bind(this);
        this.reset = this.reset.bind(this);
    }

    currentGuessedWord(){
        let guessedWord = this.state.correctAnswer.split("").map(letter => {
            return this.state.guessedWordSet.has(letter) ? letter : "_ ";
        });
        return guessedWord;
    }

    click(eventObj){
        let alpha = eventObj.target.value;
        this.setState(function(currentState){
            return {
                guessedWordSet: currentState.guessedWordSet.add(alpha),
                wrongNum: currentState.wrongNum + (this.state.correctAnswer.includes(alpha) ? 0 : 1),
                won: (this.state.correctAnswer === this.currentGuessedWord().join("")) ? true : false
            }
        });
    }

    reset()
    {
        this.setState(function(currentState){
            return {
                wrongNum: 0,
                guessedWordSet: new Set(),
                correctAnswer: randomWord(),
                won: false
            }
        });
    }

    render(){
        return (
            <div className="Hangman">
                <h1 className="Hangman-header">Welcome to Hangman Game</h1>
                <img className = "Hangman-img" src = {this.props.images[this.state.wrongNum]} alt={this.props.alt[this.state.wrongNum]}></img>
                <p className = "Hangman-wrongNum">Wrong Guesses: {this.state.wrongNum}</p>
                <p className= "Hangman-currentGuess">{this.currentGuessedWord()}</p>
                {
                    this.state.wrongNum < this.props.maxGuesses ? 
                    (this.state.won ? <p className="Hangman-wonMsg">Congrats! You won the game</p> : <AlphaButtons className="AlphaButtons" click = {this.click}/>) : 
                    <p className = "Hangman-loseMsg">You have lost the game. The correct answer was {this.state.correctAnswer}</p>
                }
                <button className="Hangman-reset" onClick = {this.reset}>Restart the game?</button>
            </div>
        )
    }
}

export default Hangman;