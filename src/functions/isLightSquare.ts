/**
 * @param {string} position The position of the cell eg : a1
 * @param {number} index
 * @returns {boolean} true if a square/cell should be labelled as light based on its index
 */

export const isLightSquare = (position:string,index:number): boolean => {
    const row:number = Number(position[1]);

    const isEven = (x:number): boolean => !(x%2); 

    //our indexes start from zero but here we assume from 1
    if(isEven(row) && !isEven(index+1)){
        return true;
    }

    if(isEven(index+1) && !isEven(row)){
        return true;
    }


    return false;
}