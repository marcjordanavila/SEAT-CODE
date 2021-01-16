import * as React from "react";

type Props = {
  searchInput: (city: string) => void;
};

export const SearchCity: React.FC<Props> = ({ searchInput }) => {
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    searchInput(e.currentTarget.value);
  };

  return (
    <div className="col-12 d-flex justify-content-center mb-3">
      <div className="col-4 col-offset-4">
        <input
          type="text"
          className="w-100"
          id="searchName"
          placeholder="Buscar"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};
