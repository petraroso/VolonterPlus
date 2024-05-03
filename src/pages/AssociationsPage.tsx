import axios from "axios";
import { useState, useEffect } from "react";

import { useAdminContext } from "../AdminContext";
import AssociationList from "../components/AssociationList";
import PlusButton from "../components/PlusButton/PlusButton";
import Modal from "../components/Modal/Modal";
import NewAssociationForm from "../components/Forms/NewAssociationForm";

interface Association {
  id: number;
  name: string;
  address: string;
  city: string;
  approved: boolean;
}
interface City {
  id: number;
  name: string;
}

export default function AssociationsPage() {
  const adminData = useAdminContext();
  const [associations, setAssociations] = useState<Association[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [sortValue, setSortValue] = useState("name");
  const [openNewAssociationForm, setOpenNewAssociationForm] = useState(false);
  const [updateAssociations, setUpdateAssociations] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/associations")
      .then((res) => {
        setAssociations(sortAssociations(res.data, "name"));
      })
      .catch((err) => console.log(err.message));
    axios
      .get("http://localhost:3001/cities")
      .then((res) => {
        setCities(sortCitiesAscending(res.data));
      })
      .catch((err) => console.log(err.message));
  }, [updateAssociations]);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortValue(() => value);
    setAssociations(sortAssociations([...associations], value));
  };

  function sortAssociations(
    associations: Association[],
    sortBy: string
  ): Association[] {
    return associations.slice().sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        case "address":
          return a.address.toLowerCase().localeCompare(b.address.toLowerCase());
        case "city":
          return a.city.toLowerCase().localeCompare(b.city.toLowerCase());
        default:
          return 0;
      }
    });
  }
  function sortCitiesAscending(cities: City[]): City[] {
    return cities.slice().sort((a, b) => {
      const cityA = a.name.toLowerCase();
      const cityB = b.name.toLowerCase();
      if (cityA < cityB) return -1;
      if (cityA > cityB) return 1;
      return 0;
    });
  }

  const toggleOpenNewAssociationForm = () => {
    setOpenNewAssociationForm(!openNewAssociationForm);
  };

  return (
    <>
      <div>
        <label>
          Sortirajte po:
          <select id="sort" name="sort" value={sortValue} onChange={handleSort}>
            <option value={"name"}>Ime</option>
            <option value={"address"}>Adresa</option>
            <option value={"city"}>Grad</option>
          </select>
        </label>
      </div>
      <h2>Popis udruga:</h2>
      <hr></hr>
      <AssociationList
        associations={associations}
        approved={true}
        setUpdateAssociations={setUpdateAssociations}
      />

      {adminData.admin && (
        <>
          <h2>Zahtjevi za odobrenje:</h2>
          <hr></hr>
          <AssociationList
            associations={associations}
            approved={false}
            setUpdateAssociations={setUpdateAssociations}
          />
        </>
      )}

      <PlusButton openModal={toggleOpenNewAssociationForm} />
      {openNewAssociationForm && (
        <Modal
          modal={openNewAssociationForm}
          toggleModal={toggleOpenNewAssociationForm}
        >
          <NewAssociationForm
            setUpdateAssociations={setUpdateAssociations}
            cities={cities}
          />
        </Modal>
      )}
    </>
  );
}
