const React = require('react');

const Tile = require('./tile');

const Environment = React.createClass({
  getInitialState: function() {
    return {
      tiles: this.generateTiles(50, 0.5)
    };
  },
  generateTiles(size, freq) {
    const tiles = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        let isEmpty = !Math.floor(Math.random() + freq);
        let color = isEmpty
          ? {h: 0, s: 0, l: 80}
          : {h: Math.random() * 360, s: 100, l: 50};
        row.push(<Tile color={ color }/>);
      }
      tiles.push(row);
    }
    return tiles;
  },
  render() {
    return <div>
      {
        this.state.tiles.map(row => {
          return <span className='row'><div>{ row }</div></span>;
        })
      }
    </div>;
  }
});

module.exports = Environment;
