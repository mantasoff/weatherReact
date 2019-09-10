import React from 'react';

class WeatherCard extends React.Component {

    getDayName = dayNumber => { 
        console.log(dayNumber)
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

    render() {
        return (
        <div className="card">

            <div className="content">
                <div className="header">{this.getDayName(this.props.date.getDay())} {this.props.date.getMonth() + 1}/{this.props.date.getDate()}</div>
            </div>
        </div>
        );
    }
}

export default WeatherCard;