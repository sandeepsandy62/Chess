//defines common behaviour for all chess pieces
interface Piece {
    move(): void;
    capture(): void;
    getColor(): string;
}

//defines behaviour of pieces that can move on the board
interface Movable {
    moveTo(x: number , y : number) : void ;
}

class ChessPiece implements Piece , Movable {
    private color : string ;
    private x : number ;
    private y : number ;

    constructor(color : string , x : number , y : number){
        this.color = color ;
        this.x = x ;
        this.y = y ;
    }

    getColor(): string {
        return this.color
    }

    move(): void {
        console.log("This piece can move");
    }

    capture(): void {
        console.log("this piece can capture");
    }

    moveTo(x: number, y: number): void {
        this.x = x ;
        this.y = y ;
    }
}

class Pawn extends ChessPiece{

}

class Rook extends ChessPiece{

}

class Knight extends ChessPiece{

}

class Bishop extends ChessPiece{

}

class Queen extends ChessPiece{

}

class King extends ChessPiece{

}



class Board {
    private squares: ChessPiece[][];

    constructor(){
        this.squares = Array.from({length:8} , () => Array(8).fill(null));
    }

    placePiece(piece: ChessPiece , x : number , y : number) : void{
        this.squares[x][y] = piece;
    }
}

class Player{
    private color : string ;
    private pieces : ChessPiece[];

    constructor(color : string){
        this.color = color;
        this.pieces = []
    }

    addPiece(piece : ChessPiece) : void{
        this.pieces.push(piece);
    }

}

class Game {
    private players: Player[];
    private board: Board;

    constructor(player1 : Player , player2 : Player){
        this.players = [player1,player2];
        this.board = new Board();
    }

    start() : void {

    }

}

const player1 = new Player("white");
const player2 = new Player("Black");

const game = new Game(player1,player2);
game.start();