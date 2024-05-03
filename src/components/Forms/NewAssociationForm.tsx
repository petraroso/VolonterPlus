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
    } else {
      axios
        .post("http://localhost:3001/associations", formData)
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
    <>
      <h2>Nova udruga</h2>
      <label>
        Naziv:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Naziv udruge"
          value={formData.name}
          onChange={handleFormData}
        />
      </label>
      <label>
        Adresa:
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Adresa udruge"
          value={formData.address}
          onChange={handleFormData}
        />
      </label>
      <label>
        Grad:
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
      </label>

      <button onClick={sendData}>Spremi ✔️</button>
      {userMessage && (
        <span className="successMessage">
          Zahtjev poslan! Udruga će biti dodana nakon odobrenja!
        </span>
      )}
    </>
  );
}
