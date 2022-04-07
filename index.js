const fs = require('fs');

if(!process.argv[2])
    throw new Error('Input text file not valid.');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if(err){
        console.error(err);
        return
    }
    
    split = data.split('\n');
    rands = split.shift();

    split.splice(0, 1);

    let boards = [];
    let board = [];

    for(let row of split){
        
        if(row){
            board.push(row.split(' ').filter((i) => i).map((i) => parseInt(i)));
        } else {
            boards.push(new Board(board));
            board = [];
        }
    }
    
    let score = 0;
    for(let num of rands.split(',').map((i) => parseInt(i)))
        for(let b of boards)
            if((score = b.find(num)) != undefined){
                console.log(b.score, b.backup, num, score);
                return;
            }

})

function Board(matrix){
    this.matrix = matrix;
    
    this.backup = JSON.parse(JSON.stringify(this.matrix)).map((i) => i.fill(0));

    this.score = 0;

    this.find = function(number){

        for(let row in this.matrix)
            if((index = this.matrix[row].indexOf(number)) != -1){
                this.backup[row][index] = 1

                if(this.checkRow(row) || this.checkCol(index)){
                    return (this.calcScore() * number);
                }
                break;
            }
        
    }

    this.calcScore = function(){

        for(let row in this.backup)
            for(let col = 0; col < this.backup[row].length; col++)
                if(this.backup[row][col] == 0)
                    this.score += this.matrix[row][col];

        return this.score;   
    }

    this.checkRow = function(row){
        if(this.backup[row].every((i) => i == 1))
            return true;

        return false;       
    }

    this.checkCol = function(col){
        let found = true;

        for(let row in this.backup)
            if(this.backup[row][col] == 0){
                found = false;
                break;
            }
                
        return found;
    }
}

// const matrix = [
//     ['1','5'],
//     ['4','3']
// ]

// let b = new Board(matrix);
// let total = 0;

// console.log(b.find('1'));
// console.log(b.find('4'));
