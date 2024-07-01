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
  setShowUserMessage,
}: {
  setUpdateVolunteers: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
  setShowUserMessage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialFormData = {
    name: "",
    surname: "",
    contact: "",
    city: "",
    image: "",
    activities: [] as string[],
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [displayEmail, setDisplayEmail] = useState("");
  //const [displayContactError, setDisplayContactError] = useState(false);
  const [focused, setFocused] = useState({
    name: false,
    surname: false,
    contact: false,
    city: false,
    image: false,
  });

  const handleFormData = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
          //setDisplayContactError(false);
        } else {
          setFormData({ ...formData, [name]: "" });
          //setDisplayContactError(true);
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const sendData = () => {
    if (
      formData.name.length > 3 ||
      formData.name.length > 30 ||
      formData.surname.length > 3 ||
      formData.surname.length < 30 ||
      formData.contact === "" ||
      formData.city === "" ||
      formData.image === "" ||
      formData.description.length > 300
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      axios
        .post(
          "https://json-server-volonterplus.onrender.com/signedVolunteers",
          formData
        )
        .then((result) => {
          console.log(result);
          setUpdateVolunteers((prev) => !prev);
          setFormData(initialFormData);
          setShowUserMessage(true);
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleFocus = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = event.target;
    setFocused({ ...focused, [name]: true });
  };

  return (
    <div className="form">
      <h2>Novi volonter</h2>
      <label htmlFor="name">Ime:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Ime"
        value={formData.name}
        onChange={handleFormData}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.name.toString()}
        onBlur={handleFocus}
      />
      <span className="errorFormMessage">
        Ime treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>

      <label htmlFor="surname">Prezime:</label>
      <input
        type="text"
        id="surname"
        name="surname"
        placeholder="Prezime"
        value={formData.surname}
        onChange={handleFormData}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.surname.toString()}
        onBlur={handleFocus}
      />
      <span className="errorFormMessage">
        Prezime treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>

      <label htmlFor="contact">Kontakt:</label>
      <input
        type="email"
        id="contact"
        name="contact"
        autoComplete="email"
        placeholder="Email adresa"
        value={displayEmail}
        onChange={handleFormData}
        required={true}
        data-focused={focused.contact.toString()}
        onBlur={handleFocus}
      ></input>
      <span className="errorFormMessage">Unesite ispravnu email adresu</span>

      <label htmlFor="city">Grad:</label>
      <select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleFormData}
        required={true}
        data-focused={focused.city.toString()}
        onBlur={handleFocus}
      >
        <option key="none" value="">
          - Odaberite -
        </option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <span className="errorFormMessage">Odaberite grad</span>


      <label htmlFor="image">Slika:</label>
      <input
        type="text"
        id="image"
        name="image"
        placeholder="../jadro.jpg"
        value={formData.image}
        onChange={handleFormData}
        required={true}
        data-focused={focused.image.toString()}
        onBlur={handleFocus}
      />
      <span className="errorFormMessage">Unesite put do slike</span>

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
      <label htmlFor="description">Opis:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Opis volontera - opcionalan (max 300 znakova)"
        maxLength={300}
        rows={7}
        value={formData.description}
        onChange={handleFormData}
      />

      <button onClick={sendData}>Dodaj ✔️</button>
    </div>
  );
}
