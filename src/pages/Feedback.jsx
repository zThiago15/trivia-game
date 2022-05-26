import React from 'react';
import Header from '../redux/componentes/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        <Header />
      </div>
    );
  }
}

export default Feedback;
