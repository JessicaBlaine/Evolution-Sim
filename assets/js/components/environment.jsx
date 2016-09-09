const React = require('react');

const Tile = require('./tile');
const Board = require('../logic');

const Environment = React.createClass({
  getInitialState: function() {
    return {
      board: new Board(40, 0.5)
    };
  },
  handleClick() {
    // console.table(this.state.board.tiles[0][0]);
    const newBoard = this.state.board.nextGen(); //.bind(this.state.board);
    this.setState({});
    setTimeout(this.handleClick, 100);
  },
  // componentWillUpdate() {
  //   // console.log("will update");
  // },
  render() {
    return <div onClick={ this.handleClick }>
      {
        this.state.board.tiles.map((row, i) => {
          return <span key={ i } className='row'><div>
            {
              row.map((t, j) => <Tile key={ j } color={ t.color }/>)
            }
          </div></span>;
        })
      }
    </div>;
  }
});

module.exports = Environment;
