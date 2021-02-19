function init() {
  
  const grid = document.querySelector('.grid')
  
  const gameSpeed = 100
  
  const gridWidth = 10
  const gridHeight = 20
  const cellCount = gridWidth * gridHeight

  const cells = []
  const cellSize = 25



  const tetrominoClass = 'tetromino'
  let tetrominoPosition = Math.floor((gridWidth / 2) - 1)
  const startingPosition = Math.floor((gridWidth / 2) - 1)


  function createGrid() {
    for (let i = 0; i < cellCount; i++ ) {
      const cell = document.createElement('div')
      cell.textContent = i
      cell.classList.add('cell')
      cell.style.width = `${cellSize - 2}px`
      cell.style.height = `${cellSize - 2}px`
      grid.style.width = `${gridWidth * cellSize}px`
      grid.style.height = `${gridHeight * cellSize}px`
      grid.appendChild(cell)
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

  // Shapes!
  // Array of shapes
    // each shape an object
      // Object properties - 
        // width
        // height
        // blank spaces ie not class tetronimo
        // color
  // ? Rotation https://www.w3schools.com/jsref/prop_style_transform.asp ?

  const shapes = []
  
  const square = {
    name: 'square',
    width: 2,
    height: 2,
    colour: 'green'
  }

  const bar = {
    name: 'bar',
    width: 1,
    height: 4,
    colour: 'orange'
  }

  shapes.push(square)
  shapes.push(bar)

  const next = document.querySelector('.next')


  function createShape(shapeIndex) {
    const shapeGrid = document.createElement('div')
    shapeGrid.classList.add('shape')
    shapeGrid.style.width = `${shapes[shapeIndex].width * cellSize}px`
    shapeGrid.style.height = `${shapes[shapeIndex].height * cellSize}px`
    const shapeCellCount = shapes[shapeIndex].width * shapes[shapeIndex].height
    for (let i = 0; i < shapeCellCount; i++) {
      const shapeCell = document.createElement('div')
      shapeCell.textContent = i
      shapeCell.classList.add(tetrominoClass)
      shapeCell.classList.add(shapes[shapeIndex].name)
      shapeCell.style.backgroundColor = `${shapes[shapeIndex].colour}`
      shapeCell.style.width = `${cellSize - 2}px`
      shapeCell.style.height = `${cellSize - 2}px`
      shapeGrid.appendChild(shapeCell)
    }
    next.appendChild(shapeGrid)
  }

  createShape(1)
  createShape(0)




}


window.addEventListener('DOMContentLoaded', init)