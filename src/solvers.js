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



var recurse = function(rowIndex, object, board, n, callback) {
  //if solution
  var solutionCount = 0;
  if (rowIndex === n) {
    //solutionCount++;
    //return solutionCount;
    return 1;
  }

  for (var key in object) {
    board.togglePiece(rowIndex, key);
    delete object[key];
    if (!board[callback]()) {
      solutionCount += recurse(rowIndex+1, object, board, n, callback);
    }
    //untoggle
    board.togglePiece(rowIndex,key);
    object[key] = parseInt(key);
  }
  return solutionCount;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n':n});
  //available columns
  var obj = {};
  for (var i = 0; i < n; i++) {
    obj[i] = i;
  }
  //debugger;
  solutionCount = recurse(0, obj, board, n, 'hasAnyRooksConflicts');
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var board = new Board({'n':n});
  var recurse = function(rowIndex) {
    if (rowIndex === n) {
      return board.rows();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex,i);
      if (!board.hasAnyQueensConflicts()) {
        var result = recurse(rowIndex+1);
        if (result) {
          return result;
        }
      }
      board.togglePiece(rowIndex,i);
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
  var obj = {};
  for (var i = 0; i < n; i++) {
    obj[i] = i;
  }
  // var recurse = function(rowIndex) {
  //   if (rowIndex === n) {
  //     solutionCount++;
  //     return;
  //   }

  //   for (var i = 0; i < n; i++) {
  //     board.togglePiece(rowIndex,i);
  //     if (!board.hasAnyQueensConflicts()) {
  //       recurse(rowIndex+1);
  //     }
  //     board.togglePiece(rowIndex,i);
  //   }
  // };
  //recurse(0);
  solutionCount = recurse(0, obj, board, n, 'hasAnyQueensConflicts');
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
