'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('LOSE');
        this._board.print();
      } else if (!this._board.hasSafeTiles) {
        console.log('WIN');
      } else {
        console.log('Current board:');
        this._board.print();
      }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log(this._playerBoard[rowIndex][columnIndex]);
        console.log('Tile has already been flipped');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles === this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this.playerBoard.map(function (row) {
        return row.join('|');
      }).join('\n'));
    }
  }, {
    key: 'numberOfRows',
    get: function get() {
      return this._numberOfRows;
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var x = 0; x < numberOfRows; x++) {
        var row = [];
        for (var y = 0; y < numberOfColumns; y++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var x = 0; x < numberOfRows; x++) {
        var row = [];
        for (var y = 0; y < numberOfColumns; y++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        //TO-DO: avoid placing bombs where there's already one
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(0, 0);

// let playerBoard = generatePlayerBoard(3, 4);
// let bombBoard = generateBombBoard(3, 4, 5);
//
// console.log('Player board: ');
// printBoard(playerBoard);
//
// console.log('Bomb board: ');
// printBoard(bombBoard);
//
// flipTile(playerBoard, bombBoard, 0, 0);
// console.log('Updated Player Board:');
// printBoard(playerBoard);
//
// flipTile(playerBoard, bombBoard, 2, 3);
// console.log('Updated Player Board:');
// printBoard(playerBoard);

// const printBoard = (board) => {
//     console.log('Current Board:');
//     console.log(board[0].join('|'));
//      console.log(board[1].join('|'));
//      console.log(board[2].join('|'));
// };
// const blankLine = '  |   |  ';
// console.log('This is what an empty board would look like:');
// console.log(blankLine);
// console.log(blankLine);
// console.log(blankLine);
//
// const guessLine = '1 |   |  ';
// const bombLine = '  | B |  ';
//
// console.log('This is what a board with a guess and a bomb on it would look like:');
// console.log(guessLine);
// console.log(bombLine);
// console.log(blankLine);
//
// let board = [];
// board.push([]);
// board.push([]);
// board.push([]);
// board[0].push(' ');
// board[0].push(' ');
// board[0].push(' ');
// board[1].push(' ');
// board[1].push(' ');
// board[1].push(' ');
// board[2].push(' ');
// board[2].push(' ');
// board[2].push(' ');
// printBoard(board);
//
// board[0][1] = '1';
// board[2][2] = 'B';
// printBoard(board);