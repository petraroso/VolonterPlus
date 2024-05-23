import axios from "axios";
import { useState } from "react";
interface City {
  id: Number;
  name: string;
}
export default function NewAssociationForm({
  setUpdateAssociations,
  cities,
}: {
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
}) {
  const initialFormData = {
    name: "",
    address: "",
    city: "Dubrovnik",
    approved: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [userMessage, setUserMessage] = useState(false);

  const handleFormData = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendData = () => {
    if (
      formData.name === "" ||
      formData.address === "" ||
      formData.city === ""
    ) {
      window.alert("Unesite sve podatke.");
      setUserMessage(false);
    } else {
      axios
        .post("https://json-server-volonterplus.onrender.com/associations", formData)
        .then((result) => {
          console.log(result);
          setUpdateAssociations((prev) => !prev);
          setFormData(initialFormData);
          setUserMessage(true);
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="form">
      <h2>Nova udruga</h2>
      <label htmlFor="name">Naziv:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Naziv udruge"
        value={formData.name}
        onChange={handleFormData}
      />

      <label htmlFor="address">Adresa:</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Adresa udruge"
        value={formData.address}
        onChange={handleFormData}
      />

      <label htmlFor="city">Grad:</label>
      <select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleFormData}
        required
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      <button onClick={sendData}>Spremi ✔️</button>
      {userMessage && (
        <span className="successMessage">
          Zahtjev poslan!<br></br>
          Udruga će biti dodana nakon odobrenja!
        </span>
      )}
    </div>
  );
}
