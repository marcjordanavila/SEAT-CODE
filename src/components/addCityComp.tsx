import * as React from "react";

type Props = {
  saveCity: (city: ICities | any) => void;
};

export const AddCityComp: React.FC<Props> = ({ saveCity }) => {
  const [city, setCity] = React.useState<ICities | {}>();

  const handleCityData = (e: React.FormEvent<HTMLInputElement>) => {
    setCity({
      ...city,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const addNewCity = (e: React.FormEvent) => {
    e.preventDefault();
    saveCity(city);
  };

  return (
    <form onSubmit={addNewCity} className="Add-city">
      <input
        type="text"
        id="name"
        placeholder="Ciudad"
        onChange={handleCityData}
      />
      <input
        type="text"
        id="country"
        placeholder="País"
        onChange={handleCityData}
      />
      <input
        type="number"
        id="population"
        placeholder="Habitantes"
        onChange={handleCityData}
      />
      <input
        type="number"
        id="latitude"
        placeholder="Latitud"
        onChange={handleCityData}
      />
      <input
        type="number"
        id="longitude"
        placeholder="Longitud"
        onChange={handleCityData}
      />
      <button disabled={city === undefined ? true : false}>Add city</button>
    </form>
  );
};
