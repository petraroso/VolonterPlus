import React from "react";

interface FilterTypes {
  cities: City[];
  cityFilter: string;
  setCityFilter: React.Dispatch<React.SetStateAction<string>>;
  activityFilter: string;
  setActivityFilter: React.Dispatch<React.SetStateAction<string>>;
}
interface City {
  id: number;
  name: string;
}

const VolunteersFilter: React.FC<FilterTypes> = ({
  cities,
  cityFilter,
  setCityFilter,
  activityFilter,
  setActivityFilter,
}) => {
  const handleCityFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
  };

  const handleActivityFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityFilter(e.target.value);
  };

  return (
    <>
      <h3>Filter</h3>
      <label>
        Grad
        <select
          id="cityFilter"
          name="cityFilter"
          value={cityFilter}
          onChange={handleCityFilter}
        >
          <option  value="Svi">
              Svi
            </option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

      <label>
      <input
          type="radio"
          //id="ecology"
          name="activities"
          checked={activityFilter === "Sve"}
          value="Sve"
          onChange={handleActivityFilter}
        ></input>
        Sve
      </label>
      <label>
        <input
          type="radio"
          //id="ecology"
          name="activities"
          checked={activityFilter === "Ekologija"}
          value="Ekologija"
          onChange={handleActivityFilter}
        ></input>
        Ekologija
      </label>
      <label>
        <input
          type="radio"
          //id="byAssociation"
          name="activities"
          checked={activityFilter === "Edukacija"}
          value="Edukacija"
          onChange={handleActivityFilter}
        ></input>
        Edukacija
      </label>
      <label>
        <input
          type="radio"
          //id="notByAssociation"
          name="activities"
          checked={activityFilter === "Prijevoz"}
          value="Prijevoz"
          onChange={handleActivityFilter}
        ></input>
        Prijevoz
      </label>
      <label>
        <input
          type="radio"
          //id="byAssociation"
          name="activities"
          checked={activityFilter === "Razno"}
          value="Razno"
          onChange={handleActivityFilter}
        ></input>
        Razno
      </label>
    </>
  );
};

export default VolunteersFilter;
