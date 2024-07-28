//import { useAdminContext } from "../AdminContext";
import { useState, useEffect } from "react";
import axios from "axios";
interface Volunteer {
  id: number;
  name: string;
  surname: string;
  contact: string;
  city: string;
  image: string;
  activities: string[];
  description: string;
}
interface City {
  id: Number;
  name: string;
}

interface VolunteerCardProps {
  volunteer: Volunteer;
  toggleEdit: () => void;
  setUpdateVolunteers: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
  setShowUserMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VolunteerDetailsEdit({
  volunteer,
  toggleEdit,
  setUpdateVolunteers,
  cities,
  setShowUserMessage,
}: VolunteerCardProps) {
  //const adminData = useAdminContext();
  const [newData, setNewData] = useState<Volunteer>({
    id: 0,
    name: "",
    surname: "",
    contact: "",
    city: "",
    image: "",
    activities: [],
    description: "",
  });
  const [displayEmail, setDisplayEmail] = useState("");
  //const [displayContactError, setDisplayContactError] = useState(false);
  const [focused, setFocused] = useState({
    name: false,
    surname: false,
    contact: false,
    city: false,
    image: false,
  });

  useEffect(() => {
    setNewData(volunteer);
    setDisplayEmail(volunteer.contact);
  }, []);

  const handleFormData = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      let updatedActivities = [...newData.activities];
      if ((event.target as HTMLInputElement).checked) {
        updatedActivities.push(value);
      } else {
        updatedActivities = updatedActivities.filter(
          (activity) => activity !== value
        );
      }
      setNewData({ ...newData, activities: updatedActivities });
    } else {
      if (name === "contact") {
        setDisplayEmail(value);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (isValidEmail) {
          setNewData({ ...newData, [name]: value });
          //setDisplayContactError(false);
        } else {
          setNewData({ ...newData, [name]: "" });
          //setDisplayContactError(true);
        }
      } else {
        setNewData({ ...newData, [name]: value });
      }
    }
  };

  const sendData = () => {
    if (
      newData.name === "" ||
      newData.surname === "" ||
      newData.contact === "" ||
      newData.city === "" ||
      newData.image === ""
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      axios
        .patch(
          `https://json-server-volonterplus.onrender.com/signedVolunteers/${newData.id}`,
          newData
        )
        .then((result) => {
          console.log(result);
          toggleEdit();
          setUpdateVolunteers((prev) => !prev);
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
      <h3>Uredite podatke</h3>
      <label htmlFor="name">Ime:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Ime"
        value={newData.name}
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
        value={newData.surname}
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
        value={newData.city}
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
        value={newData.image}
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
              checked={newData.activities.includes("Ekologija")}
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
              checked={newData.activities.includes("Edukacija")}
              onChange={handleFormData}
            ></input>
            Edukacija
          </label>
          <label>
            <input
              type="checkbox"
              name="activities"
              checked={newData.activities.includes("Prijevoz")}
              value="Prijevoz"
              onChange={handleFormData}
            ></input>
            Prijevoz
          </label>
          <label>
            <input
              type="checkbox"
              name="activities"
              checked={newData.activities.includes("Razno")}
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
        value={newData.description}
        onChange={handleFormData}
      />
      <button className="save-button" onClick={sendData}>
        Spremi
      </button>
      <button className="discard-button" onClick={toggleEdit}>
        Odbaci
      </button>
    </div>
  );
}
