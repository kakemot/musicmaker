class Grid {
    constructor(width, height, cellsize) {
      this.width = width;
      this.height = height;
      this.cellsize = cellsize;
    }
  
    draw() {
        stroke("#163026")
      for (let i = 0; i < width / this.cellsize; i++) {
        strokeWeight(i % 16 == 0 ? 4 : (i % 4 == 0) ? 2 : 1)
        line(i * this.cellsize + 64, 0, i*this.cellsize + 64, height)
      }

      for (let i = 0; i < height / this.cellsize; i++) {
        if (i * this.cellsize < YOFFSET)
        continue
        line(0, i * this.cellsize, width, i*this.cellsize)
      }
    }
  }
  