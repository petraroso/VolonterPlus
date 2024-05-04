import axios from "axios";
import { useState } from "react";
import "./Form.css";

interface City {
  id: Number;
  name: string;
}

export default function NewVolunteerForm({
  setUpdateVolunteers,
  cities,
}: {
  setUpdateVolunteers: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
}) {
  const initialFormData = {
    name: "",
    surname: "",
    contact: "",
    city: "Dubrovnik",
    image: "",
    activities: [] as string[],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [displayEmail, setDisplayEmail] = useState("");
  const [displayContactError, setDisplayContactError] = useState(false);

  const handleFormData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      let updatedActivities = [...formData.activities];
      if ((event.target as HTMLInputElement).checked) {
        updatedActivities.push(value);
      } else {
        updatedActivities = updatedActivities.filter(
          (activity) => activity !== value
        );
      }
      setFormData({ ...formData, activities: updatedActivities });
    } else {
      if (name === "contact") {
        setDisplayEmail(value);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (isValidEmail) {
          setFormData({ ...formData, [name]: value });
          setDisplayContactError(false);
        } else {
          setFormData({ ...formData, [name]: "" });
          setDisplayContactError(true);
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const sendData = () => {
    if (
      formData.name === "" ||
      formData.surname === "" ||
      formData.contact === "" ||
      formData.city === "" ||
      formData.image === ""
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      axios
        .post("http://localhost:3001/signedVolunteers", formData)
        .then((result) => {
          console.log(result);
          setUpdateVolunteers((prev) => !prev);
          setFormData(initialFormData);
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="form">
      <h2>Novi volonter</h2>
      <label htmlFor="name">Ime:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Vaše ime"
        value={formData.name}
        onChange={handleFormData}
      />

      <label htmlFor="surname">Prezime:</label>
      <input
        type="text"
        id="surname"
        name="surname"
        placeholder="Vaše prezime"
        value={formData.surname}
        onChange={handleFormData}
      />

      <label htmlFor="contact">Kontakt:</label>
      <input
        type="text"
        id="contact"
        name="contact"
        autoComplete="auto"
        placeholder="Email adresa"
        value={displayEmail}
        onChange={handleFormData}
      ></input>
      {displayContactError && (
        <span className="errorMessage">Unesite ispravan e-mail</span>
      )}

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

      <label htmlFor="image">Slika:</label>
      <input
        type="text"
        id="image"
        name="image"
        placeholder="../jadro.jpg"
        value={formData.image}
        onChange={handleFormData}
      />

      <div className="activity-container">
        <label htmlFor="activities">Aktivnosti:</label>
        <div className="activity-checkboxes">
          <label>
            <input
              type="checkbox"
              name="activities"
              checked={formData.activities.includes("Ekologija")}
              value="Ekologija"
              onChange={handleFormData}
            ></input>
            Ekologija
          </label>
          <label>
            <input
              type="checkbox"
              name="activities"
              value="Edukacija"
              checked={formData.activities.includes("Edukacija")}
              onChange={handleFormData}
            ></input>
            Edukacija
          </label>
          <label>
            <input
              type="checkbox"
              name="activities"
              checked={formData.activities.includes("Prijevoz")}
              value="Prijevoz"
              onChange={handleFormData}
            ></input>
            Prijevoz
          </label>
          <label>
            <input
              type="checkbox"
              name="activities"
              checked={formData.activities.includes("Razno")}
              value="Razno"
              onChange={handleFormData}
            ></input>
            Razno
          </label>
        </div>
      </div>
      <button onClick={sendData}>Dodaj ✔️</button>
    </div>
  );
}
