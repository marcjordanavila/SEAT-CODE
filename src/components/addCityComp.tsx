import * as React from "react";
import axios from "axios";

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
  const [error, setError]: [string, (error: string) => void] = React.useState(
    ""
  );
  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const handleOnChangeCityData = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "name") setName(e.currentTarget.value);
    if (e.currentTarget.id === "country") setCountry(e.currentTarget.value);
    if (e.currentTarget.id === "population")
      setPopulation(+e.currentTarget.value); //Cast string to number
    if (e.currentTarget.id === "latitude") setLatitude(+e.currentTarget.value);
    if (e.currentTarget.id === "longitude")
      setLongitude(+e.currentTarget.value);
  };

  const addNewCity = (e: React.FormEvent) => {
    let newId = getNewId(cities);
    console.log(cities);
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
        setError(err);
        setLoading(false);
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
    <>
      {/*error && <p className="error">{error}</p>*/}
      <form onSubmit={addNewCity} className="Add-city">
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Ciudad"
          onChange={handleOnChangeCityData}
        />
        <input
          type="text"
          id="country"
          value={country}
          placeholder="País"
          onChange={handleOnChangeCityData}
        />
        <input
          type="number"
          id="population"
          value={population}
          placeholder="Habitantes"
          onChange={handleOnChangeCityData}
        />
        <input
          type="number"
          id="latitude"
          value={latitude}
          placeholder="Latitud"
          onChange={handleOnChangeCityData}
        />
        <input
          type="number"
          id="longitude"
          value={longitude}
          placeholder="Longitud"
          onChange={handleOnChangeCityData}
        />
        <button
          disabled={
            !buttonAvailable(name, country, population, latitude, longitude)
          }
        >
          Add city
        </button>
      </form>
    </>
  );
};
