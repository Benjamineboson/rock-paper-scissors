import React from 'react';
import './Game.css';
import Player from './Player';
import Scoreboard from './Scoreboard';

const weapons = ['?','rock', 'paper', 'scissors'];

class Game extends React.Component{
	constructor(props){
		super();
		this.state = {
			player : {
				weapon: weapons[0],
				name: '',
                winCount : 0,
                hand: [],
			},
			computer :{
				weapon: weapons[0],
				name: 'Computer',
                winCount : 0,
                hand: [],
			},
			numberOfRounds : 1,
			winner : '',
			counter: 1,
			isNewRound: true,
		}
		this.startGame = this.startGame.bind(this);
    }
    
    /**
     * Select rock, paper or scissors.
     * @param {*} weapon - the selected choice from button click.
     */
    selectWeapon = (weapon) => {
		const {player,computer} = this.state;		
		player.weapon = weapons[weapon];
        computer.weapon = weapons[Math.floor(Math.random()*3)+1] 
		this.setState({
			player : player,
			computer : computer, //Redo - more advanced.
			isNewRound: true,
		});	
    }



	render(){
		const {player,computer,counter,numberOfRounds,isNewRound,winner} = this.state;
		if (counter > numberOfRounds){
			return(
				<div>
					<div>
						<h1>
							{this.calculateTotal()}
						</h1>
					</div>
				</div>
			)
        }
        
        else if (player.name.length > 1 && numberOfRounds > 0){
			return(
				<div>
					<div>
						<h1>Player: {player.name}</h1>
						<h1>Number of rounds played: {counter - 1} / {numberOfRounds}</h1>
					</div>
					<div className="gamesContainer">
                        <div className="player">
                            <Player playerName={player.name} weapon={player.weapon}/>
                        </div>
                        <div className="computer">
                            <Player playerName={computer.name} isNewRound={isNewRound} weapon={computer.weapon}/>
                        </div>
					</div>
                    <div className="btn-container">
                        <button className="btnWeapon" onClick={() => this.selectWeapon(1)}>Rock</button>
                        <button className="btnWeapon" onClick={() => this.selectWeapon(2)}>Paper</button>
                        <button className="btnWeapon" onClick={() => this.selectWeapon(3)}>Scissors</button>
                    </div>
					<div>
						<button className="startRoundBtn" onClick={()=> this.startRound()}>Start Round</button>
					</div>
                    <div>
                        <Scoreboard player={player} winner={winner} computer={computer}/>
                    </div>
				</div>
			)
        }
        
        else{
			return(
				<div>
					<div className="rubric">
						<h1>Rock Paper Scissors</h1>
					</div>
					<div className="setupForm">
						<form onSubmit={this.startGame}>
							<input type="number" name="roundsInput" placeholder="Enter amount of rounds" defaultValue="3"/>
							<input type="text" name="userNameInput" placeholder="Enter your username" defaultValue="Test Player"/>
							<input type="submit" value="Start Game"/>
						</form>
					</div>
				</div>
			)
		}
	}

	calculateTotal = () =>{
		if (this.state.player.winCount > this.state.computer.winCount){
			return "Player won!"
		}else{
			return "Computer won!"
		}
	}

	startRound(){
		const {player,computer} = this.state;
        player.hand.push(player.weapon);
        computer.hand.push(computer.weapon);
		this.setState({
            player: player,
            computer: computer,
			winner : this.selectWinner(),
			isNewRound : false,
		})	
		console.log("Computer: "+this.state.computer.weapon);
		console.log("Player : "+this.state.player.weapon);
	}

	startGame(event){
		event.preventDefault();
		const {player} = this.state;
		player.name = event.target.userNameInput.value;
		this.setState({
			numberOfRounds: event.target.roundsInput.value,
			player : player,
		})
		console.log(this.state.player.name.length);
	}

	selectWinner(){
		const {player,computer,counter} = this.state;
		if (player.weapon === computer.weapon){
			return 'Tie'
		}else if (
			(player.weapon === 'rock' && computer.weapon === 'scissors') ||
			(player.weapon === 'scissors' && computer.weapon === 'paper') ||
			(player.weapon === 'paper' && computer.weapon === 'rock')
		){
			player.winCount += 1;
			this.setState({
				counter : counter + 1,
				player: player,
			})
			console.log(this.state.numberOfRounds);
			return 'Player one wins'
		}else{
            computer.winCount += 1;
			this.setState({
				counter : counter + 1,
                computer: computer,
			})
			console.log(this.state.numberOfRounds);

			return 'Computer wins'
		}
	}
}



export default Game;