import * as React from 'react';
const GoogleMapsLoader = require('google-maps');
import { MapProps } from '../interfaces';
import { findDOMNode } from 'react-dom';

GoogleMapsLoader.KEY = 'AIzaSyDLomRtsvzqe2urTOcX2gENa1WpD3Uahj0';
GoogleMapsLoader.LIBRARIES = ['places'];

export default class Map extends React.Component<MapProps, any> {
    map: any = {};
    componentDidMount() {
        this.mapStartingPoint();
    }

    mapStartingPoint() {
        GoogleMapsLoader.load((google: any) => {
            let chiTown = { lat: 41.881832, lng: -87.623177 };
            this.map = new google.maps.Map(findDOMNode(this.refs.map), {
                zoom: 5,
                center: chiTown
            });
        });
    }

    componentWillReceiveProps(props: MapProps) {
        if (props.buttonClicked) {
            if (props.fromAirport.id && props.toAirport.id) {
                let from = {
                    lat: props.fromAirport.lat,
                    lng: props.fromAirport.lon
                };
                let to = {
                    lat: props.toAirport.lat,
                    lng: props.toAirport.lon
                };
                GoogleMapsLoader.load((google: any) => {
                    if (props.buttonClicked) {
                        this.map = new google.maps.Map(findDOMNode(this.refs.map), {
                            zoom: 5,
                            center: from
                        });
                        const fromMarker = new google.maps.Marker({
                            position: from,
                            map: this.map
                        });
                        const toMarker = new google.maps.Marker({
                            position: to,
                            map: this.map
                        });
                        const fromLine = new google.maps.LatLng(props.fromAirport.lat, props.fromAirport.lon);
                        const toLine = new google.maps.LatLng(props.toAirport.lat, props.toAirport.lon);
                        const line = new google.maps.Polyline({
                            path: [fromLine, toLine],
                            geodesic: true,
                            strokeColor: 'blue',
                            strokeOpacity: 1.0,
                            strokeWeight: 10,
                            map: this.map
                        });
                    }
                });
            } else {
                this.mapStartingPoint();
            }
        }
    }

    render() {
        const style = {
            height: '300px',
            width: '100%'
        };
        return (
            <div>
                <div style={style} ref="map" />
            </div>
        );
    }
}