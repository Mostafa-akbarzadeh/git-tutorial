class Board {
    #matrix;
    #state;
    #score = 0;

    constructor(matrix){

        this.#matrix = matrix;

        this.#state = JSON.parse(JSON.stringify(matrix)).map((i) => i.fill(0))
    }

    find(number){
        let col;
        for(let row in this.#matrix)
            if((col = this.#matrix[row].indexOf(number)) != -1){
                this.#state[row][col] = 1;
                
                if(this.#checkIsCompleteColumn(col) || this.#checkIsCompleteRow(row)){
                    return (this.#calculateScore() * number);
                }
                return;
            }
                
        return;
    }

    #calculateScore(){
        for(let row in this.#state)
            for(let col = 0; col < this.#state[row].length; col++)
                if(this.#state[row][col] == 0)
                    this.#score += this.#matrix[row][col];
        
        return this.#score;            
    }

    #checkIsCompleteRow(row){
        return !this.#state[row].some((i) => i == 0)
    }
    
    #checkIsCompleteColumn(col){
        for(let row in this.#state)
            if(this.#state[row][col] == 0)
                return false;
        
        return true;        
    }

    get matrix(){
        return this.#matrix;
    }

    get state(){
        return this.#state;
    }
}

module.exports = Board;