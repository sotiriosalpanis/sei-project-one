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
      if (cells[startingPosition].classList.contains(tetrominoClass)) {
        console.log('Game stopped')
        clearInterval(dropTimerId)
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

  // setInterval
    // check cells for active class if not present:
      // add new piece middle top with active class
      // drop until can't move
      // remove active class + reset position
  
  // ! clearinterval if starting position has tetronimo class
  // ! clearinterval if stop button pressed





  // let numDrops = 0
  // const repeatDropId = setInterval(() => {
  //   if (numDrops <= 5) {
  //     console.log('Number of drops: ', numDrops)
  //     dropTetromino()
  //     numDrops++
  //   } else {
  //     clearInterval(repeatDropId)
  //   }
  // },10000)

  


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







}


window.addEventListener('DOMContentLoaded', init)