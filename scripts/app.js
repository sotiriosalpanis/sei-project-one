function init() {
  
  const grid = document.querySelector('.grid')
  
  const gameSpeed = 100
  
  const gridWidth = 10
  const gridHeight = 20
  const cellCount = gridWidth * gridHeight

  const cells = []


  const tetrominoClass = 'tetromino'
  let tetrominoPosition = Math.floor((gridWidth / 2) - 1)
  const startingPosition = Math.floor((gridWidth / 2) - 1)


  function createGrid() {
    for (let i = 0; i < cellCount; i++ ) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cell.classList.add('cell')
      cells.push(cell)
    }
  }

  createGrid()

  function addTetromino(tetrominoPosition) {
    cells[tetrominoPosition].classList.add(tetrominoClass)
  }
  function removeTetromino(tetrominoPosition) {
    cells[tetrominoPosition].classList.remove(tetrominoClass)
  }


  let gravityCount
  function dropTetromino() {
    tetrominoPosition = startingPosition
    gravityCount = 0
    const dropTimerId = setInterval(() => {
      if (cells[startingPosition].classList.contains(tetrominoClass) || grid.classList.contains('stop-game')) {
        console.log('Game stopped')
        clearInterval(dropTimerId)
        grid.classList.remove('stop-game')
        cells.forEach(cell => cell.classList.remove(tetrominoClass))
      } else if (gravityCount <= gridHeight - 1) {
        addTetromino(tetrominoPosition)
        removeTetromino(tetrominoPosition)
        // const currentPosition = tetrominoPosition
        const nextSpace = tetrominoPosition += gridWidth
        if ((nextSpace + gridWidth) > cellCount - 1) {
          addTetromino(nextSpace)
          cells[nextSpace].classList.add(tetrominoClass)
          tetrominoPosition = startingPosition
          gravityCount = 0
        } else if (cells[nextSpace + gridWidth].classList.contains(tetrominoClass) === true) {
          addTetromino(nextSpace)
          cells[nextSpace].classList.add(tetrominoClass)
          tetrominoPosition = startingPosition
          gravityCount = 0
        } else {
          addTetromino(nextSpace)
        } 
        gravityCount++
      }
    },gameSpeed)
  }

  // dropTetromino()


  // ? every second active piece drops one space
  // ? only one active piece at a time - use a class
  // ? active piece begins middle of the top of the grid
  // ? piece becomes inactive when it reaches the bottom OR is blocked by another piece
  // ? new piece added when previous stops
  // ? pieces stop dropping if
    // ? No space at the top of the grid
    // ? The Stop button is pressed

  
  // ! clearinterval if starting position has tetronimo class
  


  document.addEventListener('keyup', handleKeyUp)

  function handleKeyUp(event) {
    const key = event.keyCode
    // * 39 is right. 37 is left
    if (key === 39 && tetrominoPosition % gridWidth !== gridWidth - 1 && !cells[tetrominoPosition + 1].classList.contains(tetrominoClass) && tetrominoPosition + gridWidth <= cellCount - 1) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition++
    } else if (key === 37 && tetrominoPosition % gridWidth !== 0 && !cells[tetrominoPosition - 1].classList.contains(tetrominoClass) && tetrominoPosition + gridWidth <= cellCount - 1) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition --
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition)
  }

  // Buttons!
  const startButton = document.querySelector('#play')
  // console.log('Start button', startButton)

  const stopButton = document.querySelector('#stop')
  // console.log('stop button', stopButton)

  startButton.addEventListener('click',dropTetromino)

  stopButton.addEventListener('click',stopGrid)

  function stopGrid(){
    if (window.confirm('Are you sure you want to stop the game? All progress will be lost')) {
      grid.classList.add('stop-game')
      console.log('Stop button',grid.classList)
    }
  }








}


window.addEventListener('DOMContentLoaded', init)