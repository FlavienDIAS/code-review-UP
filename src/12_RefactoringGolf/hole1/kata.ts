/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number) {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this._board.AddTile(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay && player === playerO) {
      throw new Error('Joueur initial invalide');
    }
  }

  private validatePlayer(player: string){
    if (player == this._lastSymbol) {
      throw new Error('Joueur suivant invalide');
    }
  }

  private validatePositionIsEmpty(x: number, y: number){
    if (this._board.TileAt(x, y).Symbol != emptyPlay) {
      throw new Error('Position invalide');
    }
  }

  private updateLastPlayer(player: string){
    this._lastSymbol = player;
  }

  public Winner(){
    return this._board.findRowFullWithSameSymbol();
  }
}

class Tile {
  constructor(public X: number, public Y: number, public Symbol: string) {}
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        this._plays.push(new Tile(i, j, emptyPlay));
      }
    }
  }

  public TileAt(x: number, y: number) {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTile(symbol: string, x: number, y: number) {
    const tile = this.TileAt(x, y);
    tile.Symbol = symbol;
  }

  public findRowFullWithSameSymbol() {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
        this.TileAt(row, firstColumn)!.Symbol != emptyPlay &&
        this.TileAt(row, secondColumn)!.Symbol != emptyPlay &&
        this.TileAt(row, thirdColumn)!.Symbol != emptyPlay
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    const symbol = this.TileAt(row, firstColumn).Symbol;
    return (
        this.TileAt(row, secondColumn).Symbol == symbol &&
        this.TileAt(row, thirdColumn).Symbol == symbol
    );
  }
}
