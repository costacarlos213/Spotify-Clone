import React from 'react'
import {Route, HashRouter} from 'react-router-dom'
import HomePage from './pages/Home'
import LibraryPage from './pages/Library'

export default function Routes() {
    return(
        <HashRouter>
            <Route path="/" exact component={HomePage} />
            <Route path="/library" component={LibraryPage} />
        </HashRouter>
    )
}