import React from 'react';
import API_KEY from '../keys/apiKey';
import Loader from './Loader';
import weatherAPI from '../apis/weatherApi';
import WeatherCard from './WeatherCard';

class WeatherList extends React.Component {
    
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
            city: response.data.city.name
        })
        console.log(topFiveResults);
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

    getDateArray = () => {
        let dateArray = [];
        let currentDate = new Date();

        dateArray.push(currentDate);
        
        for(let i = 0; i<4; i++) {
            currentDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
            dateArray.push(currentDate);
        }
        return dateArray;
    }

    renderCards = () => {
        let dateArray = this.getDateArray();
        return dateArray.map((date, index) => {
            return (
            <div className="column" key={this.state.weatherArray[index].dt}>
                <WeatherCard weather={this.state.weatherArray[index]} key={date} date={date} />
            </div>
            
            );
        })

        
    }

    renderHeader = () => {
        return(
            <h3 className="ui center aligned header"> 
                Welcome to {this.state.city}!
            </h3>
        );
    }

    render() {
        if(this.state.weatherArray.length === 0) {
            return <Loader />
        }
        
        return (
        <div className="ui segment">
            {this.renderHeader()}
            <div className="ui five column grid">
                {this.renderCards()}
            </div>

        </div>
        );
    }
}

export default WeatherList;