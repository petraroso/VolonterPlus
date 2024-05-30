import axios from "axios";
import { useState, useRef, useEffect } from "react";
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
    dateAdded: new Date(),
  };
  const [formData, setFormData] = useState(initialFormData);
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    //so it doesn't run on first component mount, only on dependancy change
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (shouldSendRequest) {
      axios
        .post(
          "https://json-server-volonterplus.onrender.com/activities",
          formData
        )
        .then((result) => {
          console.log(result);
          setUpdateActivities((prev) => !prev);
          setFormData(initialFormData);
          setShouldSendRequest(false);
        })
        .catch((err) => {
          console.log(err.message);
          setShouldSendRequest(false);
        });
    }
  }, [shouldSendRequest]);

  const handleFormData = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "byAssociation") {
      const boolValue: boolean = value === "true";
      setFormData({ ...formData, [name]: boolValue, dateAdded: new Date() });
    } else setFormData({ ...formData, [name]: value, dateAdded: new Date() });
  };

  const sendData = () => {
    if (
      formData.name === "" ||
      formData.date === "" ||
      formData.location === "" ||
      formData.description === "" ||
      formData.image === "" ||
      (formData.byAssociation === true && formData.association === "")
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      if (formData.byAssociation === false)
        setFormData({ ...formData, association: "Građani" });
      setShouldSendRequest(true);
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
      <p>Organizator:</p>
      <label>
        Udruga:
        <label>
          <input
            type="radio"
            id="notByAssociation"
            name="byAssociation"
            checked={formData.byAssociation === false}
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
            checked={formData.byAssociation === true}
            value="true"
            onChange={handleFormData}
          ></input>
          Da
        </label>
      </label>

      {formData.byAssociation === true && (
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
