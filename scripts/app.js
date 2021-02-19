function init() {
  
  const grid = document.querySelector('.grid')
  // console.log(grid)
  
  const gameSpeed = 500
  
  const gridWidth = 10
  const gridHeight = 20
  const cellCount = gridWidth * gridHeight

  const cells = []


  const tetrominoClass = 'tetromino'
  let tetrominoPosition = Math.floor(gridWidth / 2)
  // const startingPosition = Math.floor(gridWidth / 2)


  function createGrid() {
    console.log(tetrominoPosition)
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

  // function gravity() {
  //   removeTetromino(tetrominoPosition)
  //   const nextSpace = tetrominoPosition += gridWidth
  //   if (cells[nextSpace].classList.contains(tetrominoClass) === true){
  //     addTetromino(tetrominoPosition)  
  //   } else {
  //     addTetromino(nextSpace)
  //   } 
    
  // }

  
  let gravityCount = 0

  let dropping
  
  function dropTetromino() {
    addTetromino(tetrominoPosition)

    const dropTimerId = setInterval(() => {  
      
      if (gravityCount < gridHeight - 1) {
        // gravity()
        removeTetromino(tetrominoPosition)
        const nextSpace = tetrominoPosition += gridWidth
        if (cells[nextSpace].classList.contains(tetrominoClass) === true){
          clearInterval(dropTimerId)
        } else {
          addTetromino(nextSpace)
        } 
        gravityCount++
      } else {
        clearInterval(dropTimerId)
        dropping = false
        console.log(dropping)
      }
    },gameSpeed)
    return dropping
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