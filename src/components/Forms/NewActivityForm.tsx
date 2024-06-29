import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "./Form.css";

export default function NewActivityForm({
  setUpdateActivities,
  setShowUserMessage,
}: {
  setUpdateActivities: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUserMessage: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [focused, setFocused] = useState({
    name: false,
    //date: false,
    location: false,
    association: false,
    description: false,
    image: false,
  });

  useEffect(() => {
    //so it doesn't run on first component mount, only on dependency change
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
          setShowUserMessage(true);
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
      <h2>Nova aktivnost</h2>
      <label htmlFor="name">Naziv:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Naziv aktivnosti"
        value={formData.name}
        onChange={handleFormData}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.name.toString()}
        onBlur={handleFocus}
        //onFocus={()=>setFocused(false)}
      />
      <span className="errorFormMessage">
        Naziv treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>

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
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.location.toString()}
        onBlur={handleFocus}
        //onFocus={()=>setFocused(false)}
      />
      <span className="errorFormMessage">
        Lokacija treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>

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
        <>
          <input
            type="text"
            id="association"
            name="association"
            placeholder="Naziv udruge"
            value={formData.association}
            onChange={handleFormData}
            pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
            required={true}
            data-focused={focused.association.toString()}
            onBlur={handleFocus}
            //onFocus={()=>setFocused(false)}
          />
          <span className="errorFormMessage">
            Naziv treba biti duljine 3-30 znakova i ne smije sadržavati posebne
            znakove
          </span>
        </>
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
        //onFocus={handleFocus}
        //pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.description.toString()}
        onBlur={handleFocus}
        //onFocus={()=>setFocused(false)}
      />
      <span className="errorFormMessage">Unesite opis do 300 znakova</span>

      <label htmlFor="image">Slika:</label>
      <input
        //type="file"
        type="text"
        id="image"
        name="image"
        placeholder="../jadro.jpg"
        value={formData.image}
        onChange={handleFormData}
        required={true}
        data-focused={focused.image.toString()}
        onBlur={handleFocus}
        //onFocus={()=>setFocused(false)}
      />
      <span className="errorFormMessage">Unesite put do slike</span>

      <button onClick={sendData}>Spremi ✔️</button>
    </div>
  );
}
