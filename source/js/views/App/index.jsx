import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import PropTypes from 'prop-types';
import * as actions from 'actions/app';
import Table from '../../components/table';
import Form from '../../components/form';

const createHandlers = function (dispatch) {
  const addNote = function (data) {
    dispatch(actions.addNote(data));
    dispatch(reset('MyForm'));
  };

  return {
    addNote,
    // other handlers
  };
};

class App extends Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  render() {
    return (
      <div>
        <Table />
        <Form onSubmit={ this.handlers.addNote } />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(App);
