// # not working in browser
// import {Board} from './Board.js';
// import {fs} from 'fs';

const Board = require('./Board.js');
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
                console.log(score);
                return;
            }
g
})
