import { useState, useEffect, useRef } from "react";
import axios from "axios";
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
  //cities: City[];
}

export default function ActivityDetailsEdit({
  activity,
  //volunteers,
  toggleEdit,
  setUpdateActivities,
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
      formData.date === "" ||
      formData.location === "" ||
      formData.description === "" ||
      formData.image === "" ||
      (formData.byAssociation === true && formData.association === "") ||
      (formData.byAssociation === true && formData.association === "Građani")
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      if (formData.byAssociation === false)
        setFormData({ ...formData, association: "Građani" });
      setShouldSendRequest(true);
    }
  };

  return (
    <>
      <div className="form details-form">
        <h3>Uredite: {activity.name}</h3>
        <label htmlFor="name">Naziv</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Naziv aktivnosti"
          value={formData.name}
          onChange={handleFormData}
        />
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
        <br></br>

        <label>
          Organizator:
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

        <label htmlFor="image">Slika:</label>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="../jadro.jpg"
          value={formData.image}
          onChange={handleFormData}
        />
        <br></br>
        <button onClick={sendData}>Spremi ✔️</button>
        <button onClick={toggleEdit}>Odbaci ❌</button>
      </div>
    </>
  );
}
