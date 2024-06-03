import axios from "axios";
import { useState, useEffect } from "react";

import { useAdminContext } from "../AdminContext";
import AssociationList from "../components/AssociationList";
import PlusButton from "../components/PlusButton/PlusButton";
import Modal from "../components/Modal/Modal";
import NewAssociationForm from "../components/Forms/NewAssociationForm";
import Loader from "../components/Loader/Loader";

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
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [updateAssociations, setUpdateAssociations] = useState(false);

  useEffect(() => {
    axios
      .get("https://json-server-volonterplus.onrender.com/associations")
      .then((res) => {
        setAssociations(sortAssociations(res.data, sortValue));
      })
      .catch((err) => console.log(err.message));
    axios
      .get("https://json-server-volonterplus.onrender.com/cities")
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

  const handleUserMessage = () => {
    setShowUserMessage(false);
    setOpenNewAssociationForm(!openNewAssociationForm);
  };

  return (
    <div className="page-container">
      {associations.length ? (
        <>
          <div>
            <h3>Sortiranje</h3>
            <select
              id="sort"
              name="sort"
              value={sortValue}
              onChange={handleSort}
            >
              <option value={"name"}>Ime</option>
              <option value={"address"}>Adresa</option>
              <option value={"city"}>Grad</option>
            </select>
          </div>
          <h2 className="table-title">Popis udruga</h2>
          <hr></hr>
          <AssociationList
            associations={associations}
            approved={true}
            setUpdateAssociations={setUpdateAssociations}
            cities={cities}
          />

          {adminData.admin && (
            <>
              <h2 className="table-title">Zahtjevi za odobrenje</h2>
              <hr></hr>
              <AssociationList
                associations={associations}
                approved={false}
                setUpdateAssociations={setUpdateAssociations}
                cities={cities}
              />
            </>
          )}

          <PlusButton openModal={toggleOpenNewAssociationForm} />
          {openNewAssociationForm && showUserMessage ? (
            <Modal
              modal={openNewAssociationForm}
              toggleModal={handleUserMessage}
            >
              <div className="user-message-modal">
                <h3>Nova udruga dodana i čeka odobrenje!</h3>
              </div>
            </Modal>
          ) : (
            openNewAssociationForm && (
              <Modal
                modal={openNewAssociationForm}
                toggleModal={toggleOpenNewAssociationForm}
              >
                <NewAssociationForm
                  setUpdateAssociations={setUpdateAssociations}
                  cities={cities}
                  setShowUserMessage={setShowUserMessage}
                />
              </Modal>
            )
          )}
        </>
      ) : (
        <>
          <h2 className="table-title">Popis udruga</h2>
          <Loader />
        </>
      )}
    </div>
  );
}
