/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({'n':n});
  for (var i = 0; i < board.get('n'); i++){
    for (var j = 0; j < board.get('n'); j++) {
      if (i === j) {
        board.togglePiece(i,j);
      }
    }
  }
  console.log(board.rows());
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //results = []
  //temp set to empty board
  //helper(board)
  //  for(iterate through first row of board an do:){
  //    newBoard = an empty board
  //    toggle the ith spot on that board ( that does not cause a conflict)
  //    helper(newBoard)
  //recursively build boards out
  var solutionCount = 0; //fixme
  var recurse = function(board, rowIndex) {
    console.log(board.rows());
    for (var i = 0; i < board.get('n'); i++) {
      //console.log(board.get('n'));
      //console.log(board.rows());
      board.togglePiece(rowIndex, i);
      if (!board.hasAnyRookConflicts) {
        rowIndex++;
        if(rowIndex === board.get('n')){
          solutionCount++;
          console.log('solutionCount: ' + solutionCount);
          break;
        }
        var tempBoard = new this.Board(board.rows());
        recurse(tempBoard, rowIndex);
      }else{
        break;
      }
    }
  };
  debugger;
  var originalBoard = new this.Board({'n':n});
  console.log('original');
  console.log(n);
  console.log(originalBoard.rows());
  recurse(originalBoard, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
