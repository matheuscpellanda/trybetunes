import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <div className="row">
          <p>Ops!</p>
          <p>A página que você está procurando não foi encontrada.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
