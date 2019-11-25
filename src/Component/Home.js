import React, { Component } from 'react';
import MainPage from './MainPage';
import SampleMap from '../Component/googleMaps';

class Home extends Component {
    render() {
        return (
            <div>
                <MainPage />
                <SampleMap
                    google={this.props.google}
                    center={{ lat: 18.5204, lng: 73.8567 }}
                    height='97vh'
                    zoom={15}
                />
            </div>
        );
    }
}

export default Home;