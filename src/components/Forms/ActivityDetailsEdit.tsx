import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./style.module.css";

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  association: string;
  byAssociation: boolean;
  dateAdded: Date;
}
interface Volunteers {
  id: number;
  activityId: number;
  list: string[];
}

interface ActivityCardProps {
  activity: Activity;
  volunteers: Volunteers;
  toggleEdit: () => void;
  setUpdateActivities: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUserMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActivityDetailsEdit({
  activity,
  //volunteers,
  toggleEdit,
  setUpdateActivities,
  setShowUserMessage,
}: //cities,
ActivityCardProps) {
  const [formData, setFormData] = useState<Activity>({
    id: 0,
    name: "",
    description: "",
    date: "",
    location: "",
    image: "",
    association: "",
    byAssociation: false,
    dateAdded: new Date(),
  });
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const isFirstRender = useRef(true);
  const [focused, setFocused] = useState({
    name: false,
    date: false,
    location: false,
    association: false,
    description: false,
    image: false,
  });

  useEffect(() => {
    if (isFirstRender.current) {
      setFormData(activity);
      isFirstRender.current = false;
      return;
    }

    if (shouldSendRequest) {
      axios
        .patch(
          `https://json-server-volonterplus.onrender.com/activities/${formData.id}`,
          formData
        )
        .then((result) => {
          console.log(result);
          setUpdateActivities((prev) => !prev);
          toggleEdit();
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "byAssociation") {
      const boolValue: boolean = value === "true";
      setFormData({
        ...formData,
        [name]: boolValue,
        dateAdded: new Date(),
      });
    } else setFormData({ ...formData, [name]: value, dateAdded: new Date() });
  };

  const sendData = () => {
    if (
      formData.name === "" ||
      formData.name.length > 50 ||
      formData.date === "" ||
      formData.location.length < 3 ||
      formData.location.length > 40 ||
      formData.description === "" ||
      formData.description.length > 300 ||
      formData.image === "" ||
      (formData.byAssociation === true &&
        (formData.association.length < 3 ||
          formData.association.length > 30)) ||
      (formData.byAssociation === true && formData.association === "Građani")
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
    <>
      <div className={`${styles.form} ${styles.detailsForm}`}>
        <h3>Uredite: {activity.name}</h3>
        <label htmlFor="name">Naziv:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Naziv aktivnosti"
          value={formData.name}
          onChange={handleFormData}
          pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,50}$"
          required={true}
          data-focused={focused.name.toString()}
          onBlur={handleFocus}
        />
        <span className={styles.errorFormMessage}>
          Naziv treba biti duljine 3-50 znakova i ne smije sadržavati posebne
          znakove
        </span>

        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Opis (max 300 znakova)"
          maxLength={300}
          rows={7}
          value={formData.description}
          onChange={handleFormData}
          required={true}
          data-focused={focused.description.toString()}
          onBlur={handleFocus}
        />
        <span className={styles.errorFormMessage}>
          Unesite opis do 300 znakova
        </span>

        <label>
          Organizator udruga:
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
            />
            <span className={styles.errorFormMessage}>
              Naziv treba biti duljine 3-30 znakova i ne smije sadržavati
              posebne znakove
            </span>
          </>
        )}

        <label htmlFor="date">Datum:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleFormData}
          required={true}
          data-focused={focused.date.toString()}
          onBlur={handleFocus}
        />
        <span className={styles.errorFormMessage}>Odaberite datum</span>

        <label htmlFor="location">Lokacija: </label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Mjesto održavanja"
          value={formData.location}
          onChange={handleFormData}
          pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,40}$"
          required={true}
          data-focused={focused.location.toString()}
          onBlur={handleFocus}
        />
        <span className={styles.errorFormMessage}>
          Lokacija treba biti duljine 3-40 znakova i ne smije sadržavati posebne
          znakove
        </span>

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
        <span className={styles.errorFormMessage}>Unesite put do slike</span>
        <br></br>
        <button className="save-button" onClick={sendData}>
          Spremi
        </button>
        <button className="discard-button" onClick={toggleEdit}>
          Odbaci
        </button>
      </div>
    </>
  );
}
