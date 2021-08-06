import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import ContextProviders from './context-providers';
import CustomTheme from "./theme/custom-theme";
import Info from "./pages/Info";
import Todo from "./pages/Todo";

const client = new ApolloClient({
  uri: 'http://localhost:3001',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={CustomTheme}>
        <ContextProviders>
          <Router>
            <Switch>
              <Route path="/info" exact component={Info} />
              <Route path="/todo" component={Todo} />
              <Redirect to="/todo"></Redirect>
            </Switch>
          </Router>
        </ContextProviders>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
