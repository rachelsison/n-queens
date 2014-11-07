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
  var solutionCount = 0;
  var board = new Board({'n':n});
  var recurse = function(rowIndex) {
    //if solution
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex,i);
      if (!board.hasAnyRooksConflicts()) {
        recurse(rowIndex+1);
      }
      board.togglePiece(rowIndex,i);
    }
  };


  recurse(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var board = new Board({'n':n});
  var recurse = function(rowIndex) {
    if (rowIndex === n) {
      // console.log('solution');
      // console.log(JSON.stringify(board.rows()));
      return board.rows();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex,i);
      // console.log('toggle');
      // console.log(JSON.stringify(board.rows()));
      if (!board.hasAnyQueensConflicts()) {
        // console.log('no conflict')
        // console.log(JSON.stringify(board.rows()));
        var result = recurse(rowIndex+1);
        if (result) {
          return result;
        }
      }
      board.togglePiece(rowIndex,i);
      // console.log('untoggle');
      // console.log(JSON.stringify(board.rows()));
    }
  };
  solution = recurse(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (solution) {
    return solution;
  }
  else {
    var returnBoard = new Board({'n':n});
    return returnBoard.rows();
  }
};
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n':n});
  var recurse = function(rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex,i);
      if (!board.hasAnyQueensConflicts()) {
        recurse(rowIndex+1);
      }
      board.togglePiece(rowIndex,i);
    }
  };
  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
