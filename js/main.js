/*----- constants -----*/
const fill =
{
    1 : "x",
    '-1' : "o",
    0 : ''
};
/*----- app's state (variables) -----*/ 
let board, winner, turn;
let player = [2];
/*----- cached element references -----*/ 

/*----- event listeners -----*/ 
$("board").addEventListener("click",playersTurn);
/*----- functions -----*/

function checkWin(board)
{
    for(var x=0;x<3;x++)
    {
       if(Math.abs(board[0][x]+board[1][x]+board[2][x]) ==3|| 
       Math.abs(board[x][0]+board[x][1]+board[x][2])==3)
       {return true}
    };
       if(Math.abs(board[0][0]+board[1][1]+board[2][2]) ==3
        || Math.abs(board[0][2]+board[1][1]+board[2][0]) ==3 
       )return true;

}
function initializeVars()
{
    board =
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    turn =1;
    player[1] = $('player-ones-name').value;
    player[0] = $('player-twos-name').value;
    player[1] = player[1] ? player[1] : "anonymous";
    player[0] = player[0] ? player[0] : "anonymous";
    $('game-starter').style.display="none";
    firstRender();
    render();
}
function firstRender()
{
    $('p2-name').textContent = player[0];
    $('p1-name').textContent = player[1];
    $('board').style.display= 'grid';
}
function $(name)
{
    return document.getElementById(name);
}
function render()
{
    $('turn').textContent = `${fill[turn]}'s turn`;
    board.forEach(function(row, colId){
        row.forEach(function(div, rowId){
            $(`${colId}${rowId}`).textContent=fill[div]
        });
    });

}
function playersTurn(evt)
{    
    if(evt.target.id=="board"||winner)return;
    if(board[parseInt(evt.target.id.split('').shift())]
    [parseInt(evt.target.id.split('').pop())])return; 

    board
    [parseInt(evt.target.id.split('').shift())]
    [parseInt(evt.target.id.split('').pop())] = turn;
    console.log(checkWin(board));
    if(checkWin(board))
     {
        render();
        displayWinner();
         return;
     }
    turn = turn == 1 ? -1:1;
    render();
}
function displayWinner()
{
    if(fill[turn]=='x'){winner =player[1]}
    else{winner = player[0]} 
    $('turn').textContent =`${winner} Is The Winner`;
}