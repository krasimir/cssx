import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: '#2276BF' };
  }
  componentWillMount() {
    this._setBasicStyles(this.state.color);
  }
  render() {
    return <ul>{ this._getItems() }</ul>;
  }
  _getItems() {
    return this.props.items.map((item, i) => {
      return (
        <li key={ i }>
          <a className='btn' onClick={ this._handleClick.bind(this, i) }>
            { item }
          </a>
        </li>
      )
    })
  }
  _handleClick(index) {
    cssx('selected').clear();
      // .clear()
      // .add('li:nth-child(' + (index + 1) + ')', cssx({
      //   padding-left: 2em;
      // }));
  }
  _setBasicStyles(color) {
    cssx(
      li {
        padding-left: 0;
        (w)transition: padding-left 300ms ease;
      }
      .btn {
        display: block;
        cursor: pointer;
        padding: 0.6em 1em;
        border-bottom: solid 2px `color`;
        border-radius: 6px;        
        background-color: `shadeColor(color, 0.5)`;
        (w)transition: background-color 400ms ease;
      }
      .btn:hover {
        background-color: `shadeColor(color, 0.2)`;
      }
    ) 
  }
}

function shadeColor(color, percent) {   
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

export default Component;
