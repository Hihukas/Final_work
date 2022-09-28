import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import {Alert} from "@mui/material";

export default () => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC0ppA0ConesN58kwjCjiF4DsxxpH3ezO8"
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{height: '500px', width: '100%', minWidth: '250px'}}
            center={{lat: 55.7033, lng: 21.1443}}
            zoom={13}
        >

            <Marker position={{lat: 55.7033, lng: 21.1443}}/>

        </GoogleMap>
    ) : <Alert severity='error'>Couldn't load map.</Alert>

}

