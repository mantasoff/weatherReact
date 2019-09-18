import React from 'react';
import images from '../images/images';

class WeatherCard extends React.Component {

    getDayName = dayNumber => { 
        switch(dayNumber) {
            case 1: 
                return 'Monday';
            case 2: 
                return 'Tuesday';
            case 3: 
                return 'Wednesday';
            case 4: 
                return 'Thursday';
            case 5: 
                return 'Friday';
            case 6: 
                return 'Saturday';
            case 0: 
                return 'Sunday';
            default:
                return 'Not a day'
        }
    }

    getImageURL = imageName => {
        switch(imageName) {
            case 'Rain':
                return images.rain;
            case 'Clouds':
                return images.clouds;
            case 'Clear':
                return images.clear;
            default:
                return 'Picture not existant'
        }
    }

    render() {
        return (
        <div className="ui link fluid card">
            <div className="image">
                <img src={this.getImageURL(this.props.weather.weather[0].main)}/>
            </div>
            <div className="content">
                <h4>{this.getDayName(this.props.date.getDay())} {this.props.date.getMonth() + 1}/{this.props.date.getDate()}</h4>
                <div className="description">{Math.round(this.props.weather.main.temp)} °C </div>
            </div>
        </div>
        );
    }
}
//<img src={this.getImageURL(this.props.weather.weather[0].main)}/>
export default WeatherCard;