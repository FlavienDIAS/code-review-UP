
const EMPTY_SYMBOL:string = ' ';
const PLAYER_O:string = 'O';
const ERROR_FIRST_PLAYER:string = 'Invalid first player';
const ERROR_NEXT_PLAYER:string = 'Invalid next player';
const ERROR_INVALID_POSITION:string = 'Invalid position';
const LINE0:number = 0;
const LINE1:number = 1;
const LINE2:number = 2;
const COLUMN0:number = 0;
const COLUMN1:number = 1;
const COLUMN2:number = 2;
const BOARD_SIZE:number = 3;

export class Game {
  private _lastSymbol = EMPTY_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == EMPTY_SYMBOL) {
      if (player == PLAYER_O) {
        throw new Error(ERROR_FIRST_PLAYER);
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error(ERROR_NEXT_PLAYER);
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != EMPTY_SYMBOL) {
      throw new Error(ERROR_INVALID_POSITION);
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(LINE0, COLUMN0)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(LINE1, COLUMN0)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(LINE2, COLUMN0)!.Symbol;
    }

    return EMPTY_SYMBOL;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(LINE0, COLUMN0)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(LINE0, COLUMN1)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(LINE0, COLUMN2)!.Symbol != EMPTY_SYMBOL
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(LINE0, COLUMN0)!.Symbol == this._board.TileAt(LINE0, COLUMN1)!.Symbol &&
      this._board.TileAt(LINE0, COLUMN2)!.Symbol == this._board.TileAt(LINE0, COLUMN1)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(LINE1, COLUMN0)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(LINE1, COLUMN1)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(LINE1, COLUMN2)!.Symbol != EMPTY_SYMBOL
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(LINE1, COLUMN0)!.Symbol == this._board.TileAt(LINE1, COLUMN1)!.Symbol &&
      this._board.TileAt(LINE1, COLUMN2)!.Symbol == this._board.TileAt(LINE1, COLUMN1)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(LINE2, COLUMN0)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(LINE2, COLUMN1)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(LINE2, COLUMN2)!.Symbol != EMPTY_SYMBOL
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(LINE2, COLUMN0)!.Symbol == this._board.TileAt(LINE2, COLUMN1)!.Symbol &&
      this._board.TileAt(LINE2, COLUMN2)!.Symbol == this._board.TileAt(LINE2, COLUMN1)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let line = LINE0; line < BOARD_SIZE; line++) {
      for (let col = COLUMN0; col < BOARD_SIZE; col++) {
        const tile: Tile = { X: line, Y: col, Symbol: EMPTY_SYMBOL };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
