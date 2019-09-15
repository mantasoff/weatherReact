import React from 'react';
import API_KEY from '../keys/apiKey';
import weatherAPI from '../apis/weatherApi';
import WeatherCard from './WeatherCard';

class WeatherList extends React.Component {
    
    state = {
        lat: 0,
        long: 0,
        weatherArray: []
    }

    getTopFiveResults = weatherArray => {
        let lastWeatherDate;
        let topFiveArray = [];
        let largestTemperatureWeather = weatherArray[0];


        weatherArray.map(weather => { 
            let weatherDate = new Date(weather.dt * 1000);
            if(!lastWeatherDate) lastWeatherDate = weatherDate;
            console.log(weather);
            console.log(weatherDate.getUTCDate());
            if(weatherDate.getUTCDate() === lastWeatherDate.getUTCDate()) { 
                console.log('Toks pat');
                if(largestTemperatureWeather.main.temp < weather.main.temp) {
                    largestTemperatureWeather = weather;
                };
            } else {
                console.log('Deda i array')
                topFiveArray.push(largestTemperatureWeather);
                largestTemperatureWeather = weather;
            };

            lastWeatherDate = weatherDate;
        });
        

        console.log(topFiveArray)

        return topFiveArray;
    }

    componentDidMount() {
        this.getUserLocation();
    }

    getWeatherArray = async () => {
        let response = await weatherAPI.get(`forecast?lat=${this.state.lat}&lon=${this.state.long}&APPID=${API_KEY}&units=metric`);
        let topFiveResults = this.getTopFiveResults(response.data.list);
        this.setState({
            weatherArray: topFiveResults
        },() => console.log(this.state))
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
        if(this.state.weatherArray.length === 0) {
            return <div>Loading!</div>
        }
        
        let dateArray = this.getDateArray();
        return dateArray.map((date, index) => {
            return <WeatherCard weather={this.state.weatherArray[index]} key={date} date={date} />
        })

        
    }

    render() {
        return (
        <div className="ui container">
            <div className="ui link cards">
                {this.renderCards()}
            </div>
        </div>
        );
    }
}

export default WeatherList;