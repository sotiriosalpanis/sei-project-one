function init() {
  
  const grid = document.querySelector('.grid')
  
  const gameSpeed = 300
  
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


  // ? Rotation https://www.w3schools.com/jsref/prop_style_transform.asp ?

  
  const shapes = []

  const next = document.querySelector('.next')

  class TetrominoShape {
    constructor(name,width,height,colour,blankTiles) {
      this.name = name
      this.width = width
      this.height = height
      this.colour = colour
      this.blankTiles = blankTiles
    }
    createShape() {
      const shapeGrid = document.createElement('div')
      shapeGrid.classList.add('shape')
      shapeGrid.style.width = `${this.width * cellSize}px`
      shapeGrid.style.height = `${this.height * cellSize}px`
      const shapeCellCount = this.width * this.height
      for (let i = 0; i < shapeCellCount; i++) {
        const shapeCell = document.createElement('div')
        shapeCell.textContent = i
        shapeCell.style.width = `${cellSize - 2}px`
        shapeCell.style.height = `${cellSize - 2}px`
        shapeCell.classList.add(tetrominoClass)
        if (!this.blankTiles[0].includes(i)) {
          shapeCell.classList.add(this.name)
          shapeCell.style.backgroundColor = `${this.colour}`
        }
      
        shapeGrid.appendChild(shapeCell)
      }
      next.innerHTML += this.name
      next.appendChild(shapeGrid)
      
      return shapeGrid
    }
    createShapeArray() {
      const shapeArray = []
      for (let h = 0; h < this.height; h++) {
        if (h === 0) {
          for (let w = 0;w < this.width; w++) {
            shapeArray.push(startingPosition + w)
          }
        } else {
          for (let w = 0;w < this.width; w++) {
            shapeArray.push(startingPosition + gridWidth + w)
          }
        }
      }
      const removeArray = this.blankTiles[0]
      for (let r = 0; r < removeArray.length; r++) {
        shapeArray.splice(removeArray[r],1)
        console.log(removeArray[r])
      }
      return shapeArray
    }
  }

  const square = new TetrominoShape('square',2,2,'yellow',[[],[]])
  const bar = new TetrominoShape('bar',4,1,'aqua',[[],[]])
  const cross = new TetrominoShape('cross',3,2,'purple',[[2,0],[4,0],[5,3],[5,1]])
  const zed = new TetrominoShape('zed',3,2,'chartreuse',[[5,0],[4,1]])
  const revZed = new TetrominoShape('revZed',3,2,'red',[[3,2],[5,0]])
  const ell = new TetrominoShape('ell',3,2,'orange',[[1,0],[4,2],[5,4],[3,1]])
  const revEll = new TetrominoShape('revEll',3,2,'blue',[[4,3],[5,3],[2,1],[3,1]])
  
  shapes.push(square)
  shapes.push(bar)
  shapes.push(cross)
  shapes.push(zed)
  shapes.push(revZed)
  shapes.push(ell)
  shapes.push(revEll)


  function addTetromino(array,shape,orientation) {
    console.log('Up button new tet: ',array,shape,orientation)
    array.forEach(cell => {
      cells[cell].classList.add(tetrominoClass)
      cells[cell].classList.add(shape)
      cells[cell].classList.add(orientation)
    })
  }

  function removeTetromino(array,shape,orientation) {
    array.forEach(cell => {
      cells[cell].classList.remove(tetrominoClass)
      cells[cell].classList.remove(shape)
      cells[cell].classList.remove(orientation)
    })
  }

  const shapeToBeAdded = []
  const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
  shapeToBeAdded.push(nextShape)
  const activeShape = shapes[Math.floor(Math.random() * shapes.length)]
  shapeToBeAdded.push(activeShape)

  let arrayStartingPosition
  let shape
  let orientation

  function dropTetromino() {
    document.addEventListener('keyup', handleKeyUp)
    const shapeObject = shapeToBeAdded[0]
    shape = shapeToBeAdded[0].name
    orientation = 0
    const shapeUpNext = shapeToBeAdded[1]
    shapeUpNext.createShape()
    arrayStartingPosition = shapeObject.createShapeArray()
    tetrominoPosition = arrayStartingPosition
    const dropTimerId = setInterval(() => {
      if (cells[startingPosition].classList.contains('set') || grid.classList.contains('stop-game')) {
        console.log('Game stopped')
        clearInterval(dropTimerId)
        grid.classList.remove('stop-game')
        cells.forEach(cell => cell.classList.remove(tetrominoClass))
      } else if (tetrominoPosition.some(space => space + gridWidth > cellCount - 1) ) {
        addTetromino(tetrominoPosition,shape,orientation)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        shapeToBeAdded[1].createShape()
        orientation = 0
      } else if (tetrominoPosition.some(space => cells[space + gridWidth].classList.contains('set'))) {
        addTetromino(tetrominoPosition,shape,orientation)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        shapeToBeAdded[1].createShape()
        orientation = 0
      } else {
        removeTetromino(tetrominoPosition,shape,orientation)
        const nextSpace = tetrominoPosition.map(cell => {
          cell += gridWidth
          return cell
        })
        addTetromino(nextSpace,shape,orientation)
        tetrominoPosition = nextSpace
      } 
    },gameSpeed)
  }



  

  function handleKeyUp(event) {
    const key = event.keyCode
    // * 39 is right. 37 is left. 38 is up.
    if (key === 39 && tetrominoPosition.every(cell => cell % gridWidth !== gridWidth - 1) && tetrominoPosition.every(cell => !cells[cell + 1].classList.contains('set')) && tetrominoPosition.every(cell => cell + gridWidth <= cellCount - 1)) {
      removeTetromino(tetrominoPosition,shape,orientation)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell += 1
      })
    } else if (key === 37 && tetrominoPosition.every(cell => cell % gridWidth !== 0) && tetrominoPosition.every(cell => !cells[cell - 1].classList.contains('set')) && tetrominoPosition.every(cell => cell + gridWidth <= cellCount - 1)) {
      removeTetromino(tetrominoPosition,shape)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell -= 1
      })
    } else if (key === 38) {
      removeTetromino(tetrominoPosition,shape,orientation)
      orientation = orientation + 1
      // const newOrientation = orientation + 1
      // addTetromino(tetrominoPosition,shape,orientation)

    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition,shape,orientation)
  }

  // Buttons!
  const startButton = document.querySelector('#play')
  const stopButton = document.querySelector('#stop')
  startButton.addEventListener('click',dropTetromino)
  stopButton.addEventListener('click',stopGrid)

  function stopGrid(){
    if (window.confirm('Are you sure you want to stop the game? All progress will be lost')) {
      grid.classList.add('stop-game')
    }
  }

  




}


window.addEventListener('DOMContentLoaded', init)