import React from 'react';

class Component extends React.Component {
  render() {
    cssx(
      .form {
        margin: 0;
        padding: 0;
      }
    );
    return (
      <h1>Hello world</h1>
    )
  }
}

export default Component;
