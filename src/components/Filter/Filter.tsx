import React from "react";
import styles from "./style.module.css";

interface FilterTypes {
  cities: City[];
  cityFilter: string;
  setCityFilter: React.Dispatch<React.SetStateAction<string>>;
  activityFilter?: string;
  setActivityFilter?: React.Dispatch<React.SetStateAction<string>>;
}
interface City {
  id: number;
  name: string;
}

const Filter: React.FC<FilterTypes> = ({
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
    if (setActivityFilter) {
      setActivityFilter(e.target.value);
    }
  };

  return (
    <div>
      <h3>Filter</h3>
      <div className={styles.allFilters}>
        <select
          id="cityFilter"
          name="cityFilter"
          value={cityFilter}
          onChange={handleCityFilter}
        >
          <option value="Svi">Svi gradovi</option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {activityFilter && setActivityFilter && (
          <div className={styles.filterActivities}>
            <label>
              <input
                type="radio"
                //id="ecology"
                name="activities"
                checked={activityFilter === "Sve"}
                value="Sve"
                onChange={handleActivityFilter}
              ></input>
              Sve aktivnosti
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
