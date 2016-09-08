const React = require('react');

const Tile = React.createClass({

  render() {
    const color = this.props.color;
    const style = {
      backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`
    };
    return <span className='tile' style={ style }>

    </span>;
  }
});

module.exports = Tile;
