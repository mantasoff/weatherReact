import React from 'react';
import { Route, Router, Switch } from 'react-router';
import history from '../history';
import WeatherList from './WeatherList';
import WeatherCard from './WeatherCard';

class App extends React.Component {
    render() {
        return ( 
        <div>
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={WeatherList}/>
                    <Route exact path='/weather/:date' component={WeatherCard}/>
                </Switch>
            </Router>
        </div>
        )
    }
}

export default App;