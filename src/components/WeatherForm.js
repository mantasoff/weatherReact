import React from 'react';
import history from '../history'
import API_KEY from '../keys/apiKey';
import weatherAPI from '../apis/weatherApi';

class WeatherFrom extends React.Component {

    state = {
        weatherArray: [],
        selectedWeather: {},
        maxTemp: 0,
        minTemp: 0,
        weather: ''
    }

    componentDidMount() {
        if(!this.props.fullWeatherArray) {
            history.push('/');
            return;
        }

        let weatherArray = this.filterArrayByDay(this.props.match.params.dt,this.props.fullWeatherArray);
        let selectedWeather = this.getDateFromArray(this.props.match.params.dt);
        let maxTemp = this.getMaxTemperature(weatherArray);
        let minTemp = this.getMinTemperature(weatherArray);
        let weather = this.getAverageWeather(weatherArray);
        


        //Delete console log after development
        this.setState({
            weatherArray,
            selectedWeather,
            maxTemp,
            minTemp,
            weather
        }, () => console.log(this.state))
    }
    
    filterArrayByDay = (currentDT, weatherArray) => {
        let currentDate = new Date(currentDT * 1000);
        let checkDate;
        let filteredArray = weatherArray.filter(weather => {
            checkDate = new Date(weather.dt * 1000);
            if(checkDate.getUTCDay() === currentDate.getUTCDay()) {
                return true;
            } else {
                return false;
            }
        });
        return filteredArray;
    }

    getDateFromArray = selectedDT => {
        let selectedDTArray =  this.props.fullWeatherArray.filter(weather => {
            if(selectedDT == weather.dt) return true;
            return false;
        });

        return selectedDTArray[0];
    }

    getMaxTemperature = weatherArray => {
        let maxTemp = weatherArray[0].main.temp_max;
        weatherArray.forEach(weather => {
            if(maxTemp < weather.main.temp_max) maxTemp = weather.main.temp_max;
        });

        return maxTemp;
    }

    getMinTemperature = weatherArray => {
        let minTemp = weatherArray[0].main.temp_min;
        weatherArray.forEach(weather => {
            if(minTemp > weather.main.temp_min) minTemp = weather.main.temp_min;
        });

        return minTemp;
    }

    getAverageWeather = weatherArray => {
        let precipationArray = [];
        let precipationCount = []

        weatherArray.forEach((weather,index) => {
            if(precipationArray.includes(weather.weather[0].main)) {
                precipationCount[precipationArray.indexOf(weather.weather[0].main)] = precipationCount[precipationArray.indexOf(weather.weather[0].main)] + 1;
            } else {
                precipationArray.push(weather.weather[0].main);
                precipationCount.push(1);
            }
        })

        console.log(precipationCount);

        let precipationAverage = '';
        let precipationAverageCount = -1;

        precipationArray.forEach((precipation,index) => {
            if(precipationAverageCount < precipationCount[index]) {
                precipationAverageCount = precipationCount[index];
                precipationAverage = precipation;
            }
        })

        return precipationAverage;
    }

    getFormattedDate = unformatedDt => {
        let dateForFormatting = new Date(unformatedDt * 1000);
        
        return `${dateForFormatting.getFullYear()}/${dateForFormatting.getMonth() + 1}/${dateForFormatting.getUTCDate()}`;
    }

    render() {
        return(
            <div className="ui segment">
                <div className="ui two statistics">
                    <div className="statistic">
                        <div className="value">
                            {this.props.city}
                        </div>
                        <div className="label">
                            City
                        </div>
                    </div>
                    <div className="statistic">
                        <div className="value">
                            {this.getFormattedDate(this.props.match.params.dt)}
                        </div>
                        <div className="label">
                            Date
                        </div>
                    </div>
                </div>
                <br/>
                <div className="ui three statistics">
                    <div className="statistic">
                        <div className="value">
                            {Math.round(this.state.maxTemp)}
                        </div>
                        <div className="label">
                            Top Temperature
                        </div>
                    </div>
                    <div className="statistic">
                        <div className="value">
                            {Math.round(this.state.minTemp)}
                        </div>
                        <div className="label">
                            Lowest Temperature
                        </div>
                    </div>
                    <div className="statistic">
                        <div className="value">
                            {this.state.weather}
                        </div>
                        <div className="label">
                            Probable Weather
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherFrom;