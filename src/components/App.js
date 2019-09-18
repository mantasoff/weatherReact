import React from 'react';
import { Route, Router, Switch } from 'react-router';
import history from '../history';
import WeatherList from './WeatherList';
import WeatherCard from './WeatherCard';

class App extends React.Component {
    render() {
        return ( 
        <div className="ui container">
            <h2 className="ui center aligned icon header">
                <i className="circular umbrella icon"></i>
                BiWeather
            </h2>
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