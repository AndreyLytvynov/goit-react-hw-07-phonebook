import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Box } from './Box';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contactsSlice/operation';

import { Oval } from 'react-loader-spinner';

const App = () => {
  const contactsFromStore = useSelector(state => state.contacts.contacts.items);
  const isLoading = useSelector(state => state.contacts.contacts.isLoading);
  const filterFromStore = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilterContacts = () => {
    return contactsFromStore.filter(el =>
      el.name.toLowerCase().includes(filterFromStore.toLowerCase())
    );
  };

  return (
    <Box
      p="20px"
      ml="auto"
      mr="auto"
      mt="30px"
      width="500px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14),
     0px 2px 1px rgba(0, 0, 0, 0.2)"
    >
      <Box>
        <h2>Phonebook</h2>
        <ContactForm />
      </Box>
      <Box mt="20px">
        <Box display="flex" alignItems="center">
          <h2>Contacts:</h2>
          {isLoading && <Oval wrapperClass="loader" height={20} width={20} />}
        </Box>

        {contactsFromStore.length > 1 && <Filter />}
        <ContactList
          contacts={contactsFromStore}
          filterContacts={getFilterContacts()}
        />
      </Box>
    </Box>
  );
};

export default App;
