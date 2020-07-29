document.addEventListener("DOMContentLoaded", function(event) {
  const connect4 = new Connect4('connect4')

  const reset = document.querySelector('button');
  reset.addEventListener('click', function(){
    connect4.restart()
  })

  const scoreReset = document.querySelector('#resetScore');
  scoreReset.addEventListener('click', function(){
    connect4.scoreReset()
  })
});
