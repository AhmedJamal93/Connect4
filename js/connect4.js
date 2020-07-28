class Connect4{
  constructor(selector){
    this.ROWS = 6;
    this.COLS = 7;
    this.player = 'Red';
    this.selector = selector;
    this.isGameOver = false;
    this.RedTaken = [];
    this.YellowTaken = [];
    this.createGrid();
    this.setupEventListeners();
    this.checkForWinner();
  }
//*****************************************************************************
  // method to create grid
  createGrid(){
    const that = this;
    that.RedTaken = [];
    that.YellowTaken = [];
    // selecting parent div = selector
    const gameBoard = document.getElementById(this.selector);
    this.isGameOver = false;
    this.player = 'Red';
    const containerRow = gameBoard.querySelectorAll('.row');
    containerRow.forEach(function(row){
      let cells = row.querySelectorAll('.col');
      cells.forEach(function(item){
        item.remove();
      })
      row.remove();
    })
    that.isGameOver = false;
    gameBoard.removeChild
    console.log(containerRow)
    // gameBoard.getElementsByClassName('col').classList.remove('Red')
    // while(gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild)

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
    const status = document.querySelector('.status');
    status.innerHTML = 'Red Player Turn';
  }
//*****************************************************************************
  setupEventListeners(){
    const takenCells = [];
    //const YellowTaken = [];
    const gameBoard = document.getElementById(this.selector);
    const that = this;
    const cols = document.getElementsByClassName('col');
    let cells = null;
    let cellsArr = [];
    let status = document.querySelector('.status');

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
          // cellsArr[i].classList.add('next-Red');
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
        if(classes == 'col empty next-Red' || classes == 'col empty next-Yellow'){
          console.log(classes)

          // Adding new class list to last empty cell that will shade the cell
          // a different colour
          // cellsArr[i].classList.add('next-Red');
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
        if(that.isGameOver) return;
        const col = cols[i].getAttribute('data-col');
        const lastEmptyCell = findLastEmptyCell(col);
        lastEmptyCell.classList.add('next-' + that.player);
        console.log(lastEmptyCell.classList);
      });
      // event listener when mouse leaves selected column
      cols[i].addEventListener('mouseleave', function(){
        if(that.isGameOver) return;
        const col = cols[i].getAttribute('data-col');
        const lastEmptyCell = findLastShadedCell(col);
        lastEmptyCell.classList.remove('next-' + that.player);
      });
      // event listener on click to drop piece
      cols[i].addEventListener('click', function(){
        if(that.isGameOver) return;
        const row = cols[i].getAttribute('data-row');
        const col = cols[i].getAttribute('data-col');
        const filledCell = findLastShadedCell(col);
        filledCell.classList.add(that.player);
        const filledRow = filledCell.getAttribute('data-row');
        const filledcol = filledCell.getAttribute('data-col');

        const cell = parseInt(filledCell.getAttribute('cell'));
        if(that.player == 'Red'){
            that.RedTaken.push(cell);
        };
        if(that.player == 'Yellow'){
            that.YellowTaken.push(cell);
        };
        console.log(that.RedTaken);
        console.log(that.YellowTaken)
        // check winner
        const winner = that.checkForWinner(cell);
        if(winner){
          that.isGameOver = true;
          // let status = document.querySelector('.status');
          status.innerHTML = (that.player + ' Won The Game!')
          //alert(that.player + ' has won the game!')
          return;
        }
        that.player = (that.player === 'Red')? 'Yellow' : 'Red';

        if(that.player === 'Yellow'){

          status.innerHTML = 'Yellow Player Turn'
        } else {
          status.innerHTML = 'Red Player Turn'
        }
      });
    }
    // const restart = document.querySelector('button');
    // console.log(restart)
    // restart.addEventListener('click', function(){
    //   this.createGrid();
    // })
  }
