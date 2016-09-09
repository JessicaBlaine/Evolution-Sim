
function Board(size, freq) {
  this.tiles = this.generateTiles(size, freq);
}

Board.prototype.generateTiles = function (size, freq) {
  const tiles = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      let isEmpty = !Math.floor(Math.random() + freq);
      let color = isEmpty
        ? {h: 0, s: 0, l: 80}
        : {h: Math.random() * 360, s: 100, l: 50};
      row.push( new Tile(color, isEmpty) );
    }
    tiles.push(row);
  }
  return tiles;
};

Board.prototype.nextGen = function () {
  for (let i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      // debugger;
      const tile = this.tiles[i][j];
      if (tile.isEmpty) {
        let neighbors = [];
        for (let y = -1; y <= 1; y++) {
          if (y + i < 0 || y + i >= this.tiles.length) continue;
          for (let x = -1; x <= 1; x++) {
            if (x + j < 0 || x + j >= this.tiles[i].length) continue;
            neighbors.push(this.tiles[i + y][j + x]);
          }
        }
        let living = neighbors.filter(t => !t.isEmpty && !t.attemptedBirth);
        // console.log(living);
        if (living.length >= 2) {
          // shuffle(living);
          tile.attemptChild(living[0], living[1]);
        }
      }
    }
  }
  this.tiles.forEach(row => row.forEach(t => {
    if (t.attemptedBirth) {
      t.attemptedBirth = false;
    } else {
      t.color.s -= 5;
      t.color.l += 1.5;
      if (t.color.s <= 40) {
        t.color = {h: 0, s: 0, l: 80};
        t.isEmpty = true;
      }
    }
  }));
  // console.log("done");
  return this;
};

function Tile(color, isEmpty) {
  this.color = color;
  this.isEmpty = isEmpty;
  this.attemptedBirth = false;
}

Tile.prototype.attemptChild = function (p1, p2) {
  // debugger;
  const dif = Math.min(
    Math.abs(p1.color.h - p2.color.h),
    Math.abs((p1.color.h + 360) - p2.color.h),
    Math.abs((p1.color.h - 360) - p2.color.h)
  );
  // debugger
  // console.table(this);
  if (Math.random() * 180 > dif) {
    this.isEmpty = false;
    this.color = {h: (p1.color.h + p2.color.h) / 2, s: 100, l: 50};
    // console.table(this);
    // console.log("birthed");
    // debugger;
  }
  [p1, p2].forEach(parent => {
    parent.attemptedBirth = true;
    parent.color.s -= 20;
    parent.color.l += 6;
    if (parent.color.s <= 40) {
      parent.color = {h: 0, s: 0, l: 80};
      parent.isEmpty = true;
    }
  });

};

module.exports = Board;
