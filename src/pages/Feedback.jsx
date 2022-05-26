import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../redux/componentes/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        { Number(assertions) < three
          ? <h3 data-testid="feedback-text">Could be better...</h3>
          : <h3 data-testid="feedback-text">Well Done!</h3>}
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
