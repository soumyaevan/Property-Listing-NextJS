"use client";

import { PropertyType } from "@/types";
import { useEffect, useState } from "react";
import { OutputFormat, setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Spinner from "./Spinner";
import pin from "@/assets/images/pin.svg";
import Image from "next/image";
const PropertyMap = ({ property }: { property: PropertyType }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "US",
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    const fetchCords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        if (res.results.length === 0) {
          setGeoCodeError(true);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewPort({
          ...viewPort,
          latitude: lat,
          longitude: lng,
        });
        console.log(lat, lng);
      } catch (error) {
        console.error(error);
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCords();
  }, []);

  if (loading) return <Spinner />;

  if (geoCodeError)
    return <div className="text-3xl"> No location found in the map</div>;

  if (lat === null || lng === null) {
    return <div className="text-3xl">Unable to load map coordinates</div>;
  }
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14,
      }}
      style={{ width: "100%", height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image src={pin} alt="location" width={40} height={40} />
      </Marker>
    </Map>
  );
};

export default PropertyMap;
