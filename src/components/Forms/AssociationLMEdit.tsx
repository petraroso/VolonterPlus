import { useState, useEffect } from "react";
import axios from "axios";

interface Association {
  id: number;
  name: string;
  address: string;
  city: string;
  approved: boolean;
}
interface City {
  id: Number;
  name: string;
}
interface ListProps {
  association: Association;
  cities: City[];
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
  setAssociationEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setShowUserMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssociationLMEdit: React.FC<ListProps> = ({
  association,
  cities,
  setUpdateAssociations,
  setAssociationEditId,
  setShowUserMessage,
  setModal,
}) => {
  const [formData, setFormData] = useState<Association>({
    id: 0,
    name: "",
    address: "",
    city: "",
    approved: false,
  });
  const [focused, setFocused] = useState({
    name: false,
    address: false,
  });

  useEffect(() => {
    setFormData(association);
  }, []);

  const handleFormData = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "approved") {
      const boolValue: boolean = value === "true";
      if (boolValue === false)
        setFormData({
          ...formData,
          [name]: boolValue,
        });
      else setFormData({ ...formData, [name]: boolValue });
    } else setFormData({ ...formData, [name]: value });
  };

  const sendData = () => {
    if (
      formData.name.length < 3 ||
      formData.name.length > 30 ||
      formData.address.length < 3 ||
      formData.address.length > 30 ||
      formData.city === ""
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      axios
        .patch(
          `https://json-server-volonterplus.onrender.com/associations/${formData.id}`,
          formData
        )
        .then((result) => {
          console.log(result);
          setUpdateAssociations((prev) => !prev);
          setAssociationEditId(null);
          setShowUserMessage(true);
        })
        .catch((err) => console.log(err.message));
    }
  };

  function handleAbort() {
    setAssociationEditId(null);
    setModal(false);
  }

  const handleFocus = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = event.target;
    setFocused({ ...focused, [name]: true });
  };

  return (
    <div className="form details-form">
      <h3>Uredite: {association.name}</h3>
      <label htmlFor="name">Naziv</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Naziv udruge"
        value={formData.name}
        onChange={handleFormData}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,50}$"
        required={true}
        data-focused={focused.name.toString()}
        onBlur={handleFocus}
      />
      <span className="errorFormMessage">
        Naziv treba biti duljine 3-50 znakova i ne smije sadržavati posebne
        znakove
      </span>

      <label htmlFor="address">Adresa:</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Naziv udruge"
        value={formData.address}
        onChange={handleFormData}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.address.toString()}
        onBlur={handleFocus}
      />
      <span className="errorFormMessage">
        Adresa treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>

      <label htmlFor="city">Grad:</label>
      <select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleFormData}
        required={true}
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      <label>Status odobrenja:</label>
      <select
        id="approved"
        name="approved"
        value={formData.approved.toString()}
        onChange={handleFormData}
        required={true}
      >
        <option key="1" value={"false"}>
          Neodobreno
        </option>
        <option key="2" value={"true"}>
          Odobreno
        </option>
      </select>

      <button onClick={sendData}>Spremi ✔️</button>
      <button onClick={handleAbort}>Odbaci ❌</button>
    </div>
  );
};

export default AssociationLMEdit;
