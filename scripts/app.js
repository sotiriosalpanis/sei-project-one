function init() {
  
  
  let gameSpeed = 800
  const gridWidth = 12
  const gridHeight = 20
  const cellCount = gridWidth * gridHeight
  const cells = []
  const cellSize = 27
  let score = 0
  const tetrominoClass = 'tetromino'
  let tetrominoPosition = Math.floor((gridWidth / 2) - 1)
  const startingPosition = Math.floor((gridWidth / 2) - 1)

  // * Document queries
  const body = document.querySelector('body')
  const grid = document.querySelector('.grid')
  const hero = document.querySelector('.hero')
  const instructions = document.querySelector('.instructions')
  const startButton = document.querySelector('#play')
  const stopButton = document.querySelector('#stop')
  const scoreSpan = document.querySelectorAll('.current-score')
  const scoreboard = document.querySelector('.scoreboard')
  const tetronimosDropped = document.querySelectorAll('.tetronimos-dropped')
  const rotations = document.querySelectorAll('.rotations')
  const rowsCleared = document.querySelectorAll('.rows-cleared')

  

  function createGrid() {
    for (let i = 0; i < cellCount; i++ ) {
      const cell = document.createElement('div')
      cell.id  = i
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
  
  const shapes = []

  class TetrominoShape {
    constructor(name,size,clearedCount,tiles,orientationAxis) {
      this.name = name
      this.size = size
      this.tiles = tiles
      this.orientationAxis = orientationAxis
      this.clearedCount = clearedCount
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
        }
      
        shapeGrid.appendChild(shapeCell)
      }
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
      return tilesArray
    }
  }
  const square = new TetrominoShape('square',4,0,[[0,1,4,5],[0,1,4,5],[0,1,4,5],[0,1,4,5]],[[0,0],[0,0],[0,0],[0,0]])
  const bar = new TetrominoShape('bar',4,0,[[4,5,6,7],[2,6,10,14],[8,9,10,11],[1,5,9,13]],[[-1,0],[-1,1],[-1,1],[0,1]])
  const cross = new TetrominoShape('cross',3,0,[[1,3,4,5],[1,4,5,7],[3,4,5,7],[1,3,4,7]],[[-1,0],[-1,0],[-1,0],[0,0]])
  const zed = new TetrominoShape('zed',3,0,[[1,2,3,4],[1,4,5,8],[4,5,6,7],[0,3,4,7]],[[-1,0],[-1,0],[-1,1],[0,0]])
  const revZed = new TetrominoShape('revZed',3,0,[[0,1,4,5],[2,5,4,7],[3,4,7,8],[1,3,4,6]],[[-1,0],[-1,0],[-1,1],[0,0]])
  const ell = new TetrominoShape('ell',3,0,[[3,4,5,2],[1,4,7,8],[3,4,5,6],[0,1,4,7]],[[0,0],[0,-1],[-1,0],[0,1]])
  const revEll = new TetrominoShape('revEll',3,0,[[0,3,4,5],[1,2,4,7],[3,4,5,8],[1,4,7,6]],[[-1,0],[0,0],[-1,0],[0,1]])
  
  shapes.push(square)
  shapes.push(bar)
  shapes.push(cross)
  shapes.push(zed)
  shapes.push(revZed)
  shapes.push(ell)
  shapes.push(revEll)


  function addTetromino(array,shape,orientation) {
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
  hero.classList.add(`${activeShape.name}`)
  startButton.classList.add(`${activeShape.name}`)
  instructions.classList.add(`${nextShape.name}`)

  let arrayStartingPosition
  let shape
  let orientation
  let tetrominoCount = 1

  function dropTetromino() {
    body.classList.add('animate')
    startButton.classList.toggle('hidden')
    stopButton.classList.toggle('hidden')
    scoreboard.classList.toggle('hidden')
    grid.classList.toggle('hidden')
    instructions.classList.toggle('hidden')
    document.addEventListener('keydown', handleKeyUp)
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
        cells.forEach(cell => cell.classList.remove('square','bar','ell','revEll','cross','zed','revZed','set'))
      } else if (tetrominoPosition.some(space => space + gridWidth > cellCount - 1) ) {
        addTetromino(tetrominoPosition,shape,orientation)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        checkScore()
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        hero.classList.remove(`${shapeToBeAdded[0].name}`)
        hero.classList.add(`${shapeToBeAdded[1].name}`)
        orientation = 0
        tetrominoCount++
        if (tetrominoCount % 5 === 0) {
          updateStyling(tetrominoCount,'tetronimonCount')
        }
        tetronimosDropped.forEach(span => {
          span.innerText = tetrominoCount
        })
      } else if (tetrominoPosition.some(space => cells[space + gridWidth].classList.contains('set'))) {
        addTetromino(tetrominoPosition,shape,orientation)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        checkScore()
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        hero.classList.remove(`${shapeToBeAdded[0].name}`)
        hero.classList.add(`${shapeToBeAdded[1].name}`)
        orientation = 0
        tetrominoCount++
        if (tetrominoCount % 5 === 0) {
          updateStyling(tetrominoCount,'tetronimoCount')
        }
        tetronimosDropped.forEach(span => {
          span.innerText = tetrominoCount
        })
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

  let rotationCount = 0 

  function handleKeyUp(event) {
    const key = event.keyCode
    // * 39 is right. 37 is left. 38 is up. 40 is down.
    if (key === 39 && tetrominoPosition.every(cell => cell % gridWidth !== gridWidth - 1) && tetrominoPosition.every(cell => !cells[cell + 1].classList.contains('set')) ) {
      event.preventDefault()
      removeTetromino(tetrominoPosition,shape,orientation)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell += 1
      })
    } else if (key === 37 && tetrominoPosition.every(cell => cell % gridWidth !== 0) && tetrominoPosition.every(cell => !cells[cell - 1].classList.contains('set')) ) {
      event.preventDefault()
      removeTetromino(tetrominoPosition,shape,orientation)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell -= 1
      })
    } else if (key === 38) {
      rotationCount++
      rotations.forEach((rotation => rotation.innerText = rotationCount))
      event.preventDefault()
      removeTetromino(tetrominoPosition,shape,orientation)
      if (orientation < 3){
        orientation = orientation + 1
      } else {
        orientation = 0
      }
      tetrominoPosition = createRotationArray(shape,orientation,tetrominoPosition)
    } else if (key === 40 && tetrominoPosition.every(cell => !(cell + gridWidth > cellCount)) && tetrominoPosition.every(cell => !cells[cell + gridWidth].classList.contains('set'))) {
      event.preventDefault()
      removeTetromino(tetrominoPosition,shape,orientation)
      const nextSpace = tetrominoPosition.map(cell => {
        cell += gridWidth
        return cell
      })
      tetrominoPosition = nextSpace
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition,shape,orientation)
  }

  function createRotationArray(shape,orientation,tetrominoPosition) {
    const shapeArray = []
    const shapeObject = shapes.find(object => {
      return object.name === shape
    })
    const orientationIndex = shapeObject.orientationAxis[orientation]
    let rotationPosition 

    if (orientationIndex[0] >= 0 && orientationIndex[1] <= 0 ) {
      rotationPosition = tetrominoPosition[orientationIndex[0]]
    } else if (orientationIndex[0] < 0 || orientationIndex[1] > 0) {
      rotationPosition = (tetrominoPosition[0] + orientationIndex[0]) - (gridWidth * orientationIndex[1])
    }
    for (let h = 0; h < shapeObject.size; h++) {
      if (h === 0) {
        for (let w = 0;w < shapeObject.size; w++) {
          shapeArray.push(rotationPosition + w)
        }
      } else {
        for (let w = 0;w < shapeObject.size; w++) {
          shapeArray.push(rotationPosition + (gridWidth * h) + w)
        }
      }
    }
    let tilesArray = []
    for (let r = 0; r < shapeObject.tiles[orientation].length; r++) {
      tilesArray.push(shapeArray[shapeObject.tiles[orientation][r]])
    }

    if (tilesArray.some(tile => tile % gridWidth === 0) && tilesArray.some(tile => tile % gridWidth === gridWidth - 1)) {
      const overFitZero = tilesArray.filter(tile => tile % gridWidth === 0).length
      let overFit = tilesArray.filter(tile => tile % gridWidth < 5).length
      if (overFit === overFitZero ) {
        overFit = 1
      } else if (overFit  > 2) {
        overFit = -1
      }
      tilesArray = tilesArray.map(tile => {
        return tile -= overFit
      })
    }

    if (tilesArray.some(tile => cells[tile].classList.contains('set')) || tilesArray.some(tile => tile + gridWidth > cellCount)) {
      tilesArray = tetrominoPosition
    }


    return tilesArray
  }

  // Buttons!


  startButton.addEventListener('click',dropTetromino)
  stopButton.addEventListener('click',stopGrid)

  function stopGrid(){
    if (window.confirm('Are you sure you want to stop the game? All progress will be lost')) {
      grid.classList.add('stop-game')
    }
  }
  // * Scoring  
  scoreSpan.innerText = score

  let scoringRowCount
  let clearedRows = 0

  function checkScore() {
    scoringRowCount = 0
    for (let c = 0; c < cells.length; c++) {
      if (c % gridWidth === 0){
        const row = cells.slice(c, c + gridWidth)
        const clearLine = row.every(cell => cell.classList.contains('set'))
        if (clearLine) {
          for (let i = 0; i < row.length; i++) {
            let clearClassList = row[i].classList
            clearClassList = [].slice.call(clearClassList)
            shapes.forEach(tetShape => {
              if (clearClassList.includes(tetShape.name)) {
                tetShape.clearedCount++
              }
            })
            row[i].classList.remove(tetrominoClass,'set','square','bar','ell','revEll','cross','zed','revZed')
          }
          const rowsToClear = cells.slice(0,c).reverse()
          rowsToClear.forEach(cell => {
            let cellClassList = cell.classList
            cellClassList = [].slice.call(cellClassList)
            const dropCell = Number(cell.id) + gridWidth
            cell.classList.remove(tetrominoClass,'set','square','bar','ell','revEll','cross','zed','revZed')
            for (let c = 0; c < cellClassList.length; c++){
              cells[dropCell].classList.add(cellClassList[c])
            }
          })
          score += 100
          updateStyling(score,'rowsCleared')
          // scoreboard.classList.remove('hidden')
          if (score % 500 === 0) {
            gameSpeed = gameSpeed * .75
            console.log('Game speed', gameSpeed)
          }
          scoringRowCount += 1
          clearedRows++
          rowsCleared.forEach(rowCleared => rowCleared.innerText = clearedRows)
        }
      }
    }
    if (scoringRowCount > 1 && scoringRowCount < 4) {
      score = parseInt(score + ((scoringRowCount / 10) * score))
    } else if (scoringRowCount >= 4) {
      score = parseInt(score + ((scoringRowCount / 5) * score))
      console.log('That\'s a Tetris!')
    }
    scoreSpan.forEach(span => span.innerText = score)
  }
  

  // Styling

  const rgbArray = [255,255,255]
  let rgbRowsArray = []
  function updateStyling(tetrisValue,tetrisValueType) {

    if (tetrisValueType === 'tetronimoCount') {
      const randomRGB = Math.floor(Math.random() * rgbArray.length)
      const rgbFactor = tetrisValue * 5
      if (rgbArray[randomRGB] - rgbFactor > 50) {
        const rbgUpdate = rgbArray[randomRGB] - Math.floor(Math.random() * rgbFactor)
        rgbArray[randomRGB] = rbgUpdate
      } else {
        const rbgUpdate = rgbArray[randomRGB] + Math.floor(Math.random() * rgbFactor)
        rgbArray[randomRGB] = rbgUpdate
      }  
    } else if (tetrisValueType === 'rowsCleared') {
      if (tetrisValue > 2500) {
        tetrisValue = 255 - (tetrisValue / 100)
      } else {
        tetrisValue = 255 - (tetrisValue / 10)
      }
      rgbRowsArray = []
      rgbRowsArray.push(Math.floor(Math.random() * tetrisValue))
      rgbRowsArray.push(Math.floor(Math.random() * tetrisValue))
      rgbRowsArray.push(Math.floor(Math.random() * tetrisValue))
    }
    

    body.style.background = `linear-gradient(${rotationCount + 15}deg,rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}), rgb(255, 255, 255), rgb(${rgbRowsArray[0]}, ${rgbRowsArray[1]}, ${rgbRowsArray[2]}),rgb(255, 255, 255))`
    body.style.backgroundSize = '400% 400%'

  }

}


window.addEventListener('DOMContentLoaded', init)