class ChessPiece {

    constructor(name,isAttacked,color,id){
        this.name = name //string
        this.isAttacked = isAttacked // boolean
        this.color = color //string
        this.id = id //string
    }

    setSqaure(newSquare){
        //set the square this piece is sitting top of
        //On the game board, a piece will always be situated on top of a square.
        console.log(newSquare)
        if(newSquare === undefined){
            this.squareThisPieceIsOn = newSquare
            return 
        }

        //when the piece is not on any square (intialization)
        if(this.squareThisPieceIsOn === undefined){
            this.squareThisPieceIsOn = newSquare
            newSquare.setPiece(this)
        }

        //when the piece is moved from one square to another
        const isNewSquareDifferent = this.squareThisPieceIsOn.x != newSquare.x || this.squareThisPieceIsOn.y != newSquare.y

        if(isNewSquareDifferent){
            this.squareThisPieceIsOn = newSquare
            newSquare.setPiece(this)
        }
    }

    getSquare(){
        return this.squareThisPieceIsOn
    }


}

export default ChessPiece