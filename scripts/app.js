function init() {
  
  const grid = document.querySelector('.grid')
  // console.log(grid)
  
  const gameSpeed = 500
  
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
    gravityCount = 0
    tetrominoPosition = startingPosition
    addTetromino(tetrominoPosition)
    const dropTimerId = setInterval(() => {  
      if (gravityCount < gridHeight - 1) {
        removeTetromino(tetrominoPosition)
        const currentPosition = tetrominoPosition
        const nextSpace = tetrominoPosition += gridWidth
        if (cells[nextSpace].classList.contains(tetrominoClass) === true){
          console.log('Check 2')
          cells[currentPosition].classList.add(tetrominoClass)
          console.log(cells[currentPosition].innerHTML)
          clearInterval(dropTimerId)
        } else {
          addTetromino(nextSpace)
        } 
        gravityCount++
      } else {
        console.log('Check 4',gravityCount)
        clearInterval(dropTimerId)
      }
    },gameSpeed)
  }


  let numDrops = 0
  const repeatDropId = setInterval(() => {
    if (numDrops <= 5) {
      console.log('Number of drops: ', numDrops)
      dropTetromino()
      numDrops++
    } else {
      clearInterval(repeatDropId)
    }
  },10000)

  dropTetromino()


  document.addEventListener('keyup', handleKeyUp)

  function handleKeyUp(event) {
    const key = event.keyCode
    // 39 is right. 37 is left
    if (key === 39 && tetrominoPosition % gridWidth !== gridWidth - 1 && !cells[tetrominoPosition + 1].classList.contains(tetrominoClass)) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition++
    } else if (key === 37 && tetrominoPosition % gridWidth !== 0 && !cells[tetrominoPosition - 1].classList.contains(tetrominoClass)) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition --
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition)
  }







}


window.addEventListener('DOMContentLoaded', init)