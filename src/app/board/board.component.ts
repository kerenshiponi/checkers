import { Component, OnInit } from '@angular/core';
import { Piece, pieces } from '../pieces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  whosTurn = "black";
  selectedPiece : Piece = null;
  selectedPieceID = null;
  selectedPieceSQR = null;
  moveState = false;

  blackQueenCount = 0;
  whiteQueenCount = 0;

  pieces = pieces;
  
  board = [
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0
  ];
  boardState = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
  ];
  

  constructor() { }

  ngOnInit() {
  }

  selectPiece(id, sqr) {
    if (this.selectedPieceID == id) {
      this.selectedPieceID = null;
      this.selectedPieceSQR = null;
      this.selectedPiece = null;
      this.moveState = false;
      return;
    }
    
    if (this.moveState) {
      window.alert("Movement is not Valid");
      return;
    }

    if (pieces[id].color != this.whosTurn) {
      window.alert("It's '" + this.whosTurn + "' turn to play");
    } else {
      
      this.selectedPieceID = id;
      this.selectedPieceSQR = sqr;
      this.selectedPiece = pieces[id];
      this.moveState = true;
    }
  }

  makeMove(sqr) {
    const targetRow = Math.floor(sqr/8);
    const targetCol = sqr % 8;

    if (this.moveState) {
      if (this.validateMovement(sqr)) {
        this.boardState[sqr] = this.selectedPieceID;
        this.selectedPiece.row = targetRow;
        this.selectedPiece.col = targetCol;
        this.boardState[this.selectedPieceSQR] = null;
        this.selectedPieceID = null;
        this.selectedPieceSQR = null;
        this.selectedPiece = null;
        this.moveState = false;

        if (this.whosTurn == "black") {
          if (targetRow == 7) {
            this.blackQueenCount += 1;
            if (this.blackQueenCount == 2) {
              window.alert("BLACK WINS!!!");
            }
          }
          this.whosTurn = "white";
        } else {
          if (targetRow == 0) {
            this.whiteQueenCount += 1;
            if (this.whiteQueenCount == 2) {
              window.alert("WHITE WINS!!!");
            }
          }
          this.whosTurn = "black";
        }

      } else {
        window.alert("Movement is not Valid");
      }
    }
  }

  validateMovement(sqr) {
    const targetRow = Math.floor(sqr/8);
    const targetCol = sqr % 8;
    const selectedPieceRow = this.selectedPiece.row;
    const selectedPieceCol = this.selectedPiece.col;

    if (this.whosTurn == "black") {
      if (((selectedPieceRow + 1 == targetRow &&
          (selectedPieceCol + 1 == targetCol || 
            selectedPieceCol - 1 == targetCol)) && 
            this.boardState[sqr] == null) ||
            (((selectedPieceRow + 2 == targetRow &&
              (selectedPieceCol + 2 == targetCol || 
                selectedPieceCol - 2 == targetCol)) && 
                this.boardState[sqr] == null) && 
                this.isWhitePiece((selectedPieceRow + targetRow) / 2, (selectedPieceCol + targetCol) / 2))) {
        return true;
      }
    }

    if (this.whosTurn == "white") {
      if (((selectedPieceRow - 1 == targetRow &&
          (selectedPieceCol + 1 == targetCol || 
            selectedPieceCol - 1 == targetCol)) && 
            this.boardState[sqr] == null) ||
            (((selectedPieceRow - 2 == targetRow &&
              (selectedPieceCol + 2 == targetCol || 
                selectedPieceCol - 2 == targetCol)) && 
                this.boardState[sqr] == null) && 
                this.isBlackPiece((selectedPieceRow + targetRow) / 2, (selectedPieceCol + targetCol) / 2))) {
        return true;
      }
    }
    return false;
  }

  isWhitePiece(row, col) {
    const sqr = row * 8 + col;
    
    if (this.boardState[sqr] != null && this.boardState[sqr] >= 12) {
      this.boardState[sqr] = null;
      return true;
    }
    return false;
  }

  isBlackPiece(row, col) {
    const sqr = row * 8 + col;
    
    if (this.boardState[sqr] != null && this.boardState[sqr] <= 11) {
      this.boardState[sqr] = null;
      return true;
    }
    return false;
  }
}

