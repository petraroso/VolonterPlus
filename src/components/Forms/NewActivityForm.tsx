import axios from "axios";
import { useState } from "react";
import "./Form.css";

export default function NewActivityForm({
  setUpdateActivities,
}: {
  setUpdateActivities: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialFormData = {
    name: "",
    date: "",
    image: "",
    location: "",
    byAssociation: false,
    association: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleFormData = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendData = () => {
    if (
      formData.name === "" ||
      formData.date === "" ||
      formData.location === "" ||
      formData.description === "" ||
      formData.image === ""
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      if (formData.association === "")
        setFormData({ ...formData, association: "Građani" });
      axios
        .post("http://localhost:3001/activities", formData)
        .then((result) => {
          console.log(result);
          setUpdateActivities((prev) => !prev);
          setFormData(initialFormData);
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="form">
      <h2>Nova aktivnost</h2>
      <label htmlFor="name">Naziv:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Naziv aktivnosti"
        value={formData.name}
        onChange={handleFormData}
      />

      <label htmlFor="date">Datum:</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleFormData}
      />

      <label htmlFor="location">Lokacija: </label>
      <input
        type="text"
        id="location"
        name="location"
        placeholder="Mjesto održavanja"
        value={formData.location}
        onChange={handleFormData}
      />

      <label>
        Udruga:
        <label>
          <input
            type="radio"
            id="notByAssociation"
            name="byAssociation"
            //checked={filter === "Sve"}
            value="false"
            onChange={handleFormData}
          ></input>
          Ne
        </label>
        <label>
          <input
            type="radio"
            id="byAssociation"
            name="byAssociation"
            //checked={filter === "Sve"}
            value="true"
            onChange={handleFormData}
          ></input>
          Da
        </label>
      </label>

      {formData.byAssociation && (
        <input
          type="text"
          id="association"
          name="association"
          placeholder="Naziv udruge"
          value={formData.association}
          onChange={handleFormData}
        />
      )}

      <label htmlFor="description">Opis:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Opis (max 300 znakova)"
        maxLength={300}
        rows={4}
        value={formData.description}
        onChange={handleFormData}
      />

      <label htmlFor="image">Slika:</label>
      <input
        type="text"
        id="image"
        name="image"
        placeholder="../jadro.jpg"
        value={formData.image}
        onChange={handleFormData}
      />

      <button onClick={sendData}>Spremi ✔️</button>
    </div>
  );
}
