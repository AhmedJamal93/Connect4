class Connect4{
  constructor(selector){
    this.ROWS = 6;
    this.COLS = 7;
    this.player = 'red';
    this.selector = selector;
    this.gameActive = true;
    this.redTaken = [];
    this.yellowTaken = [];
    this.createGrid();
    this.setupEventListeners();
    this.checkWinner();
  }
//*****************************************************************************
  // method to create grid
  createGrid(){

    // selecting parent div = selector
    const gameBoard = document.getElementById(this.selector);

    // create child div = row
    for(let row = 0;row<this.ROWS; row++){
      const rows = document.createElement('div');
      rows.setAttribute('class', 'row');

      // create child div = col, append to row
      for(let col = 0; col<this.COLS;col++){
        const cols = document.createElement('div');
        cols.setAttribute('class', 'col empty');
        cols.setAttribute('data-col', col);
        cols.setAttribute('data-row', row);
        cols.setAttribute('cell', col+(row*7));
        rows.appendChild(cols);
      }
      // append child div = row to parent = connect4
      gameBoard.appendChild(rows);

    }
    console.log(gameBoard);
  }
//*****************************************************************************
  setupEventListeners(){
    const takenCells = [];
    //const yellowTaken = [];
    const gameBoard = document.getElementById(this.selector);
    const that = this;
    const cols = document.getElementsByClassName('col');
    let cells = null;
    let cellsArr = [];

    // function to find the last empty cell in the selected column
    function findLastEmptyCell(incoming_col){
      const container = document.querySelector('#connect4');
      const containerRow = container.querySelectorAll('.row');
      cellsArr = [];
      containerRow.forEach(function(row){
        cells = row.querySelector('[data-col="'+ incoming_col +'"]');
        cellsArr.push(cells);
      });

      // Looping through array of each column to find the last empty spot
      for(let i = cellsArr.length-1; i>=0; i--){
        const classes = cellsArr[i].classList
        if(classes == 'col empty'){
          console.log(classes)

          // Adding new class list to last empty cell that will shade the cell
          // a different colour
          // cellsArr[i].classList.add('next-red');
          // console.log(classes)
          return cellsArr[i];
        }
      }
      return nullll;
    }
//-----------------------------------------------------------------------------
    // function to find selected cell from selected column
    function findLastShadedCell(incoming_col){
      const container = document.querySelector('#connect4');
      const containerRow = container.querySelectorAll('.row');
      cellsArr = [];
      containerRow.forEach(function(row){
        cells = row.querySelector('[data-col="'+ incoming_col +'"]');
        cellsArr.push(cells);
      });

      // Looping through array of each column to find the last empty spot
      for(let i = cellsArr.length-1; i>=0; i--){
        const classes = cellsArr[i].classList
        if(classes == 'col empty next-red' || classes == 'col empty next-yellow'){
          console.log(classes)

          // Adding new class list to last empty cell that will shade the cell
          // a different colour
          // cellsArr[i].classList.add('next-red');
          // console.log(classes)
          return cellsArr[i];
        }
      }
      return null;
    }


    // ASK WHY FOREACH DIDNT WORK!!
    for(let i=0;i<(this.ROWS*this.COLS);i++){
      // event listener when mouse enters selected column
      cols[i].addEventListener('mouseenter', function(){
        const col = cols[i].getAttribute('data-col');
        const lastEmptyCell = findLastEmptyCell(col);
        lastEmptyCell.classList.add('next-' + that.player);
        console.log(lastEmptyCell.classList);
      });
      // event listener when mouse leaves selected column
      cols[i].addEventListener('mouseleave', function(){
        const col = cols[i].getAttribute('data-col');
        const lastEmptyCell = findLastShadedCell(col);
        lastEmptyCell.classList.remove('next-' + that.player);
      });
      // event listener on click to drop piece
      cols[i].addEventListener('click', function(){
        const row = cols[i].getAttribute('data-row');
        const col = cols[i].getAttribute('data-col');
        const filledCell = findLastShadedCell(col);
        filledCell.classList.add(that.player);
        const cell = parseInt(filledCell.getAttribute('cell'));
        if(that.player == 'red'){
            that.redTaken.push(cell);
        };
        if(that.player == 'yellow'){
            that.yellowTaken.push(cell);
        };

        console.log(that.redTaken);
        console.log(that.yellowTaken)
        // check winner
        const winner = that.checkWinner(cell);

        that.player = (that.player === 'red')? 'yellow' : 'red';
      });

    }
  }
//*****************************************************************************
  checkWinner(incomingCell){
    // let gameActive = true;
    const that = this;
    const gameBoard = [
      '','','','','','','',
      '','','','','','','',
      '','','','','','','',
      '','','','','','','',
      '','','','','','','',
      '','','','','','',''
      ];

    const cols = document.getElementsByClassName('col');
    const rows = document.getElementsByClassName('row');

    const winningCombinations = [
      // horizontal x24
      [0,1,2,3],
      [1,2,3,4],
      [2,3,4,5],
      [3,4,5,6],
      //----------------
      [7,8,9,10],
      [8,9,10,11],
      [9,10,11,12],
      [10,11,12,13],
      //----------------
      [14,15,16,17],
      [15,16,17,18],
      [16,17,18,19],
      [17,18,19,20],
      //----------------
      [21,22,23,24],
      [22,23,24,25],
      [23,24,25,26],
      [24,25,26,27],
      //----------------
      [28,29,30,31],
      [29,30,31,32],
      [30,31,32,33],
      [31,32,33,34],
      //----------------
      [35,36,37,38],
      [36,37,38,39],
      [37,38,39,40],
      [38,39,40,41],
      // Vertical x21
      [0,7,14,21],
      [7,14,21,28],
      [14,21,28,35],
      //----------------
      [1,8,15,22],
      [8,15,22,29],
      [15,22,29,36],
      //----------------
      [2,9,16,23],
      [9,16,23,30],
      [16,23,30,37],
      //----------------
      [3,10,17,24],
      [10,17,24,31],
      [17,24,31,38],
      //----------------
      [4,11,18,25],
      [11,18,25,32],
      [18,25,32,39],
      //----------------
      [5,12,19,26],
      [12,19,26,33],
      [19,23,33,40],
      //----------------
      [6,13,20,27],
      [13,20,27,34],
      [20,27,34,41],
      // Diag bottom left to top right x12
      [21,15,9,3],
      [28,22,16,10],
      [35,29,23,17],
      //----------------
      [22,16,10,4],
      [29,23,17,11],
      [36,30,24,18],
      //----------------
      [23,17,11,5],
      [30,24,28,12],
      [37,31,25,19],
      //----------------
      [24,18,12,6],
      [31,25,29,13],
      [38,32,26,20]
      // Diag top left to bottom right x12
      [14,22,30,38],
      [7,15,23,31],
      [0,8,16,24],
      //----------------
      [15,23,31,39],
      [8,16,24,32],
      [1,9,17,25],
      //----------------
      [16,24,32,40],
      [9,17,25,33],
      [2,10,18,26],
      //----------------
      [17,25,33,41],
      [10,18,26,34],
      [3,11,19,27],
    ];


    let roundWon = false;
    let j=0;
    let newArr =[]
    if(that.redTaken.includes(0) && that.redTaken.includes(1) && that.redTaken.includes(2) && that.redTaken.includes(3) // Horizontal
      || that.redTaken.includes(1) && that.redTaken.includes(2) && that.redTaken.includes(3) && that.redTaken.includes(4)
      || that.redTaken.includes(2) && that.redTaken.includes(3) && that.redTaken.includes(4) && that.redTaken.includes(5)
      || that.redTaken.includes(3) && that.redTaken.includes(4) && that.redTaken.includes(5) && that.redTaken.includes(6)
      || that.redTaken.includes(7) && that.redTaken.includes(8) && that.redTaken.includes(9) && that.redTaken.includes(10)
      || that.redTaken.includes(8) && that.redTaken.includes(9) && that.redTaken.includes(10) && that.redTaken.includes(11)
      || that.redTaken.includes(9) && that.redTaken.includes(10) && that.redTaken.includes(11) && that.redTaken.includes(12)
      || that.redTaken.includes(10) && that.redTaken.includes(11) && that.redTaken.includes(12) && that.redTaken.includes(13)
      || that.redTaken.includes(14) && that.redTaken.includes(15) && that.redTaken.includes(16) && that.redTaken.includes(17)
      || that.redTaken.includes(15) && that.redTaken.includes(16) && that.redTaken.includes(17) && that.redTaken.includes(18)
      || that.redTaken.includes(16) && that.redTaken.includes(17) && that.redTaken.includes(18) && that.redTaken.includes(19)
      || that.redTaken.includes(17) && that.redTaken.includes(18) && that.redTaken.includes(19) && that.redTaken.includes(20)
      || that.redTaken.includes(21) && that.redTaken.includes(22) && that.redTaken.includes(23) && that.redTaken.includes(24)
      || that.redTaken.includes(22) && that.redTaken.includes(23) && that.redTaken.includes(24) && that.redTaken.includes(25)
      || that.redTaken.includes(23) && that.redTaken.includes(24) && that.redTaken.includes(25) && that.redTaken.includes(26)
      || that.redTaken.includes(24) && that.redTaken.includes(25) && that.redTaken.includes(26) && that.redTaken.includes(27)
      || that.redTaken.includes(28) && that.redTaken.includes(29) && that.redTaken.includes(30) && that.redTaken.includes(31)
      || that.redTaken.includes(29) && that.redTaken.includes(30) && that.redTaken.includes(31) && that.redTaken.includes(32)
      || that.redTaken.includes(30) && that.redTaken.includes(31) && that.redTaken.includes(32) && that.redTaken.includes(33)
      || that.redTaken.includes(31) && that.redTaken.includes(32) && that.redTaken.includes(33) && that.redTaken.includes(34)
      || that.redTaken.includes(35) && that.redTaken.includes(36) && that.redTaken.includes(37) && that.redTaken.includes(38)
      || that.redTaken.includes(36) && that.redTaken.includes(37) && that.redTaken.includes(38) && that.redTaken.includes(39)
      || that.redTaken.includes(37) && that.redTaken.includes(38) && that.redTaken.includes(39) && that.redTaken.includes(40)
      || that.redTaken.includes(38) && that.redTaken.includes(39) && that.redTaken.includes(40) && that.redTaken.includes(41)
      || that.redTaken.includes(0) && that.redTaken.includes(7) && that.redTaken.includes(14) && that.redTaken.includes(21) // Vertical
      || that.redTaken.includes(1) && that.redTaken.includes(8) && that.redTaken.includes(15) && that.redTaken.includes(22)
      || that.redTaken.includes(2) && that.redTaken.includes(9) && that.redTaken.includes(16) && that.redTaken.includes(23)
      || that.redTaken.includes(3) && that.redTaken.includes(10) && that.redTaken.includes(17) && that.redTaken.includes(24)
      || that.redTaken.includes(4) && that.redTaken.includes(11) && that.redTaken.includes(18) && that.redTaken.includes(25)
      || that.redTaken.includes(5) && that.redTaken.includes(12) && that.redTaken.includes(19) && that.redTaken.includes(26)
      || that.redTaken.includes(6) && that.redTaken.includes(13) && that.redTaken.includes(20) && that.redTaken.includes(27)
      || that.redTaken.includes(7) && that.redTaken.includes(14) && that.redTaken.includes(21) && that.redTaken.includes(28)
      || that.redTaken.includes(8) && that.redTaken.includes(15) && that.redTaken.includes(22) && that.redTaken.includes(29)
      || that.redTaken.includes(9) && that.redTaken.includes(16) && that.redTaken.includes(23) && that.redTaken.includes(30)
      || that.redTaken.includes(10) && that.redTaken.includes(17) && that.redTaken.includes(24) && that.redTaken.includes(31)
      || that.redTaken.includes(11) && that.redTaken.includes(18) && that.redTaken.includes(25) && that.redTaken.includes(32)
      || that.redTaken.includes(12) && that.redTaken.includes(19) && that.redTaken.includes(26) && that.redTaken.includes(33)
      || that.redTaken.includes(13) && that.redTaken.includes(20) && that.redTaken.includes(27) && that.redTaken.includes(34)
      || that.redTaken.includes(14) && that.redTaken.includes(21) && that.redTaken.includes(28) && that.redTaken.includes(35)
      || that.redTaken.includes(15) && that.redTaken.includes(22) && that.redTaken.includes(29) && that.redTaken.includes(36)
      || that.redTaken.includes(16) && that.redTaken.includes(23) && that.redTaken.includes(30) && that.redTaken.includes(37)
      || that.redTaken.includes(17) && that.redTaken.includes(24) && that.redTaken.includes(31) && that.redTaken.includes(38)
      || that.redTaken.includes(18) && that.redTaken.includes(25) && that.redTaken.includes(32) && that.redTaken.includes(39)
      || that.redTaken.includes(19) && that.redTaken.includes(26) && that.redTaken.includes(33) && that.redTaken.includes(40)
      || that.redTaken.includes(20) && that.redTaken.includes(27) && that.redTaken.includes(34) && that.redTaken.includes(41)
      || that.redTaken.includes(21) && that.redTaken.includes(15) && that.redTaken.includes(9) && that.redTaken.includes(3) // Pos dia
      || that.redTaken.includes(22) && that.redTaken.includes(16) && that.redTaken.includes(10) && that.redTaken.includes(4)
      || that.redTaken.includes(23) && that.redTaken.includes(17) && that.redTaken.includes(11) && that.redTaken.includes(5)
      || that.redTaken.includes(24) && that.redTaken.includes(18) && that.redTaken.includes(12) && that.redTaken.includes(6)
      || that.redTaken.includes(28) && that.redTaken.includes(22) && that.redTaken.includes(16) && that.redTaken.includes(10)
      || that.redTaken.includes(29) && that.redTaken.includes(23) && that.redTaken.includes(17) && that.redTaken.includes(11)
      || that.redTaken.includes(30) && that.redTaken.includes(24) && that.redTaken.includes(18) && that.redTaken.includes(12)
      || that.redTaken.includes(31) && that.redTaken.includes(25) && that.redTaken.includes(19) && that.redTaken.includes(13)
      || that.redTaken.includes(35) && that.redTaken.includes(29) && that.redTaken.includes(23) && that.redTaken.includes(17)
      || that.redTaken.includes(36) && that.redTaken.includes(30) && that.redTaken.includes(24) && that.redTaken.includes(18)
      || that.redTaken.includes(37) && that.redTaken.includes(31) && that.redTaken.includes(25) && that.redTaken.includes(19)
      || that.redTaken.includes(38) && that.redTaken.includes(32) && that.redTaken.includes(26) && that.redTaken.includes(20)
      || that.redTaken.includes(14) && that.redTaken.includes(22) && that.redTaken.includes(30) && that.redTaken.includes(38) // Neg Diag
      || that.redTaken.includes(15) && that.redTaken.includes(23) && that.redTaken.includes(31) && that.redTaken.includes(39)
      || that.redTaken.includes(16) && that.redTaken.includes(24) && that.redTaken.includes(32) && that.redTaken.includes(40)
      || that.redTaken.includes(17) && that.redTaken.includes(25) && that.redTaken.includes(33) && that.redTaken.includes(41)
      || that.redTaken.includes(7) && that.redTaken.includes(15) && that.redTaken.includes(23) && that.redTaken.includes(31)
      || that.redTaken.includes(8) && that.redTaken.includes(16) && that.redTaken.includes(24) && that.redTaken.includes(32)
      || that.redTaken.includes(9) && that.redTaken.includes(17) && that.redTaken.includes(25) && that.redTaken.includes(33)
      || that.redTaken.includes(10) && that.redTaken.includes(18) && that.redTaken.includes(26) && that.redTaken.includes(34)
      || that.redTaken.includes(0) && that.redTaken.includes(8) && that.redTaken.includes(16) && that.redTaken.includes(24)
      || that.redTaken.includes(1) && that.redTaken.includes(9) && that.redTaken.includes(17) && that.redTaken.includes(25)
      || that.redTaken.includes(2) && that.redTaken.includes(10) && that.redTaken.includes(18) && that.redTaken.includes(26)
      || that.redTaken.includes(3) && that.redTaken.includes(11) && that.redTaken.includes(19) && that.redTaken.includes(27)){
      alert('red wins');
      roundWon = true;
    } else if(that.yellowTaken.includes(0) && that.yellowTaken.includes(1) && that.yellowTaken.includes(2) && that.yellowTaken.includes(3) // Horizontal
      || that.yellowTaken.includes(1) && that.yellowTaken.includes(2) && that.yellowTaken.includes(3) && that.yellowTaken.includes(4)
      || that.yellowTaken.includes(2) && that.yellowTaken.includes(3) && that.yellowTaken.includes(4) && that.yellowTaken.includes(5)
      || that.yellowTaken.includes(3) && that.yellowTaken.includes(4) && that.yellowTaken.includes(5) && that.yellowTaken.includes(6)
      || that.yellowTaken.includes(7) && that.yellowTaken.includes(8) && that.yellowTaken.includes(9) && that.yellowTaken.includes(10)
      || that.yellowTaken.includes(8) && that.yellowTaken.includes(9) && that.yellowTaken.includes(10) && that.yellowTaken.includes(11)
      || that.yellowTaken.includes(9) && that.yellowTaken.includes(10) && that.yellowTaken.includes(11) && that.yellowTaken.includes(12)
      || that.yellowTaken.includes(10) && that.yellowTaken.includes(11) && that.yellowTaken.includes(12) && that.yellowTaken.includes(13)
      || that.yellowTaken.includes(14) && that.yellowTaken.includes(15) && that.yellowTaken.includes(16) && that.yellowTaken.includes(17)
      || that.yellowTaken.includes(15) && that.yellowTaken.includes(16) && that.yellowTaken.includes(17) && that.yellowTaken.includes(18)
      || that.yellowTaken.includes(16) && that.yellowTaken.includes(17) && that.yellowTaken.includes(18) && that.yellowTaken.includes(19)
      || that.yellowTaken.includes(17) && that.yellowTaken.includes(18) && that.yellowTaken.includes(19) && that.yellowTaken.includes(20)
      || that.yellowTaken.includes(21) && that.yellowTaken.includes(22) && that.yellowTaken.includes(23) && that.yellowTaken.includes(24)
      || that.yellowTaken.includes(22) && that.yellowTaken.includes(23) && that.yellowTaken.includes(24) && that.yellowTaken.includes(25)
      || that.yellowTaken.includes(23) && that.yellowTaken.includes(24) && that.yellowTaken.includes(25) && that.yellowTaken.includes(26)
      || that.yellowTaken.includes(24) && that.yellowTaken.includes(25) && that.yellowTaken.includes(26) && that.yellowTaken.includes(27)
      || that.yellowTaken.includes(28) && that.yellowTaken.includes(29) && that.yellowTaken.includes(30) && that.yellowTaken.includes(31)
      || that.yellowTaken.includes(29) && that.yellowTaken.includes(30) && that.yellowTaken.includes(31) && that.yellowTaken.includes(32)
      || that.yellowTaken.includes(30) && that.yellowTaken.includes(31) && that.yellowTaken.includes(32) && that.yellowTaken.includes(33)
      || that.yellowTaken.includes(31) && that.yellowTaken.includes(32) && that.yellowTaken.includes(33) && that.yellowTaken.includes(34)
      || that.yellowTaken.includes(35) && that.yellowTaken.includes(36) && that.yellowTaken.includes(37) && that.yellowTaken.includes(38)
      || that.yellowTaken.includes(36) && that.yellowTaken.includes(37) && that.yellowTaken.includes(38) && that.yellowTaken.includes(39)
      || that.yellowTaken.includes(37) && that.yellowTaken.includes(38) && that.yellowTaken.includes(39) && that.yellowTaken.includes(40)
      || that.yellowTaken.includes(38) && that.yellowTaken.includes(39) && that.yellowTaken.includes(40) && that.yellowTaken.includes(41)
      || that.yellowTaken.includes(0) && that.yellowTaken.includes(7) && that.yellowTaken.includes(14) && that.yellowTaken.includes(21) // Vertical
      || that.yellowTaken.includes(1) && that.yellowTaken.includes(8) && that.redTaken.includes(15) && that.yellowTaken.includes(22)
      || that.yellowTaken.includes(2) && that.yellowTaken.includes(9) && that.yellowTaken.includes(16) && that.yellowTaken.includes(23)
      || that.yellowTaken.includes(3) && that.yellowTaken.includes(10) && that.yellowTaken.includes(17) && that.yellowTaken.includes(24)
      || that.yellowTaken.includes(4) && that.yellowTaken.includes(11) && that.yellowTaken.includes(18) && that.yellowTaken.includes(25)
      || that.yellowTaken.includes(5) && that.yellowTaken.includes(12) && that.yellowTaken.includes(19) && that.yellowTaken.includes(26)
      || that.yellowTaken.includes(6) && that.yellowTaken.includes(13) && that.yellowTaken.includes(20) && that.yellowTaken.includes(27)
      || that.yellowTaken.includes(7) && that.yellowTaken.includes(14) && that.yellowTaken.includes(21) && that.yellowTaken.includes(28)
      || that.yellowTaken.includes(8) && that.yellowTaken.includes(15) && that.yellowTaken.includes(22) && that.yellowTaken.includes(29)
      || that.yellowTaken.includes(9) && that.yellowTaken.includes(16) && that.yellowTaken.includes(23) && that.yellowTaken.includes(30)
      || that.yellowTaken.includes(10) && that.yellowTaken.includes(17) && that.yellowTaken.includes(24) && that.yellowTaken.includes(31)
      || that.yellowTaken.includes(11) && that.yellowTaken.includes(18) && that.yellowTaken.includes(25) && that.yellowTaken.includes(32)
      || that.yellowTaken.includes(12) && that.yellowTaken.includes(19) && that.yellowTaken.includes(26) && that.yellowTaken.includes(33)
      || that.yellowTaken.includes(13) && that.yellowTaken.includes(20) && that.yellowTaken.includes(27) && that.yellowTaken.includes(34)
      || that.yellowTaken.includes(14) && that.yellowTaken.includes(21) && that.yellowTaken.includes(28) && that.yellowTaken.includes(35)
      || that.yellowTaken.includes(15) && that.yellowTaken.includes(22) && that.yellowTaken.includes(29) && that.yellowTaken.includes(36)
      || that.yellowTaken.includes(16) && that.yellowTaken.includes(23) && that.yellowTaken.includes(30) && that.yellowTaken.includes(37)
      || that.yellowTaken.includes(17) && that.yellowTaken.includes(24) && that.yellowTaken.includes(31) && that.yellowTaken.includes(38)
      || that.yellowTaken.includes(18) && that.yellowTaken.includes(25) && that.yellowTaken.includes(32) && that.yellowTaken.includes(39)
      || that.yellowTaken.includes(19) && that.yellowTaken.includes(26) && that.yellowTaken.includes(33) && that.yellowTaken.includes(40)
      || that.yellowTaken.includes(20) && that.yellowTaken.includes(27) && that.yellowTaken.includes(34) && that.yellowTaken.includes(41)
      || that.yellowTaken.includes(21) && that.yellowTaken.includes(15) && that.yellowTaken.includes(9) && that.yellowTaken.includes(3) // Pos dia
      || that.yellowTaken.includes(22) && that.yellowTaken.includes(16) && that.yellowTaken.includes(10) && that.yellowTaken.includes(4)
      || that.yellowTaken.includes(23) && that.yellowTaken.includes(17) && that.yellowTaken.includes(11) && that.yellowTaken.includes(5)
      || that.yellowTaken.includes(24) && that.yellowTaken.includes(18) && that.yellowTaken.includes(12) && that.yellowTaken.includes(6)
      || that.yellowTaken.includes(28) && that.yellowTaken.includes(22) && that.yellowTaken.includes(16) && that.yellowTaken.includes(10)
      || that.yellowTaken.includes(29) && that.yellowTaken.includes(23) && that.yellowTaken.includes(17) && that.yellowTaken.includes(11)
      || that.yellowTaken.includes(30) && that.yellowTaken.includes(24) && that.yellowTaken.includes(18) && that.yellowTaken.includes(12)
      || that.yellowTaken.includes(31) && that.yellowTaken.includes(25) && that.yellowTaken.includes(19) && that.yellowTaken.includes(13)
      || that.yellowTaken.includes(35) && that.yellowTaken.includes(29) && that.yellowTaken.includes(23) && that.yellowTaken.includes(17)
      || that.yellowTaken.includes(36) && that.yellowTaken.includes(30) && that.yellowTaken.includes(24) && that.yellowTaken.includes(18)
      || that.yellowTaken.includes(37) && that.yellowTaken.includes(31) && that.yellowTaken.includes(25) && that.yellowTaken.includes(19)
      || that.yellowTaken.includes(38) && that.yellowTaken.includes(32) && that.yellowTaken.includes(26) && that.yellowTaken.includes(20)
      || that.yellowTaken.includes(14) && that.yellowTaken.includes(22) && that.yellowTaken.includes(30) && that.yellowTaken.includes(38) // Neg Diag
      || that.yellowTaken.includes(15) && that.yellowTaken.includes(23) && that.yellowTaken.includes(31) && that.yellowTaken.includes(39)
      || that.yellowTaken.includes(16) && that.yellowTaken.includes(24) && that.yellowTaken.includes(32) && that.yellowTaken.includes(40)
      || that.yellowTaken.includes(17) && that.yellowTaken.includes(25) && that.yellowTaken.includes(33) && that.yellowTaken.includes(41)
      || that.yellowTaken.includes(7) && that.yellowTaken.includes(15) && that.yellowTaken.includes(23) && that.yellowTaken.includes(31)
      || that.yellowTaken.includes(8) && that.yellowTaken.includes(16) && that.yellowTaken.includes(24) && that.yellowTaken.includes(32)
      || that.yellowTaken.includes(9) && that.yellowTaken.includes(17) && that.yellowTaken.includes(25) && that.yellowTaken.includes(33)
      || that.yellowTaken.includes(10) && that.yellowTaken.includes(18) && that.yellowTaken.includes(26) && that.yellowTaken.includes(34)
      || that.yellowTaken.includes(0) && that.yellowTaken.includes(8) && that.yellowTaken.includes(16) && that.yellowTaken.includes(24)
      || that.yellowTaken.includes(1) && that.yellowTaken.includes(9) && that.yellowTaken.includes(17) && that.yellowTaken.includes(25)
      || that.yellowTaken.includes(2) && that.yellowTaken.includes(10) && that.yellowTaken.includes(18) && that.yellowTaken.includes(26)
      || that.yellowTaken.includes(3) && that.yellowTaken.includes(11) && that.yellowTaken.includes(19) && that.yellowTaken.includes(27)){
        alert('Yellow wins');
        roundWon = true;
      }
    // if(roundWon){
    //   that.gameActive = false;


    // for(let i=0;i<69;i++){
    //   if(winningCombinations[i].includes(incomingCell)){
    //     newArr.push(winningCombinations[i])
    //     console.log(newArr)
    //   }
    //   for(let j=0; j<newArr.length;j++){
    //
    //   }
    //
    // }


    // console.log(winningCombinations)
    // for(let i=0;i<69;i++){
    //   let win = winningCombinations[i];
    //   if(that.yellowTaken.includes(win[j]) && that.yellowTaken.includes(win[j+1]) && that.yellowTaken.includes(win[j+2]) && that.yellowTaken.includes(win[j+3])){
    //     console.log(true);
    //     roundWon=true;
    //   }
    // }

    // for(let i=0;i<69;i++){
    //   if(that.yellowTaken.includes(win[j]) && that.yellowTaken.includes(win[j+1]) && that.yellowTaken.includes(win[j+2]) && that.yellowTaken.includes(win[j+3])){
    //     console.log('Yellow Wins')
    //   }
    // }


    //   let combo = winningCombinations[i]
    //   let a = gameBoard[combo[0]];
    //   let b = gameBoard[combo[1]];
    //   let c = gameBoard[combo[2]];
    //   let d = gameBoard[combo[3]];
    //
    //   // if(a === ''|| b === ''|| c === '' || d === ''){
    //   //   continue;
    //   // }
    //   if(a === b && b === c && c === d){
    //     roundWon = true;
    //
    //     break;
    //   } else if(a === ''|| b === ''|| c === '' || d === ''){
    //     continue;
    //   }
    // };
    // if(roundWon){
    //   // alert(that.player + ' Won!')
    //   that.gameActive = false;
    // }


      // let roundWon = false;
      // for(let i=0;i<69;i++){ // start a loop to go through winning conditions
      //   let winCondition = winningCombinations[i];
      //
      //   // giving each element in each winning condition a variable
      //   let a = gameBoard[winCondition[0]];
      //   let b = gameBoard[winCondition[1]];
      //   let c = gameBoard[winCondition[2]];
      //   let d = gameBoard[winCondition[3]];
      //
      //   if(a === ''|| b === ''|| c === '' || d === ''){
      //     continue;
      //   }
      //   if(a === b && b === c && c === d){
      //     roundWon = true;
      //     break;
      //   }
      // }
      // that.player = (that.player === 'red')? 'yellow' : 'red';
  //     if(roundWon){
  //       status.innerHTML = winMessage();
  //       gameActive = false;
  //     }
  //     // setting condition for draw
  //     let roundDraw = !gameBoard.includes('');
  //     if(roundDraw){
  //       status.innerHTML = drawMessage();
  //       gameActive = false;
  //       return;
  //
  //     }
  //     playerChange();
  // };
      // const winningCombinations = [];

      // for(let i = 0; i<rows ; i++){
      //   for(let j = 0; j < cols; j++){
      //     if(j+3<cols){
      //     const win = [gameBoard[i][j],gameBoard[i][j+1],gameBoard[i][j+2],gameBoard[i][j+3]];
      //     }
      //     winningCombinations.push(win);
      //     console.log(winningCombinations)
      //   }
      // }

      //---------------------------------------------------------------------
      // const that = this;
      //
      // function checkWin(dirA, dirB){
      //
      // }
      // function checkVertical(){
      //   return checkWin({i:-1,j:0}, {i:1,j:0});
      // }
      //
      // return checkVertical;
  }
}
