import React from 'react';
import { Route, Router, Switch } from 'react-router';
import history from '../history';
import API_KEY from '../keys/apiKey';
import weatherAPI from '../apis/weatherApi';
import WeatherList from './WeatherList';
import WeatherForm from './WeatherForm';

class App extends React.Component {
    state = {
        lat: 0,
        long: 0,
        weatherArray: [],
        city: '',
        fullWeatherArray:[]
    }
    

    state = {
        lat: 0,
        long: 0,
        weatherArray: [],
        city: ''
    }

    getTopFiveResults = weatherArray => {
        let lastWeatherDate;
        let topFiveArray = [];
        let largestTemperatureWeather = weatherArray[0];
        weatherArray.map(weather => { 
            let weatherDate = new Date(weather.dt * 1000);
            if(!lastWeatherDate) lastWeatherDate = weatherDate;
            if(weatherDate.getUTCDate() === lastWeatherDate.getUTCDate()) { 
                if(largestTemperatureWeather.main.temp < weather.main.temp) {
                    largestTemperatureWeather = weather;
                };
            } else {
                topFiveArray.push(largestTemperatureWeather);
                largestTemperatureWeather = weather;
            };

            lastWeatherDate = weatherDate;
            return;
        });

        return topFiveArray;
    }

    componentDidMount() {
        this.getUserLocation();
    }

    getWeatherArray = async () => {
        let response = await weatherAPI.get(`forecast?lat=${this.state.lat}&lon=${this.state.long}&APPID=${API_KEY}&units=metric`);
        let topFiveResults = this.getTopFiveResults(response.data.list);
        this.setState({
            weatherArray: topFiveResults,
            city: response.data.city.name,
            fullWeatherArray: response.data.list
        })
    }

    getUserLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(( { coords }) => {
                this.setState({
                    lat: coords.latitude,
                    long: coords.longitude
                },() => {
                    this.getWeatherArray();
                });
            })
        } else {
            console.log('Geolocation functionality is not enabled in your browser!');
        }
        return;
    }


    render() {
        return ( 
        <div className="ui container">
            <h2 onClick={() => history.push('/')} className="ui center aligned icon header">
                <i className="circular umbrella icon"></i>
                BiWeather
            </h2>
            <Router history={history}>
                <Switch>
                    <Route exact path='/' render={ props => <WeatherList {...props} weatherArray={this.state.weatherArray} city={this.state.city} />}/>
                    <Route exact path='/weather/:dt' render={props => <WeatherForm {...props} city={this.state.city} fullWeatherArray={this.state.fullWeatherArray} />}/>
                </Switch>
            </Router>
        </div>
        )
    }
}

export default App;