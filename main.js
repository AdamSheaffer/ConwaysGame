document.addEventListener('DOMContentLoaded', function(){
  function createMatrix(x, y){
    var matrix = [];
    for(var k=0; k<x; k++){
      matrix[k] = [];
      for(var l=0; l<y; l++){
       matrix[k][l]=Math.round(Math.random());
      }
    }
    return matrix;
  }

  var matrix = createMatrix(20, 20);
  generateGrid(matrix);

  function generateGrid(matrix){
    var $table = document.querySelector('#grid');
    $table.innerHTML = '';
    matrix.forEach(function(row){ // first time, row => [0, 0, 0]
      // create a tr for the row
      var $tr = document.createElement('tr');
      row.forEach(function(cell){ // first time, cell => 0
        // cell goes into a new td
        // that td goes into a tr
        var $td = createTableCell(cell);
        $td.textContent = cell;
        $tr.appendChild($td);
        // alternative:
        // $tr.appendChild( createTableCell(cell) );
      });
      // add that tr to the table
      $table.appendChild($tr);
    });
  }

  function createTableCell(value){
    var $td = document.createElement('td');
    // Apply alive or dead class to the td
    if(value === 1){
      $td.classList.add('alive');
    } else {
      $td.classList.add('dead');
    }
    return $td;
  }

  function livingNeighborCount(x, y){
    var a, b;
    var sumOfAliveNeighbors = 0;
    for(var i=x-1; i<=x+1; i++){
      if(i < 0){
        a = (matrix.length - 1);
      } else if (i === matrix.length){
        a = 0;
      }
      else {
        a = i;
      }
        for(var j=y-1; j<=y+1; j++){
          if(j < 0){
            b = matrix[x].length - 1;
          } else if(j === matrix.length){
            b = 0;
          } else {
            b = j;
          }
          if(matrix[a][b] === 1 && !(a===x && b===y)){
              sumOfAliveNeighbors += 1;
          }
        }
      }
    return sumOfAliveNeighbors;
  }

  function calculateNextState(currentState){
    var nextState = [];
    currentState.forEach(function(currentRow, x){
      var nextRow = [];
      currentRow.forEach(function(currentCell, y){
        var nextCellState = livingNeighborCount(x, y);
        // Rule 1. Less than 2 neighbors = die of loneliness
        // Rule 2. Things stay the same unless they change (inertia)
        // Rule 3. More than 3 neighbors = death by overpopulation
        // Rule 4. Exactly 3 neighbors = birth
        if(currentState[x][y] === 1){
          if(nextCellState < 2 || nextCellState > 3){
            nextCellState = 0;
          } else{
            nextCellState = 1;
          }
        }
        else {
          if(nextCellState === 3){
            nextCellState = 1;
          } else{
            nextCellState = 0;
          }
        }
        nextRow.push(nextCellState);
      });
      nextState.push(nextRow);
    });
    return nextState;
  }

  document.querySelector("#tick").addEventListener('click', function(){
    // Tick button has been pressed
    setInterval(function(){
    matrix = calculateNextState(matrix);
    generateGrid(matrix);
    }, 80);
  });
});





//  function livingNeighborCount(x, y){
//    var sumOfAliveNeighbors = 0;
//    for(var i=x-1; i<=x+1; i++){
//      if(i < 0 || i === matrix.length){
//        /*skip*/
//      }
//      else {
//        for(var j=y-1; j<=y+1; j++){
//          if(j < 0 || j === matrix[i].length || (i===x && j===y)){
//            /*skip*/
//          }
//          else{
//            if(matrix[i][j] ===1){
//              sumOfAliveNeighbors += 1;
//            }
//          }
//        }
//      }
//    }
//    return sumOfAliveNeighbor
//  }
