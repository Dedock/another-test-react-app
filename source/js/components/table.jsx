import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeNote, sortNotes } from 'actions/app';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 100,
  },
};


@connect(state => ({
  notes: state.app.get('notes'),
  sortedNotes: state.app.get('sortedNotes'),
}))
export default class MyTable extends Component {
  static propTypes = {
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phone: PropTypes.any,
        gender: PropTypes.bool,
        age: PropTypes.number,
      }).isRequired
    ).isRequired,
    dispatch: PropTypes.func,
  };


  constructor() {
    super();

    this.removeNote = this.removeNote.bind(this);
  }


  state = {
    fixedHeader: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    age: '',
    sortedArray: [],
  };

  gender(value) {
    return value ? 'Men' : 'Women';
  }

  removeNote(index) {
    const { dispatch } = this.props;
    dispatch(removeNote(index));
  }

  handleChange = (event, index, value) => this.setState({ value });

  sortNotesByFirstName = (event, index, value) => {
    const { dispatch } = this.props;

    dispatch(sortNotes('firstName', value));
  }

  sortNotesByLastName = (event, index, value) => {
    const { dispatch } = this.props;

    dispatch(sortNotes('lastName', value));
  }

  sortNotesByPhone = (event, index, value) => {
    const { dispatch } = this.props;

    dispatch(sortNotes('phone', value));
  }

  sortNotesByGender = (event, index, value) => {
    const { dispatch } = this.props;

    dispatch(sortNotes('gender', value));
  }

  sortNotesByAge = (event, index, value) => {
    const { dispatch } = this.props;

    dispatch(sortNotes('age', value));
  }

  componentWillMount() {
    this.setState({
      sortedArray: this.props.notes,
    });
  }

  render() {
    return (
      <div>
        <Table
          fixedHeader={ this.state.fixedHeader }
          selectable={ this.state.selectable }
          multiSelectable={ this.state.multiSelectable }
        >
          <TableHeader
            displaySelectAll={ false }
            adjustForCheckbox={ false }
          >
            <TableRow>
              <TableHeaderColumn>
                <SelectField
                  floatingLabelText='First Name'
                  value={ this.state.firstName }
                  onChange={ this.sortNotesByFirstName }
                  style={ styles.customWidth }
                >
                  <MenuItem value={ 1 } primaryText='↑' />
                  <MenuItem value={ 2 } primaryText='↓' />
                </SelectField>

              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  floatingLabelText='Last Name'
                  value={ this.state.lastName }
                  onChange={ this.sortNotesByLastName }
                  style={ styles.customWidth }
                >
                  <MenuItem value={ 1 } primaryText='↑' />
                  <MenuItem value={ 2 } primaryText='↓' />
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  floatingLabelText='Phone'
                  value={ this.state.phone }
                  onChange={ this.sortNotesByPhone }
                  style={ styles.customWidth }
                >
                  <MenuItem value={ 1 } primaryText='↑' />
                  <MenuItem value={ 2 } primaryText='↓' />
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  floatingLabelText='Gender'
                  value={ this.state.gender }
                  onChange={ this.sortNotesByGender }
                  style={ styles.customWidth }
                >
                  <MenuItem value={ 1 } primaryText='↑' />
                  <MenuItem value={ 2 } primaryText='↓' />
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  floatingLabelText='Age'
                  value={ this.state.age }
                  onChange={ this.sortNotesByAge }
                  style={ styles.customWidth }
                >
                  <MenuItem value={ 1 } primaryText='↑' />
                  <MenuItem value={ 2 } primaryText='↓' />
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                { ' ' }
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={ false }
            deselectOnClickaway={ this.state.deselectOnClickaway }
            showRowHover={ this.state.showRowHover }
            stripedRows={ this.state.stripedRows }
          >
            { this.props.sortedNotes.map((row, index) => (
              <TableRow key={ index }>
                <TableRowColumn>{ row.firstName }</TableRowColumn>
                <TableRowColumn>{ row.lastName }</TableRowColumn>
                <TableRowColumn>{ row.phone }</TableRowColumn>
                <TableRowColumn>{ this.gender(row.gender) }</TableRowColumn>
                <TableRowColumn>{ row.age }</TableRowColumn>
                <TableRowColumn><RaisedButton
                  label='Remove'
                  secondary={ true }
                  onClick={ () => this.removeNote(row) }
                /></TableRowColumn>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </div>
    );
  }
}
