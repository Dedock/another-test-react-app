import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
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
    'phone',
    'age',
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  stringFields.forEach(field => {
    if (!values[field] && !'Z[\\s\\S]*?Z'.test(values[field])) {
      errors[field] = 'Only letters allowed';
    }
  });

  if (
    values.phone &&
    !/^\d+$/.test(values.phone)
  ) {
    errors.phone = 'Only number allowed';
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
    <form onSubmit={ handleSubmit }>
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
        <button type='submit' disabled={ pristine || submitting }>
          Submit
        </button>
        <button type='button' disabled={ pristine || submitting } onClick={ reset }>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'MyForm', // a unique identifier for this form
  validate,
})(MyForm);
