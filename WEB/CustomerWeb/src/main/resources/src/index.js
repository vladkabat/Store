import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import Page from './containers/Page'

const store = createStore(reducer, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <BrowserRouter>
            <main>
                <Switch>
                    <Route path='/' component={Page}/>
                </Switch>
            </main>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);