import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const mockData = [
  {
    id: 1,
    name: 'rinky dink',
    email: 'dinkydoo@doo.ru',
    phone: '1111-222-3333',
    type: 'personal',
  },
  {
    id: 2,
    name: 'lube. e. Loo',
    email: 'lubee@doo.ru',
    phone: '2222-555-1111',
    type: 'professional',
  },
  {
    id: 3,
    name: 'Tommy Tanker',
    email: 'chugger@shake.io',
    phone: '8888-212-3535',
    type: 'professional',
  },
];

const ContactState = (props) => {
  const initialState = {
    contacts: mockData,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // add contact

  // delete contact

  // update contact

  // set current contact

  // clear current contact

  // filter contacts

  // clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;