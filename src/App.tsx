import React from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import FormContainer from './components/FormContainer';

function App() {
  return (
    <AppProvider>
      <Layout>
        <FormContainer />
      </Layout>
    </AppProvider>
  );
}

export default App;