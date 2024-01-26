class Cell{

    private pos : string
    private piece : string
    
    constructor(pos:string,piece:string){
        this.pos = pos;
        this.piece = piece ;
    }

}

const range = (n:number , fillValue: number | string): (number | string)[] => {
    if(typeof fillValue === 'number'){
        return Array.from({length : n} , (_,i) => i+1);
    }else{
        return Array.from({length:n} , () => fillValue)
    }
}

/**
 *
 * @param {String} fenString rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
 * @returns {Cell[]}
 */
export const createBoard = (fenString : string) => {
    const fen = fenString.split(' ')[0]; // get the first position
    const fenPieces = fen.split('/').join(''); //remove the row delimiters '/'
    //fenPieces = rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR

    let pieces = Array.from(fenPieces)

    //Save individual pieces for each of the 64 cells
    //attempting to replace each numeric character with an array of empty strings
   for(let index = 0 ; index < pieces.length ; index++){
    const currentValue = Number(pieces[index]);
    if(isFinite(currentValue)){
        const emptyArray = range(currentValue,'') as (string)[];
        pieces.splice(index , 1 , ...emptyArray);
        index += emptyArray.length-1 ;
    }
   }

   //removes the nested loops
   pieces = pieces.flat()

   //["8","7","6",...."1"]
   const rows = range(8,0).map((n) => n.toString()).reverse();
   
   const columns = ['a','b','c','d','e','f','g','h'];

   const cells: string[] = []; //[a1,b1,c1,d1,...h8]
   for(let i = 0 ; i < rows.length ; i++){
    const row = rows[i];
    for(let j = 0 ; j < columns.length ; j++){
        const column = columns[j];
        cells.push(`${column}${row}`); //a1,b1,...
    }
   }

   const board:Cell[] = [];
   for(let i = 0 ; i < cells.length ; i++){
    // cells and pieces have the same length of 64
    const cell = cells[i];
    const piece = pieces[i];
    board.push(new Cell(cell,piece))
   }


   return board;

}