//*****************************************************************************
  checkForWinner(cell){
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
    if(that.RedTaken.includes(0) && that.RedTaken.includes(1) && that.RedTaken.includes(2) && that.RedTaken.includes(3) // Horizontal
      || that.RedTaken.includes(1) && that.RedTaken.includes(2) && that.RedTaken.includes(3) && that.RedTaken.includes(4)
      || that.RedTaken.includes(2) && that.RedTaken.includes(3) && that.RedTaken.includes(4) && that.RedTaken.includes(5)
      || that.RedTaken.includes(3) && that.RedTaken.includes(4) && that.RedTaken.includes(5) && that.RedTaken.includes(6)
      || that.RedTaken.includes(7) && that.RedTaken.includes(8) && that.RedTaken.includes(9) && that.RedTaken.includes(10)
      || that.RedTaken.includes(8) && that.RedTaken.includes(9) && that.RedTaken.includes(10) && that.RedTaken.includes(11)
      || that.RedTaken.includes(9) && that.RedTaken.includes(10) && that.RedTaken.includes(11) && that.RedTaken.includes(12)
      || that.RedTaken.includes(10) && that.RedTaken.includes(11) && that.RedTaken.includes(12) && that.RedTaken.includes(13)
      || that.RedTaken.includes(14) && that.RedTaken.includes(15) && that.RedTaken.includes(16) && that.RedTaken.includes(17)
      || that.RedTaken.includes(15) && that.RedTaken.includes(16) && that.RedTaken.includes(17) && that.RedTaken.includes(18)
      || that.RedTaken.includes(16) && that.RedTaken.includes(17) && that.RedTaken.includes(18) && that.RedTaken.includes(19)
      || that.RedTaken.includes(17) && that.RedTaken.includes(18) && that.RedTaken.includes(19) && that.RedTaken.includes(20)
      || that.RedTaken.includes(21) && that.RedTaken.includes(22) && that.RedTaken.includes(23) && that.RedTaken.includes(24)
      || that.RedTaken.includes(22) && that.RedTaken.includes(23) && that.RedTaken.includes(24) && that.RedTaken.includes(25)
      || that.RedTaken.includes(23) && that.RedTaken.includes(24) && that.RedTaken.includes(25) && that.RedTaken.includes(26)
      || that.RedTaken.includes(24) && that.RedTaken.includes(25) && that.RedTaken.includes(26) && that.RedTaken.includes(27)
      || that.RedTaken.includes(28) && that.RedTaken.includes(29) && that.RedTaken.includes(30) && that.RedTaken.includes(31)
      || that.RedTaken.includes(29) && that.RedTaken.includes(30) && that.RedTaken.includes(31) && that.RedTaken.includes(32)
      || that.RedTaken.includes(30) && that.RedTaken.includes(31) && that.RedTaken.includes(32) && that.RedTaken.includes(33)
      || that.RedTaken.includes(31) && that.RedTaken.includes(32) && that.RedTaken.includes(33) && that.RedTaken.includes(34)
      || that.RedTaken.includes(35) && that.RedTaken.includes(36) && that.RedTaken.includes(37) && that.RedTaken.includes(38)
      || that.RedTaken.includes(36) && that.RedTaken.includes(37) && that.RedTaken.includes(38) && that.RedTaken.includes(39)
      || that.RedTaken.includes(37) && that.RedTaken.includes(38) && that.RedTaken.includes(39) && that.RedTaken.includes(40)
      || that.RedTaken.includes(38) && that.RedTaken.includes(39) && that.RedTaken.includes(40) && that.RedTaken.includes(41)
      || that.RedTaken.includes(0) && that.RedTaken.includes(7) && that.RedTaken.includes(14) && that.RedTaken.includes(21) // Vertical
      || that.RedTaken.includes(1) && that.RedTaken.includes(8) && that.RedTaken.includes(15) && that.RedTaken.includes(22)
      || that.RedTaken.includes(2) && that.RedTaken.includes(9) && that.RedTaken.includes(16) && that.RedTaken.includes(23)
      || that.RedTaken.includes(3) && that.RedTaken.includes(10) && that.RedTaken.includes(17) && that.RedTaken.includes(24)
      || that.RedTaken.includes(4) && that.RedTaken.includes(11) && that.RedTaken.includes(18) && that.RedTaken.includes(25)
      || that.RedTaken.includes(5) && that.RedTaken.includes(12) && that.RedTaken.includes(19) && that.RedTaken.includes(26)
      || that.RedTaken.includes(6) && that.RedTaken.includes(13) && that.RedTaken.includes(20) && that.RedTaken.includes(27)
      || that.RedTaken.includes(7) && that.RedTaken.includes(14) && that.RedTaken.includes(21) && that.RedTaken.includes(28)
      || that.RedTaken.includes(8) && that.RedTaken.includes(15) && that.RedTaken.includes(22) && that.RedTaken.includes(29)
      || that.RedTaken.includes(9) && that.RedTaken.includes(16) && that.RedTaken.includes(23) && that.RedTaken.includes(30)
      || that.RedTaken.includes(10) && that.RedTaken.includes(17) && that.RedTaken.includes(24) && that.RedTaken.includes(31)
      || that.RedTaken.includes(11) && that.RedTaken.includes(18) && that.RedTaken.includes(25) && that.RedTaken.includes(32)
      || that.RedTaken.includes(12) && that.RedTaken.includes(19) && that.RedTaken.includes(26) && that.RedTaken.includes(33)
      || that.RedTaken.includes(13) && that.RedTaken.includes(20) && that.RedTaken.includes(27) && that.RedTaken.includes(34)
      || that.RedTaken.includes(14) && that.RedTaken.includes(21) && that.RedTaken.includes(28) && that.RedTaken.includes(35)
      || that.RedTaken.includes(15) && that.RedTaken.includes(22) && that.RedTaken.includes(29) && that.RedTaken.includes(36)
      || that.RedTaken.includes(16) && that.RedTaken.includes(23) && that.RedTaken.includes(30) && that.RedTaken.includes(37)
      || that.RedTaken.includes(17) && that.RedTaken.includes(24) && that.RedTaken.includes(31) && that.RedTaken.includes(38)
      || that.RedTaken.includes(18) && that.RedTaken.includes(25) && that.RedTaken.includes(32) && that.RedTaken.includes(39)
      || that.RedTaken.includes(19) && that.RedTaken.includes(26) && that.RedTaken.includes(33) && that.RedTaken.includes(40)
      || that.RedTaken.includes(20) && that.RedTaken.includes(27) && that.RedTaken.includes(34) && that.RedTaken.includes(41)
      || that.RedTaken.includes(21) && that.RedTaken.includes(15) && that.RedTaken.includes(9) && that.RedTaken.includes(3) // Pos dia
      || that.RedTaken.includes(22) && that.RedTaken.includes(16) && that.RedTaken.includes(10) && that.RedTaken.includes(4)
      || that.RedTaken.includes(23) && that.RedTaken.includes(17) && that.RedTaken.includes(11) && that.RedTaken.includes(5)
      || that.RedTaken.includes(24) && that.RedTaken.includes(18) && that.RedTaken.includes(12) && that.RedTaken.includes(6)
      || that.RedTaken.includes(28) && that.RedTaken.includes(22) && that.RedTaken.includes(16) && that.RedTaken.includes(10)
      || that.RedTaken.includes(29) && that.RedTaken.includes(23) && that.RedTaken.includes(17) && that.RedTaken.includes(11)
      || that.RedTaken.includes(30) && that.RedTaken.includes(24) && that.RedTaken.includes(18) && that.RedTaken.includes(12)
      || that.RedTaken.includes(31) && that.RedTaken.includes(25) && that.RedTaken.includes(19) && that.RedTaken.includes(13)
      || that.RedTaken.includes(35) && that.RedTaken.includes(29) && that.RedTaken.includes(23) && that.RedTaken.includes(17)
      || that.RedTaken.includes(36) && that.RedTaken.includes(30) && that.RedTaken.includes(24) && that.RedTaken.includes(18)
      || that.RedTaken.includes(37) && that.RedTaken.includes(31) && that.RedTaken.includes(25) && that.RedTaken.includes(19)
      || that.RedTaken.includes(38) && that.RedTaken.includes(32) && that.RedTaken.includes(26) && that.RedTaken.includes(20)
      || that.RedTaken.includes(14) && that.RedTaken.includes(22) && that.RedTaken.includes(30) && that.RedTaken.includes(38) // Neg Diag
      || that.RedTaken.includes(15) && that.RedTaken.includes(23) && that.RedTaken.includes(31) && that.RedTaken.includes(39)
      || that.RedTaken.includes(16) && that.RedTaken.includes(24) && that.RedTaken.includes(32) && that.RedTaken.includes(40)
      || that.RedTaken.includes(17) && that.RedTaken.includes(25) && that.RedTaken.includes(33) && that.RedTaken.includes(41)
      || that.RedTaken.includes(7) && that.RedTaken.includes(15) && that.RedTaken.includes(23) && that.RedTaken.includes(31)
      || that.RedTaken.includes(8) && that.RedTaken.includes(16) && that.RedTaken.includes(24) && that.RedTaken.includes(32)
      || that.RedTaken.includes(9) && that.RedTaken.includes(17) && that.RedTaken.includes(25) && that.RedTaken.includes(33)
      || that.RedTaken.includes(10) && that.RedTaken.includes(18) && that.RedTaken.includes(26) && that.RedTaken.includes(34)
      || that.RedTaken.includes(0) && that.RedTaken.includes(8) && that.RedTaken.includes(16) && that.RedTaken.includes(24)
      || that.RedTaken.includes(1) && that.RedTaken.includes(9) && that.RedTaken.includes(17) && that.RedTaken.includes(25)
      || that.RedTaken.includes(2) && that.RedTaken.includes(10) && that.RedTaken.includes(18) && that.RedTaken.includes(26)
      || that.RedTaken.includes(3) && that.RedTaken.includes(11) && that.RedTaken.includes(19) && that.RedTaken.includes(27)){
      // alert('Red wins');
      roundWon = true;
      return that.gameActive = true
    } else if(that.YellowTaken.includes(0) && that.YellowTaken.includes(1) && that.YellowTaken.includes(2) && that.YellowTaken.includes(3) // Horizontal
      || that.YellowTaken.includes(1) && that.YellowTaken.includes(2) && that.YellowTaken.includes(3) && that.YellowTaken.includes(4)
      || that.YellowTaken.includes(2) && that.YellowTaken.includes(3) && that.YellowTaken.includes(4) && that.YellowTaken.includes(5)
      || that.YellowTaken.includes(3) && that.YellowTaken.includes(4) && that.YellowTaken.includes(5) && that.YellowTaken.includes(6)
      || that.YellowTaken.includes(7) && that.YellowTaken.includes(8) && that.YellowTaken.includes(9) && that.YellowTaken.includes(10)
      || that.YellowTaken.includes(8) && that.YellowTaken.includes(9) && that.YellowTaken.includes(10) && that.YellowTaken.includes(11)
      || that.YellowTaken.includes(9) && that.YellowTaken.includes(10) && that.YellowTaken.includes(11) && that.YellowTaken.includes(12)
      || that.YellowTaken.includes(10) && that.YellowTaken.includes(11) && that.YellowTaken.includes(12) && that.YellowTaken.includes(13)
      || that.YellowTaken.includes(14) && that.YellowTaken.includes(15) && that.YellowTaken.includes(16) && that.YellowTaken.includes(17)
      || that.YellowTaken.includes(15) && that.YellowTaken.includes(16) && that.YellowTaken.includes(17) && that.YellowTaken.includes(18)
      || that.YellowTaken.includes(16) && that.YellowTaken.includes(17) && that.YellowTaken.includes(18) && that.YellowTaken.includes(19)
      || that.YellowTaken.includes(17) && that.YellowTaken.includes(18) && that.YellowTaken.includes(19) && that.YellowTaken.includes(20)
      || that.YellowTaken.includes(21) && that.YellowTaken.includes(22) && that.YellowTaken.includes(23) && that.YellowTaken.includes(24)
      || that.YellowTaken.includes(22) && that.YellowTaken.includes(23) && that.YellowTaken.includes(24) && that.YellowTaken.includes(25)
      || that.YellowTaken.includes(23) && that.YellowTaken.includes(24) && that.YellowTaken.includes(25) && that.YellowTaken.includes(26)
      || that.YellowTaken.includes(24) && that.YellowTaken.includes(25) && that.YellowTaken.includes(26) && that.YellowTaken.includes(27)
      || that.YellowTaken.includes(28) && that.YellowTaken.includes(29) && that.YellowTaken.includes(30) && that.YellowTaken.includes(31)
      || that.YellowTaken.includes(29) && that.YellowTaken.includes(30) && that.YellowTaken.includes(31) && that.YellowTaken.includes(32)
      || that.YellowTaken.includes(30) && that.YellowTaken.includes(31) && that.YellowTaken.includes(32) && that.YellowTaken.includes(33)
      || that.YellowTaken.includes(31) && that.YellowTaken.includes(32) && that.YellowTaken.includes(33) && that.YellowTaken.includes(34)
      || that.YellowTaken.includes(35) && that.YellowTaken.includes(36) && that.YellowTaken.includes(37) && that.YellowTaken.includes(38)
      || that.YellowTaken.includes(36) && that.YellowTaken.includes(37) && that.YellowTaken.includes(38) && that.YellowTaken.includes(39)
      || that.YellowTaken.includes(37) && that.YellowTaken.includes(38) && that.YellowTaken.includes(39) && that.YellowTaken.includes(40)
      || that.YellowTaken.includes(38) && that.YellowTaken.includes(39) && that.YellowTaken.includes(40) && that.YellowTaken.includes(41)
      || that.YellowTaken.includes(0) && that.YellowTaken.includes(7) && that.YellowTaken.includes(14) && that.YellowTaken.includes(21) // Vertical
      || that.YellowTaken.includes(1) && that.YellowTaken.includes(8) && that.RedTaken.includes(15) && that.YellowTaken.includes(22)
      || that.YellowTaken.includes(2) && that.YellowTaken.includes(9) && that.YellowTaken.includes(16) && that.YellowTaken.includes(23)
      || that.YellowTaken.includes(3) && that.YellowTaken.includes(10) && that.YellowTaken.includes(17) && that.YellowTaken.includes(24)
      || that.YellowTaken.includes(4) && that.YellowTaken.includes(11) && that.YellowTaken.includes(18) && that.YellowTaken.includes(25)
      || that.YellowTaken.includes(5) && that.YellowTaken.includes(12) && that.YellowTaken.includes(19) && that.YellowTaken.includes(26)
      || that.YellowTaken.includes(6) && that.YellowTaken.includes(13) && that.YellowTaken.includes(20) && that.YellowTaken.includes(27)
      || that.YellowTaken.includes(7) && that.YellowTaken.includes(14) && that.YellowTaken.includes(21) && that.YellowTaken.includes(28)
      || that.YellowTaken.includes(8) && that.YellowTaken.includes(15) && that.YellowTaken.includes(22) && that.YellowTaken.includes(29)
      || that.YellowTaken.includes(9) && that.YellowTaken.includes(16) && that.YellowTaken.includes(23) && that.YellowTaken.includes(30)
      || that.YellowTaken.includes(10) && that.YellowTaken.includes(17) && that.YellowTaken.includes(24) && that.YellowTaken.includes(31)
      || that.YellowTaken.includes(11) && that.YellowTaken.includes(18) && that.YellowTaken.includes(25) && that.YellowTaken.includes(32)
      || that.YellowTaken.includes(12) && that.YellowTaken.includes(19) && that.YellowTaken.includes(26) && that.YellowTaken.includes(33)
      || that.YellowTaken.includes(13) && that.YellowTaken.includes(20) && that.YellowTaken.includes(27) && that.YellowTaken.includes(34)
      || that.YellowTaken.includes(14) && that.YellowTaken.includes(21) && that.YellowTaken.includes(28) && that.YellowTaken.includes(35)
      || that.YellowTaken.includes(15) && that.YellowTaken.includes(22) && that.YellowTaken.includes(29) && that.YellowTaken.includes(36)
      || that.YellowTaken.includes(16) && that.YellowTaken.includes(23) && that.YellowTaken.includes(30) && that.YellowTaken.includes(37)
      || that.YellowTaken.includes(17) && that.YellowTaken.includes(24) && that.YellowTaken.includes(31) && that.YellowTaken.includes(38)
      || that.YellowTaken.includes(18) && that.YellowTaken.includes(25) && that.YellowTaken.includes(32) && that.YellowTaken.includes(39)
      || that.YellowTaken.includes(19) && that.YellowTaken.includes(26) && that.YellowTaken.includes(33) && that.YellowTaken.includes(40)
      || that.YellowTaken.includes(20) && that.YellowTaken.includes(27) && that.YellowTaken.includes(34) && that.YellowTaken.includes(41)
      || that.YellowTaken.includes(21) && that.YellowTaken.includes(15) && that.YellowTaken.includes(9) && that.YellowTaken.includes(3) // Pos dia
      || that.YellowTaken.includes(22) && that.YellowTaken.includes(16) && that.YellowTaken.includes(10) && that.YellowTaken.includes(4)
      || that.YellowTaken.includes(23) && that.YellowTaken.includes(17) && that.YellowTaken.includes(11) && that.YellowTaken.includes(5)
      || that.YellowTaken.includes(24) && that.YellowTaken.includes(18) && that.YellowTaken.includes(12) && that.YellowTaken.includes(6)
      || that.YellowTaken.includes(28) && that.YellowTaken.includes(22) && that.YellowTaken.includes(16) && that.YellowTaken.includes(10)
      || that.YellowTaken.includes(29) && that.YellowTaken.includes(23) && that.YellowTaken.includes(17) && that.YellowTaken.includes(11)
      || that.YellowTaken.includes(30) && that.YellowTaken.includes(24) && that.YellowTaken.includes(18) && that.YellowTaken.includes(12)
      || that.YellowTaken.includes(31) && that.YellowTaken.includes(25) && that.YellowTaken.includes(19) && that.YellowTaken.includes(13)
      || that.YellowTaken.includes(35) && that.YellowTaken.includes(29) && that.YellowTaken.includes(23) && that.YellowTaken.includes(17)
      || that.YellowTaken.includes(36) && that.YellowTaken.includes(30) && that.YellowTaken.includes(24) && that.YellowTaken.includes(18)
      || that.YellowTaken.includes(37) && that.YellowTaken.includes(31) && that.YellowTaken.includes(25) && that.YellowTaken.includes(19)
      || that.YellowTaken.includes(38) && that.YellowTaken.includes(32) && that.YellowTaken.includes(26) && that.YellowTaken.includes(20)
      || that.YellowTaken.includes(14) && that.YellowTaken.includes(22) && that.YellowTaken.includes(30) && that.YellowTaken.includes(38) // Neg Diag
      || that.YellowTaken.includes(15) && that.YellowTaken.includes(23) && that.YellowTaken.includes(31) && that.YellowTaken.includes(39)
      || that.YellowTaken.includes(16) && that.YellowTaken.includes(24) && that.YellowTaken.includes(32) && that.YellowTaken.includes(40)
      || that.YellowTaken.includes(17) && that.YellowTaken.includes(25) && that.YellowTaken.includes(33) && that.YellowTaken.includes(41)
      || that.YellowTaken.includes(7) && that.YellowTaken.includes(15) && that.YellowTaken.includes(23) && that.YellowTaken.includes(31)
      || that.YellowTaken.includes(8) && that.YellowTaken.includes(16) && that.YellowTaken.includes(24) && that.YellowTaken.includes(32)
      || that.YellowTaken.includes(9) && that.YellowTaken.includes(17) && that.YellowTaken.includes(25) && that.YellowTaken.includes(33)
      || that.YellowTaken.includes(10) && that.YellowTaken.includes(18) && that.YellowTaken.includes(26) && that.YellowTaken.includes(34)
      || that.YellowTaken.includes(0) && that.YellowTaken.includes(8) && that.YellowTaken.includes(16) && that.YellowTaken.includes(24)
      || that.YellowTaken.includes(1) && that.YellowTaken.includes(9) && that.YellowTaken.includes(17) && that.YellowTaken.includes(25)
      || that.YellowTaken.includes(2) && that.YellowTaken.includes(10) && that.YellowTaken.includes(18) && that.YellowTaken.includes(26)
      || that.YellowTaken.includes(3) && that.YellowTaken.includes(11) && that.YellowTaken.includes(19) && that.YellowTaken.includes(27)){
        // alert('Yellow wins');
        roundWon = true;
        return true;
      }
  }

  restart(){
    this.createGrid();
    this.setupEventListeners();
    this.checkForWinner();
  }
}

// check for winner function
// const that = this;
//
// function getCell(i. j){
//   return (document.querySelector('.col').getAttribute('data-row = '+ i));
//   return (document.querySelector('.col').getAttribute('data-col = '+ j));
// }
//
// function checkDirection(direction){
//   let total = 0;
//   let i = in_row + direction.i;
//   let j = in_col + direction.j;
//   let cell = getcell(i,j);
//   while(i>= 0 && i < that.ROWS &&
//         j>= 0 && j < that.COLS &&
//         in_col.getAttribute()
//
// }
//
// function checkWin(directionA, directionB){
//   const total = 1 +
//   checkDirection(directionA) +
//   checkDirection(directionB);
//   if(total >= 4){
//     return that.player;
//   } else {
//     return;
//   }
// }
//
// function checkVerticals(){
//   return checkWin({i:-1, j:0}, {i:1, j:0});
// }
//
// return checkVerticals()
