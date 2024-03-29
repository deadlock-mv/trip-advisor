import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
import {mapStyles} from "../mapStyles";

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    console.log({ weatherData });

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={{ lat: 0, lng: 0 }}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // use any one of the options - 
                // 1-> default ui for map from Google Maps 
                // 2-> lil modified ui from a library which has been put in mapStyles.js 
                // options={''}  
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontsize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }

                    </div>
                ))}
                {weatherData?.weather?.length && (
                    <div
                        className={classes.weatherDataContainer}
                        lat={weatherData.coord.lat}
                        lng={weatherData.coord.lon}
                    >
                            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} height="70px" alt=""/>
                    </div>
                )}
            </GoogleMapReact>
        </div>
    );
}

export default Map;