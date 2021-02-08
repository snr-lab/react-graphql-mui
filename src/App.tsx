import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import CustomTheme from "./theme/custom-theme";
import Info from "./components/Info";
import Todo from "./components/Todo";

function App() {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={CustomTheme}>
        <Router>
          <Switch>
            <Route path="/info" exact component={Info} />
            <Route path="/todo" component={Todo} />
            <Redirect to="/todo"></Redirect>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
