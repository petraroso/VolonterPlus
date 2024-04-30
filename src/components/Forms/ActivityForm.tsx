import axios from "axios";
import { useState } from "react";

export default function ActivityForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    image: "",
    location: "",
    byAssociation: false,
    association: "",
    description: "",
  });

  const handleFormData = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
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
        .then((result) => console.log(result))
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <h2>Nova aktivnost</h2>
      <label>
        Naziv:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Naziv aktivnosti"
          value={formData.name}
          onChange={handleFormData}
        />
      </label>
      <label>
        Datum:
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleFormData}
        />
      </label>
      <label>
        Lokacija:
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Mjesto održavanja"
          value={formData.location}
          onChange={handleFormData}
        />
      </label>

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

      <label>
        Opis:
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Opis aktivnosti"
          value={formData.description}
          onChange={handleFormData}
        />
      </label>
      <label>
        Slika:
        <input
          type="text"
          id="image"
          name="image"
          placeholder="../jadro.jpg"
          value={formData.image}
          onChange={handleFormData}
        />
      </label>
      <button onClick={sendData}>Spremi ✔️</button>
    </>
  );
}
