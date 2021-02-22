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
        shapeCell.classList.add(this.name)
        if (!this.blankTiles.includes(i)) {
          shapeCell.classList.add(tetrominoClass)
          shapeCell.style.backgroundColor = `${this.colour}`
        }
      
        shapeGrid.appendChild(shapeCell)
      }
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
      const removeArray = this.blankTiles.reverse()
      for (let r = 0; r < removeArray.length; r++) {
        shapeArray.splice(removeArray[r],1)
      }
      return shapeArray
    }
  }

  const square = new TetrominoShape('square',2,2,'yellow',[])
  const bar = new TetrominoShape('bar',4,1,'aqua',[])
  const cross = new TetrominoShape('cross',3,2,'purple',[0,2])
  const zed = new TetrominoShape('zed',3,2,'chartreuse',[0,5])
  const revZed = new TetrominoShape('revZed',3,2,'red',[2,3])
  const ell = new TetrominoShape('ell',3,2,'orange',[0,1])
  const revEll = new TetrominoShape('revEll',3,2,'blue',[3,4])
  
  shapes.push(square)
  shapes.push(bar)
  shapes.push(cross)
  shapes.push(zed)
  shapes.push(revZed)
  shapes.push(ell)
  shapes.push(revEll)

  // console.log(zed.createShapeArray())


  // const nextShape = shapes[Math.floor(Math.random() * shapes.length)].createShape()
  // console.log(nextShape)

  function addTetromino(array,shape) {
    array.forEach(cell => {
      cells[cell].classList.add(tetrominoClass)
      cells[cell].classList.add(shape)
    })
  }

  function removeTetromino(array,shape) {
    array.forEach(cell => {
      cells[cell].classList.remove(tetrominoClass)
      cells[cell].classList.remove(shape)
    })
  }

  const shapeToBeAdded = []
  const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
  shapeToBeAdded.push(nextShape)
  const activeShape = shapes[Math.floor(Math.random() * shapes.length)]
  shapeToBeAdded.push(activeShape)

  let arrayStartingPosition
  let shape

  function dropTetromino() {
    const shapeObject = shapeToBeAdded[0]
    shape = shapeToBeAdded[0].name
    const shapeUpNext = shapeToBeAdded[1]
    // next.innerText = shapeUpNext
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
        addTetromino(tetrominoPosition,shape)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        // next.innerText = shapeToBeAdded[1].name
        shapeToBeAdded[1].createShape()
      } else if (tetrominoPosition.some(space => cells[space + gridWidth].classList.contains('set'))) {
        addTetromino(tetrominoPosition,shape)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        // next.innerText = shapeToBeAdded[1].name
        shapeToBeAdded[1].createShape()
      } else {
        removeTetromino(tetrominoPosition,shape)
        const nextSpace = tetrominoPosition.map(cell => {
          cell += gridWidth
          return cell
        })
        addTetromino(nextSpace,shape)
        tetrominoPosition = nextSpace
      } 
    },gameSpeed)
  }



  document.addEventListener('keyup', handleKeyUp)

  function handleKeyUp(event) {
    const key = event.keyCode
    // * 39 is right. 37 is left
    if (key === 39 && tetrominoPosition.every(cell => cell % gridWidth !== gridWidth - 1) && tetrominoPosition.every(cell => !cells[cell + 1].classList.contains('set')) && tetrominoPosition.every(cell => cell + gridWidth <= cellCount - 1)) {
      removeTetromino(tetrominoPosition,shape)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell += 1
      })
    } else if (key === 37 && tetrominoPosition.every(cell => cell % gridWidth !== 0) && tetrominoPosition.every(cell => !cells[cell - 1].classList.contains('set')) && tetrominoPosition.every(cell => cell + gridWidth <= cellCount - 1)) {
      removeTetromino(tetrominoPosition,shape)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell -= 1
      })
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition,shape)
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