import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'phone',
    'age',
  ];
  const stringFields = [
    'firstName',
    'lastName',
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  stringFields.forEach(field => {
    if (!/^[a-zA-Z]*$/.test(values[field])) {
      errors[field] = 'Only letters allowed';
    }
  });

  if (
    values.age &&
    !/^\d+$/.test(values.age)
  ) {
    errors.age = 'Only number allowed';
  }
  if (typeof values.gender !== 'boolean') {
    errors.gender = 'Required';
  }
  return errors;
};

const renderTextField = ({
                           input,
                           label,
                           meta: { touched, error },
                           ...custom
                         }) => (
                           <TextField
                             hintText={ label }
                             floatingLabelText={ label }
                             errorText={ touched && error }
                             { ...input }
                             { ...custom }
                           />
);

const renderSelectField = ({
                             input,
                             label,
                             meta: { touched, error },
                             children,
                             ...custom
                           }) => (
                             <SelectField
                               floatingLabelText={ label }
                               errorText={ touched && error }
                               { ...input }
                               onChange={ (event, index, value) => input.onChange(value) }
                               children={ children }
                               { ...custom }
                             />
);

const MyForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className='form' onSubmit={ handleSubmit }>
      <div>
        <Field
          name='firstName'
          component={ renderTextField }
          label='First Name'
        />
      </div>
      <div>
        <Field name='lastName' component={ renderTextField } label='Last Name' />
      </div>
      <div>
        <Field name='phone' component={ renderTextField } label='Phone' />
      </div>
      <div>
        <Field
          name='gender'
          component={ renderSelectField }
          label='Gender'
        >
          <MenuItem value={ false } primaryText='Women' />
          <MenuItem value={ true } primaryText='Men' />
        </Field>
      </div>
      <div>
        <Field name='age' component={ renderTextField } label='Age' />
      </div>
      <div>
        <RaisedButton disabled={ pristine || submitting } type='submit' label='Add' primary={ true } />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'MyForm', // a unique identifier for this form
  validate,
})(MyForm);
