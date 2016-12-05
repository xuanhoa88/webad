import React, { Component, DOM, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class GoogleMap extends Component {

    // initialize local variables
    constructor(...args) {
        super(...args);
        this.state = {
            map: null,
            markers: [],
            latitude: 0,
            longitude: 0
        };

        // Binding
        this.mapsCallback = this.mapsCallback.bind(this);
    }

    // update geo-encoded markers
    updateMarkers(points) {
        let markers = this.state.markers;
        let map = this.state.map;
        let self = this;
        let latitude;
        let longitude;

        // map may not be loaded when parent component re-renders
        if (map === null) {
            return false;
        }

        // remove everything
        markers.forEach((marker) => {
            marker.setMap(null);
        });

        // add new markers
        this.state.markers = [];
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode( {address: self.props.address}, function(results, status)
        {
            if (status == google.maps.GeocoderStatus.OK)
            {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
            } else {
                latitude = 1.352083;
                longitude = 103.819836;
            }
            markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map,
                title: points[0].label
            }));
        });

        /*
        points.forEach(((point) => {
            markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(point.latitude, point.longitude),
                map: map,
                title: point.label
            }));

        }));
        */

        this.setState({
            markers: markers,
        });
    }

    render() {
        return DOM.div({
            style: {
                width: this.props.width,
                height: this.props.height,
            },
        }, 'Map loading ...');
    }

    componentDidMount() {
        if (!window.__reactGoogleMap) {
            // when the script has loaded, run all the callbacks
            window.__reactGoogleMap = () => this.mapsCallback.apply(this);

            // if this is the first time, load the scripts
            const src = '//maps.googleapis.com/maps/api/js?key=' + this.props.apiKey + '&sensor=' + this.props.sensor + '&callback=__reactGoogleMap';
            const script = document.createElement('script');
            script.setAttribute('src', src);
            document.head.appendChild(script);
        }
    }

    mapsCallback() {
        // scripts already loaded, create map immediately
        let geocoder = new google.maps.Geocoder();
        let self = this;
        geocoder.geocode( {address: self.props.address}, function(results, status)
        {
            let latitude;
            let longitude;
            if (status == google.maps.GeocoderStatus.OK)
            {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
            } else {
                latitude = 1.352083;
                longitude = 103.819836;
            }
            const mapOptions = {
                zoom: self.props.zoom,
                center: new google.maps.LatLng(latitude, longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            const map = new google.maps.Map(ReactDOM.findDOMNode(self), mapOptions);

            self.setState({
                map,
            });

            self.updateMarkers(self.props.points);
        });
    }

    // update markers if needed
    componentWillReceiveProps(props) {
        if (props.points) {
            this.updateMarkers(props.points);
        }
    }
}

GoogleMap.defaultProps = {
    latitude: 0,
    longitude: 0,
    zoom: 4,
    width: 500,
    height: 500,
    points: [],
    apiKey: '',
    sensor: 'false',
};

GoogleMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
  width: PropTypes.any,
  height: PropTypes.any,
  points: PropTypes.array,
  sensor: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default GoogleMap;
