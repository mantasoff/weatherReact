import React from 'react';
import { getImageURL } from '../images/images'

class HourWeatherCard extends React.Component {
    render() {
        return(
            <div className="centered card">
                <div className="image">
                    <img alt={this.props.weatherURL} src={getImageURL(this.props.weatherURL)}/>
                </div>
                <div className="extra">
                    <span className="right floated">{`${Math.round(this.props.temperature)} °C`}</span>
                    {`${this.props.time}:00`}
                </div>
            </div>
        );
    }
}

export default HourWeatherCard;