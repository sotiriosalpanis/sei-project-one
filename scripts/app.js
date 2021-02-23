function init() {
  
  const grid = document.querySelector('.grid')
  
  const gameSpeed = 500
  
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

  // class TetrominoShape {
  //   constructor(name,width,height,colour,blankTiles) {
  //     this.name = name
  //     this.width = width
  //     this.height = height
  //     this.colour = colour
  //     this.blankTiles = blankTiles
  //   }
  //   createShape() {
  //     const shapeGrid = document.createElement('div')
  //     shapeGrid.classList.add('shape')
  //     shapeGrid.style.width = `${this.width * cellSize}px`
  //     shapeGrid.style.height = `${this.height * cellSize}px`
  //     const shapeCellCount = this.width * this.height
  //     for (let i = 0; i < shapeCellCount; i++) {
  //       const shapeCell = document.createElement('div')
  //       shapeCell.textContent = i
  //       shapeCell.style.width = `${cellSize - 2}px`
  //       shapeCell.style.height = `${cellSize - 2}px`
  //       shapeCell.classList.add(tetrominoClass)
  //       if (!this.blankTiles[0].includes(i)) {
  //         shapeCell.classList.add(this.name)
  //         shapeCell.style.backgroundColor = `${this.colour}`
  //       }
      
  //       shapeGrid.appendChild(shapeCell)
  //     }
  //     next.innerHTML += this.name
  //     next.appendChild(shapeGrid)
      
  //     return shapeGrid
  //   }
  //   createShapeArray() {
  //     const shapeArray = []
  //     for (let h = 0; h < this.height; h++) {
  //       if (h === 0) {
  //         for (let w = 0;w < this.width; w++) {
  //           shapeArray.push(startingPosition + w)
  //         }
  //       } else {
  //         for (let w = 0;w < this.width; w++) {
  //           shapeArray.push(startingPosition + gridWidth + w)
  //         }
  //       }
  //     }
  //     const removeArray = this.blankTiles[0]
  //     for (let r = 0; r < removeArray.length; r++) {
  //       shapeArray.splice(removeArray[r],1)
  //       console.log(removeArray[r])
  //     }
  //     return shapeArray
  //   }
  // }

  class TetrominoShape {
    constructor(name,size,tiles) {
      this.name = name
      this.size = size
      this.tiles = tiles
    }
    createShape() {
      const shapeGrid = document.createElement('div')
      shapeGrid.classList.add('shape')
      shapeGrid.style.width = `${this.size * cellSize}px`
      shapeGrid.style.height = `${this.size * cellSize}px`
      const shapeCellCount = this.size * this.size
      for (let i = 0; i < shapeCellCount; i++) {
        const shapeCell = document.createElement('div')
        shapeCell.textContent = i
        shapeCell.style.width = `${cellSize - 2}px`
        shapeCell.style.height = `${cellSize - 2}px`
        shapeCell.classList.add(tetrominoClass)
        if (this.tiles[0].includes(i)) {
          shapeCell.classList.add(this.name)
          // shapeCell.style.backgroundColor = `${this.colour}`
        }
      
        shapeGrid.appendChild(shapeCell)
      }
      next.innerHTML += this.name
      next.appendChild(shapeGrid)
      
      return shapeGrid
    }
    createShapeArray() {
      const shapeArray = []
      for (let h = 0; h < this.size; h++) {
        if (h === 0) {
          for (let w = 0;w < this.size; w++) {
            shapeArray.push(startingPosition + w)
          }
        } else {
          for (let w = 0;w < this.size; w++) {
            shapeArray.push(startingPosition + (gridWidth * h) + w)
          }
        }
      }
      const tilesArray = []
      for (let r = 0; r < this.tiles[0].length; r++) {
        tilesArray.push(shapeArray[this.tiles[0][r]])
      }
      console.log('tiles',tilesArray)
      return tilesArray
    }
  }
  const square = new TetrominoShape('square',2,[[1,2,5,6],[1,2,5,6],[1,2,5,6],[1,2,5,6]])
  const bar = new TetrominoShape('bar',4,[[4,5,6,7],[2,6,10,14],[8,9,10,11],[1,5,6,7]])
  const cross = new TetrominoShape('cross',3,[[1,3,4,5]])
  const zed = new TetrominoShape('zed',3,[[1,2,3,4]])
  const revZed = new TetrominoShape('revZed',3,[[0,1,4,5]])
  const ell = new TetrominoShape('ell',3,[[3,4,5,2]])
  const revEll = new TetrominoShape('revEll',3,[[0,3,4,5]])
  
  shapes.push(square)
  shapes.push(bar)
  shapes.push(cross)
  shapes.push(zed)
  shapes.push(revZed)
  shapes.push(ell)
  shapes.push(revEll)


  function addTetromino(array,shape,orientation) {
    // console.log('Check 3',array)
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
      if (orientation < 3){
        orientation = orientation + 1
      } else {
        orientation = 0
      }
      tetrominoPosition = createRotationArray(shape,orientation,tetrominoPosition)
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition,shape,orientation)
  }

  let height
  let width
  function createRotationArray(shape,orientation,tetrominoPosition) {
    const rotationPosition = tetrominoPosition[0]
    const shapeObject = shapes.find(object => {
      return object.name === shape
    })
    if (shape === 'square') {
      console.log('No action required')
      return tetrominoPosition
    } if (orientation > 1) {
      orientation = orientation - 2
    } 
    if (orientation === 0 || orientation === 2) {
      height = shapeObject.height
      width = shapeObject.width
    } else {
      height = shapeObject.width
      width = shapeObject.height
    }
    const shapeArray = []
    for (let h = 0; h < height; h++) {
      if (h === 0) {
        for (let w = 0;w < width; w++) {
          shapeArray.push(rotationPosition + w)
        }
      } else {
        for (let w = 0;w < width; w++) {
          shapeArray.push(rotationPosition + (gridWidth * h))
        }
      }
    }
    const removeArray = shapeObject.blankTiles[orientation]
    for (let r = 0; r < removeArray.length; r++) {
      shapeArray.splice(removeArray[r],1)
    //   console.log(removeArray[r])
    }
    return shapeArray
    
  }

  // const testRotation = createRotationArray('bar',1,[53,54,55,45])
  // // addTetromino(testRotation,ell.name,0)
  // console.log('Sup baby',testRotation)

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