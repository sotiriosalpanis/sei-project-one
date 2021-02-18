function init() {
  
  const grid = document.querySelector('.grid')
  // console.log(grid)
  
  const gameSpeed = 1000
  
  const gridWidth = 10
  const gridHeight = 20
  const cellCount = gridWidth * gridHeight

  const cells = []


  const tetrominoClass = 'tetromino'
  // let tetrominoPosition = Math.floor(Math.random() * gridWidth)
  let tetrominoPosition = 0

  function createGrid(tetrominoPosition) {
    console.log(tetrominoPosition)
    for (let i = 0; i < cellCount; i++ ) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cell.classList.add('cell')
      cells.push(cell)
    }
  }



  createGrid(tetrominoPosition)

  function addTetromino(position) {
    cells[position].classList.add(tetrominoClass)
  }
  function removeTetromino(position) {
    cells[position].classList.remove(tetrominoClass)
  }

  function gravity() {
    removeTetromino(tetrominoPosition)
    const nextSpace = tetrominoPosition += gridWidth
    if (cells[nextSpace].classList.contains(tetrominoClass) === true){
      addTetromino(tetrominoPosition)  
    } else {
      addTetromino(nextSpace)
    } 
    
  }

  
  let gravityCount = 0

  function dropTetromino() {
    const dropTimerId = setInterval(() => {  
      if (gravityCount < gridHeight - 1) {
        gravity()
        gravityCount++
        console.log(gravityCount)
      } else {
        clearInterval(dropTimerId)
      }
    },gameSpeed)
  }

  dropTetromino()


  document.addEventListener('keyup', handleKeyUp)

  function handleKeyUp(event) {
    const key = event.keyCode
    console
    if (key === 39 && tetrominoPosition % gridWidth !== gridWidth - 1) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition++
    } else if (key === 37 && tetrominoPosition % gridWidth !== 0) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition --
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition)
  }



  // let count = 0

  // const timerId = setInterval(() => {
  //   // console.log(count)
  //   addTetromino(tetrominoPosition)
  //   if (count < 5) {
  //     dropTetromino()
  //     count++
  //   } else {
  //     clearInterval(timerId)
  //   }
  // }, 10000) //this will need to be calculated




}


window.addEventListener('DOMContentLoaded', init)