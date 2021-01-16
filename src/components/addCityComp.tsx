import * as React from "react";
import axios from "axios";

import { ICities, CityProperties } from "../models/city";

type Props = {
  saveCity: (city: ICities | any) => void;
  cities: ICities[];
};

export const AddCityComp: React.FC<Props> = ({ saveCity, cities }) => {
  const [name, setName] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");
  const [population, setPopulation] = React.useState<number>(0);
  const [latitude, setLatitude] = React.useState<number>(0);
  const [longitude, setLongitude] = React.useState<number>(0);
  const [error, setError] = React.useState<string>("");

  const handleOnChangeCityData = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === CityProperties.name)
      setName(e.currentTarget.value);
    if (e.currentTarget.id === CityProperties.country)
      setCountry(e.currentTarget.value);
    if (e.currentTarget.id === CityProperties.population)
      setPopulation(+e.currentTarget.value); //Cast string to number
    if (e.currentTarget.id === CityProperties.latitude)
      setLatitude(+e.currentTarget.value);
    if (e.currentTarget.id === CityProperties.longitude)
      setLongitude(+e.currentTarget.value);
  };

  const addNewCity = (e: React.FormEvent) => {
    let newId = getNewId(cities);
    e.preventDefault();
    axios
      .post("http://localhost:8080/cities", {
        id: newId,
        name: name,
        country: country,
        population: population,
        latitude: latitude,
        longitude: longitude,
      })
      .then(() => {
        let auxCity: ICities = {
          id: newId,
          name: name,
          country: country,
          population: population,
          latitude: latitude,
          longitude: longitude,
        };
        saveCity(auxCity);
        setName("");
        setCountry("");
        setPopulation(0);
        setLatitude(0);
        setLongitude(0);
      })
      .catch((err) => {
        const error =
          err.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(error);
      });
  };

  const getNewId = (cities: ICities[]) => {
    let identification: number;
    identification = 0;
    cities.forEach((city) => {
      if (city.id > identification) identification = city.id;
    });
    return identification + 1;
  };

  const buttonAvailable = (
    name: string,
    country: string,
    population: number,
    latitude: number,
    longitude: number
  ) => {
    if (name === "") return false;
    if (country === "") return false;
    if (population === 0) return false;
    if (latitude === 0) return false;
    if (longitude === 0) return false;
    return true;
  };

  return (
    <div className="col-6 mx-auto addCity pt-5 pb-5 pr-5 pl-5">
      <div className="row">
        <div className="col-12">
          <h1 className="col-12 text-center">Añadir ciudad</h1>
        </div>
      </div>
      {error && (
        <div className="row">
          <div className="col-12">
            <p className="text-danger text-center">{"error"}</p>
          </div>
        </div>
      )}
      <form onSubmit={addNewCity} className="Add-city">
        <div className="row justify-content-center">
          <div className="col-12 form-inline mb-3">
            <div className="col-3">
              <label htmlFor="name">Ciudad:</label>{" "}
            </div>
            <div className="col-9">
              <input
                type="text"
                className="w-100"
                id="name"
                value={name}
                placeholder="Ciudad"
                onChange={handleOnChangeCityData}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 form-inline mb-3">
            <div className="col-3">
              <label htmlFor="name">País:</label>
            </div>
            <div className="col-9">
              <input
                type="text"
                className="w-100"
                id="country"
                value={country}
                placeholder="País"
                onChange={handleOnChangeCityData}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 form-inline mb-3">
            <div className="col-3">
              <label htmlFor="name">Población:</label>
            </div>
            <div className="col-9">
              <input
                className="w-100"
                type="number"
                id="population"
                value={population}
                placeholder="Habitantes"
                onChange={handleOnChangeCityData}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 form-inline mb-3">
            <div className="col-3">
              <label htmlFor="name">Latitud:</label>
            </div>
            <div className="col-9">
              <input
                className="w-100"
                type="number"
                id="latitude"
                value={latitude}
                placeholder="Latitud"
                onChange={handleOnChangeCityData}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 form-inline mb-3">
            <div className="col-3">
              <label htmlFor="name">Población:</label>
            </div>
            <div className="col-9">
              <input
                className="w-100"
                type="number"
                id="longitude"
                value={longitude}
                placeholder="Longitud"
                onChange={handleOnChangeCityData}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <button
              className="addCityButton"
              disabled={
                !buttonAvailable(name, country, population, latitude, longitude)
              }
            >
              Add city
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
