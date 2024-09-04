import axios from "axios";
import { useState } from "react";
import styles from "./style.module.css";

interface City {
  id: Number;
  name: string;
}
export default function NewAssociationForm({
  setUpdateAssociations,
  cities,
  setShowUserMessage,
}: {
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
  setShowUserMessage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialFormData = {
    name: "",
    address: "",
    city: "",
    approved: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [focused, setFocused] = useState({
    name: false,
    address: false,
    city: false,
  });

  const handleFormData = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
        .post(
          "https://json-server-volonterplus.onrender.com/associations",
          formData
        )
        .then((result) => {
          console.log(result);
          setUpdateAssociations((prev) => !prev);
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
    <div className={styles.form}>
      <h2>Nova udruga</h2>
      <label htmlFor="name">Naziv:</label>
      <input
        type="text"
        id="name"
        name="name"
        autoComplete="off"
        placeholder="Naziv udruge"
        value={formData.name}
        onChange={handleFormData}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.name.toString()}
        onBlur={handleFocus}
        //onFocus={()=>setFocused(false)}
      />
      <span className={styles.errorFormMessage}>
        Naziv treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>

      <label htmlFor="address">Adresa:</label>
      <input
        type="text"
        id="address"
        name="address"
        autoComplete="street-address"
        placeholder="Adresa udruge"
        value={formData.address}
        onChange={handleFormData}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.address.toString()}
        onBlur={handleFocus}
        //onFocus={()=>setFocused(false)}
      />
      <span className={styles.errorFormMessage}>
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
        data-focused={focused.city.toString()}
        onBlur={handleFocus}
        //onFocus={()=>setFocused(false)}
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
      <span className={styles.errorFormMessage}>Odaberite grad</span>

      <button className="save-button" onClick={sendData}>
        Spremi
      </button>
    </div>
  );
}
