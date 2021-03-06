import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { MdAdd, MdRemove } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
import { addContact } from '../../redux/contacts/contacts-operations';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import InputBox from '../InputBox/InputBox';
import styles from './Form.module.css';

const initialState = { name: '', number: '', showAddForm: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'initial':
      return { ...state, name: '', number: '' };

    case 'showAddForm':
      return { ...state, showAddForm: !state.showAddForm };

    default:
      return { ...state, [action.type]: action.payload };
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const items = useSelector(getContacts);
  const authDispatch = useDispatch();

  const onInputChange = ({ target: { name, value } }) => {
    return dispatch({ type: name, payload: value });
  };

  const contactsChecker = name => {
    return items?.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { name, number } = state;

    const newContact = { name, number };

    contactsChecker(name)
      ? toast(`${name} is already in contacts`)
      : authDispatch(addContact(newContact));

    dispatch({
      type: 'initial',
    });
  };

  const onAddFormShow = () => dispatch({ type: 'showAddForm' });

  return (
    <div className={styles.Form__wrap}>
      <div className={styles.Wrapper__box}>
        <h3 className={styles.Form__title}>Add Contact</h3>
        <IconContext.Provider
          value={{
            color: 'inherit',
            size: '1.2rem',
            className: 'global-class-name',
          }}
        >
          <button className={styles.Add__btn} onClick={onAddFormShow}>
            {state.showAddForm ? <MdRemove /> : <MdAdd />}
          </button>
        </IconContext.Provider>
      </div>
      {state.showAddForm && (
        <form className={styles.Form} onSubmit={handleSubmit}>
          <InputBox
            labelText={'Name'}
            htmlFor={'name'}
            type={'text'}
            id={'name'}
            name={'name'}
            title={
              "?????? ?????????? ???????????????? ???????????? ???? ????????, ??????????????????, ???????? ?? ????????????????. ???????????????? Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan ?? ??. ??."
            }
            pattern={'text'}
            placeholder={'Name'}
            required={true}
            value={state.name}
            onChange={onInputChange}
          />

          <InputBox
            labelText={'Phone number'}
            htmlFor={'tel'}
            type={'tel'}
            id={'tel'}
            name={'number'}
            title={
              '?????????? ???????????????? ???????????? ???????????????? ???? 11-12 ???????? ?? ?????????? ?????????????????? ??????????, ??????????, ?????????????? ???????????? ?? ?????????? ???????????????????? ?? +'
            }
            pattern={'phone'}
            placeholder={'Phone Number'}
            required={true}
            value={state.number}
            onChange={onInputChange}
          />
          <button className={styles.Form__btn} type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
