import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class MyTable extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '300px',
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  gender(value) {
    return value ? 'Men' : 'Women';
  }

  render() {
    return (
      <div>
        <Table
          height={ this.state.height }
          fixedHeader={ this.state.fixedHeader }
          fixedFooter={ this.state.fixedFooter }
          selectable={ this.state.selectable }
          multiSelectable={ this.state.multiSelectable }
        >
          <TableHeader
            displaySelectAll={ false }
            adjustForCheckbox={ false }
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
              <TableHeaderColumn>Gender</TableHeaderColumn>
              <TableHeaderColumn>Age</TableHeaderColumn>
              <TableHeaderColumn>Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={ false }
            deselectOnClickaway={ this.state.deselectOnClickaway }
            showRowHover={ this.state.showRowHover }
            stripedRows={ this.state.stripedRows }
          >
            { this.props.app.notes.map((row, index) => (
              <TableRow key={ index }>
                <TableRowColumn>{ index }</TableRowColumn>
                <TableRowColumn>{ row.firstName }</TableRowColumn>
                <TableRowColumn>{ row.lastName }</TableRowColumn>
                <TableRowColumn>{ row.phone }</TableRowColumn>
                <TableRowColumn>{ this.gender(row.gender) }</TableRowColumn>
                <TableRowColumn>{ row.age }</TableRowColumn>
                <TableRowColumn>X</TableRowColumn>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </div>
    );
  }
}

MyTable.propTypes = {
  app: PropTypes.shape({
    notes: PropTypes.arrayOf({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.number,
      gender: PropTypes.bool,
      age: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(MyTable);
