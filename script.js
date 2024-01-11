// 3*3 array for XO
// factory function
function gameBoard(){
    let board = [];
    return {board};
}

// player object - factory function
function player(symbol, turn){
    let positions = [];
    let playerTurn = turn;
    return {symbol, positions, playerTurn};
}

// row match checker
function rowMatchChecker(playerPositions){
    for(let i = 1; i <= 7; i += 3){
        if(playerPositions.includes(i)){
            if(playerPositions.includes(i + 1)){
                if(playerPositions.includes(i + 2)){
                    return true;
                }
            }
        }
        continue;
    }
    return false;
}

// column match checker
function columnMatchChecker(playerPositions){
    for(let i = 1; i <= 3; i++){
        if(playerPositions.includes(i)){
            if(playerPositions.includes(i + 3)){
                if(playerPositions.includes(i + 6)){
                    return true;
                }
            }
        }
        continue;
    }
    return false;
}

// left to right diagonal
function leftDiagonalChecker(playerPositions){
    let lrDiagonal = [1, 5, 9];
    
    let lrResult = lrDiagonal.every((element) => {
        return playerPositions.includes(element);
    });

    if(lrResult){
        return true;
    }
    return false;
}

// right to left diagonal
function rightDiagonalChecker(playerPositions){
    let rlDiagonal = [3, 5, 7];

    let rlResult = rlDiagonal.every((element) => {
        return playerPositions.includes(element);
    });

    if(rlResult){
        return true;
    }

    return false;
}
// declare winner
function declareWinner(playerName){
    let winner = document.createElement('div');
    winner.classList.add('winner');
    winner.textContent = `${playerName} Won`;
    
    let body = document.querySelector('body');
    let replay = document.querySelector('.replay');
    body.insertBefore(winner, replay);
}

// remove winner
function removeWinner(){
    let body = document.querySelector('body');
    let winner = document.querySelector('.winner');
    body.removeChild(winner);
}

// checking winner
function checkWinner(playerPositions){
    let rowWin = rowMatchChecker(playerPositions);
    let columnWin = columnMatchChecker(playerPositions);
    let leftDiagonalWin = leftDiagonalChecker(playerPositions);
    let rightDiagonalWin = rightDiagonalChecker(playerPositions);
    console.log(rowWin);
    console.log(columnWin);
    console.log(playerPositions);
    
    if (rowWin || columnWin || leftDiagonalWin || rightDiagonalWin){
        return true
    };
    
}
// assigning players and start play
function gamePlay(){
    let player1 = player('X', true);
    let player2 = player('O', false);
    let game = gameBoard();
    const cells = document.querySelectorAll('.cell');
    
    function clickFunction(){   
        if(player1.playerTurn && game.board.includes(+this.id) === false){
            this.textContent = player1.symbol;
            player1.playerTurn = false;
            player2.playerTurn = true;
            player1.positions.push(+this.id);
            game.board.push(+this.id);
            if (checkWinner(player1.positions)){
                declareWinner('Player 1');
                cells.forEach((cell) => {
                    cell.removeEventListener('click', clickFunction);
                });
            }
    
        } else if(player2.playerTurn && game.board.includes(+this.id) === false){
            this.textContent = player2.symbol;
            player2.playerTurn = false;
            player1.playerTurn = true;
            player2.positions.push(+this.id);
            game.board.push(+this.id);
            if (checkWinner(player2.positions)){
                declareWinner('Player 2');
                cells.forEach((cell) => {
                    cell.removeEventListener('click', clickFunction);
                });
            }
        }
    }
    
    cells.forEach((cell) => {
        cell.addEventListener('click', clickFunction);
    });

    let replay = document.querySelector('.replay');
    replay.addEventListener('click', () =>{
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        removeWinner();
        gamePlay();
    });
}

gamePlay();







