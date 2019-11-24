import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './redux/store';

import SelectionPage from './selectionPage/selection';
import ConfirmationScreen from './resultPage/confirmation';
import ErrorPage from './resultPage/error';
import NotFound from './resultPage/notFound';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Router>
                <header className="App-header">
                    <div className="row">
                        <div className="col-xs-12">
                            Find Falcone
                        </div>
                    </div>
                </header>
    
                <main className="App">
                    <Route exact path="/" component={SelectionPage} />
                    <Route path="/notFound" component={NotFound} />
                    <Route path="/found" component={ConfirmationScreen} />
                    <Route path="/error" component={ErrorPage} />
                </main>
                
            </Router>
            </Provider>
        );
    }

}

export default App;
