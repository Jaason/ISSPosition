/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import MapView from 'react-native-maps';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import issImg from './assets/images/iss.png';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let LATITUDE = 37.78825;
let LONGITUDE = -122.4324;

export default class ISSPos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iss: [],
            title: 'ISS',
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        };

        this.getData = this.getData.bind(this);
    }


    getData() {
        let url = 'https://api.wheretheiss.at/v1/satellites/25544';

        fetch(url).then(response => response.json()).then(function (json) {
            this.setState({iss: json});
        }.bind(this)).then(function () {
            this.setState(
                {
                    region: {
                        latitude: this.state.iss.latitude,
                        longitude: this.state.iss.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                }
            );
            this.getAddress(this.state.iss.latitude, this.state.iss.longitude);
        }.bind(this))

    }

    getAddress(lat, lng) {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`;

        fetch(url).then(response => response.json()
        ).then(function (json) {
            let address = (json.status !== 'OK')
                ? 'n / a'
                : json.results[0].formatted_address;
            this.setState({geo: address});
        }.bind(this))
    }

    componentDidMount() {
        this.getData();
        setInterval(this.getData, 60000);
    }

    onRegionChange(region) {
        this.setState({region});
    }

    render() {

        return (

            <View style={styles.container}>

                <View style={styles.data}>
                    <View style={styles.dataWrapper}>
                        <Text style={styles.title}>Internation Space Station</Text>
                        <Text style={styles.dataText}>Latitude: {this.state.region.latitude}</Text>
                        <Text style={styles.dataText}>Longitude: {this.state.region.longitude}</Text>
                        <Text style={styles.dataText}>Address: {this.state.geo}</Text>
                    </View>
                </View>

                <MapView
                    style={styles.map}
                    initialRegion={this.state.region}
                    region={this.state.region}
                >
                    <MapView.Marker
                        coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
                        image={issImg}
                    />
                </MapView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    title: {
        color: '#365776',
        fontSize: 16,
    },
    data: {
        position: 'absolute',
        zIndex: 5,
        top: '2.5%',
        left: '2.5%',
        backgroundColor: '#F4DDBD',
        width: '95%'
    },
    dataWrapper: {
        padding: 10
    },
    dataText: {
        color: '#000000'
    }
});

AppRegistry.registerComponent('ISSPos', () => ISSPos);
