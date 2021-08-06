import { useEffect, useRef } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useStyles } from './FormikInputStyles';

/*
  useField() returns
  [formik.getFieldProps(), formik.getFieldMeta()]
  which we can spread on <input>.
  We can use field meta to show error
  message if the field is invalid and
  it has been touched (i.e. visited)
*/

const FormikInput = ({ label, hasRef, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={classes.Form__input__wrap}>
      <label className={classes.Form__label}>{label}</label>
      <input
        id={props.id || props.name}
        className={classes.Form__input}
        ref={hasRef && inputRef}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div>
          {/* className={classes.ErrorStyle}> */}
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

FormikInput.defaultProps = {
  label: 'Label -->',
  type: 'text',
  hasRef: null,
};

FormikInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  hasRef: PropTypes.string,
};

export default FormikInput;
