/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private readonly playerO = 'O';
  private readonly emptyPlay = ' ';

  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string){
    const { emptyPlay, playerO } = this;
    if (this._lastSymbol === emptyPlay && player === playerO) {
      throw new Error('Invalid first player');
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number){
    const { emptyPlay } = this;
    if (this._board.TileAt(x, y).Symbol !== emptyPlay) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number){
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    for (let i = 0; i < this._board.rows; i++) {
      if (this.isRowFull(i) && this.isRowFullWithSameSymbol(i)) {
        return this._board.TileAt(i, 0).Symbol;
      }
    }

    return this.emptyPlay;
  }

  private isRowFull(row: number){
    const { columns } = this._board;
    for (let j = 0; j < columns; j++) {
      if (this._board.TileAt(row, j).Symbol === this.emptyPlay) {
        return false;
      }
    }
    return true;
  }

  private isRowFullWithSameSymbol(row: number){
    const symbol = this._board.TileAt(row, 0).Symbol;
    for (let j = 1; j < this._board.columns; j++) {
      if (this._board.TileAt(row, j).Symbol !== symbol) {
        return false;
      }
    }
    return true;
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  public readonly rows = 3;
  public readonly columns = 3;
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number){
    return this._plays.find((t: Tile) => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number){
    const tile = this._plays.find((t: Tile) => t.X === x && t.Y === y);
    if (tile) {
      tile.Symbol = symbol;
    }
  }
}