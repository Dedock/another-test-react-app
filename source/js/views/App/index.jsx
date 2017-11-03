import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import PropTypes from 'prop-types';
import * as actions from 'actions/app';
import Table from '../../components/table';
import Form from '../../components/form';

@connect(() => ({}))
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
  }
  addNote(data) {
    const { dispatch } = this.props;

    dispatch(actions.addNote(data));
    dispatch(reset('MyForm'));
  }
  render() {
    return (
      <div>
        <Table />
        <Form onSubmit={ this.addNote } />
      </div>
    );
  }
}
