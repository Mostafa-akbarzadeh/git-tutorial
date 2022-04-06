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
            board.push(row.split(' ').filter((i) => i));
        } else {
            boards.push(board);
            board = [];
        }
    }

    console.log(boards);
})