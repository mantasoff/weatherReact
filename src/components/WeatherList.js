import React from 'react';
import API_KEY from '../keys/apiKey';
import Loader from './Loader';
import weatherAPI from '../apis/weatherApi';
import WeatherCard from './WeatherCard';

class WeatherList extends React.Component {
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
            <div className="column" key={this.props.weatherArray[index].dt}>
                <WeatherCard weather={this.props.weatherArray[index]} key={date} date={date} />
            </div>
            
            );
        })

        
    }

    renderHeader = () => {
        return(
            <h3 className="ui center aligned header"> 
                Welcome to {this.props.city}!
            </h3>
        );
    }

    render() {
        if(this.props.weatherArray.length === 0) {
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