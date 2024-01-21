class Square {

    constructor(x, y, pieceOnThisSquare , canvasCoord){
        this.x = x //Int 0 < x < 7
        this.y = y //Int 0 < x < 7
        this.canvasCoord = canvasCoord // in pixels
        this.pieceOnThisSquare = pieceOnThisSquare //chess piece || null 
    }

    setPiece(newPiece){
        if(newPiece === null && this.pieceOnThisSquare == null) return 
        else if (newPiece == null){
            //case where the function callers wants to remove the piece that is on this sqaure
            this.pieceOnThisSquare.setSquare(undefined)
            this.pieceOnThisSquare = null
        }else if(this.pieceOnThisSquare == null){
            //case where the function caller wants to assign a new piece on this square
            this.pieceOnThisSquare = newPiece
            newPiece.setSquare(this)
        }else if(this.getPieceIdOnThisSquare() != newPiece.id && this.pieceOnThisSquare.color != newPiece.color){
            //case where the function callers wants to change the piece on this sqaure , only different color allowed
            console.log("capture!")
            this.pieceOnThisSquare = newPiece
            newPiece.setSquare(this)
        }else{
            return "user tried to capture their own piece"
        }
    }

    removePiece(){
        this.pieceOnThisSquare = null
    }

    getPiece(){
        return this.getPieceIdOnThisSquare
    }

    getPieceIdOnThisSquare(){
        if(this.pieceOnThisSquare === null){
            return "empty"
        }
        return this.pieceOnThisSquare.id
    }

    isOccupied(){
        return this.pieceOnThisSquare != null
    }

    getCoord(){
        return [this.x,this.y]
    }

    getCanvasCoord(){
        return this.canvasCoord
    }



}
export default Square