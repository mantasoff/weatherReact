import React from 'react';
import API_KEY from '../keys/apiKey';
import weatherAPI from '../apis/weatherApi';

class WeatherFrom extends React.Component {

    state = {
        weatherArray: []
    }

    componentDidMount() {
        this.getWeatherFromAPI();
    }
    
    filterArrayByDay = (currentDT, weatherArray) => {
        let currentDate = new Date(currentDT * 1000);
        let filteredArray = weatherArray.filter(weather => {

        })

    }

    getWeatherFromAPI = async () => {
        let response = await weatherAPI.get(`forecast?lat=${this.state.lat}&lon=${this.state.long}&APPID=${API_KEY}&units=metric`);
        
    }

    render() {
        return(
            <div>This is going to be a form</div>
        );
    }
}

export default WeatherFrom;