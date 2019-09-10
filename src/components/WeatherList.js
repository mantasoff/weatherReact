import React from 'react';
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
        return dateArray.map(date => {
            return <WeatherCard key={date} date={date} />
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