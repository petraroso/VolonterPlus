import { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

interface ActivitySignUpProps {
  activityId: number;
  existingVolunteers: Volunteers;
  setUpdateActivities: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Volunteers {
  id: number;
  activityId: number;
  list: string[];
}
export default function ActivitySignUp({
  activityId,
  existingVolunteers,
  setUpdateActivities,
}: ActivitySignUpProps) {
  const [username, setUsername] = useState({
    name: "",
    surname: "",
  });
  const [focused, setFocused] = useState({
    name: false,
    surname: false,
  });

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUsername({ ...username, [name]: value });
  };

  const sendData = () => {
    if (
      username.name.length < 3 ||
      username.name.length > 30 ||
      username.surname.length < 3 ||
      username.surname.length > 30
    ) {
      window.alert("Unesite ispravno ime i prezime.");
    } else {
      const updatedList = username.name + " " + username.surname;
      if (
        existingVolunteers &&
        Array.isArray(existingVolunteers.list) &&
        existingVolunteers.list.length > 0
      ) {
        axios
          .patch(
            `https://json-server-volonterplus.onrender.com/activityVolunteers/${existingVolunteers.id}`,
            {
              list: [...existingVolunteers.list, updatedList],
            }
          )
          .then((result) => {
            console.log(result);
            setUsername({ ...username, name: "", surname: "" });
            setUpdateActivities((prev) => !prev);
            setFocused({ ...focused, name: false, surname: false });
          })
          .catch((err) => console.log(err.message));
      } else {
        axios
          .post(
            `https://json-server-volonterplus.onrender.com/activityVolunteers/`,
            {
              activityId: activityId,
              list: [updatedList],
            }
          )
          .then((result) => {
            console.log(result);
            setUsername({ ...username, name: "", surname: "" });
            setUpdateActivities((prev) => !prev);
            setFocused({ ...focused, name: false, surname: false });
          })
          .catch((err) => console.log(err.message));
      }
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
      <h4 className={styles.signupTitle}>Prijavite se i volontirajte:</h4>
      <label htmlFor="name">Ime:</label>
      <input
        type="text"
        id="name"
        name="name"
        autoComplete="auto"
        placeholder="Vaše ime"
        value={username.name}
        onChange={handleUsernameChange}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.name.toString()}
        onBlur={handleFocus}
      ></input>
      <span className={styles.errorFormMessage}>
        Ime treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>
      <label htmlFor="surname">Prezime:</label>
      <input
        type="text"
        id="surname"
        name="surname"
        autoComplete="auto"
        placeholder="Vaše prezime"
        value={username.surname}
        onChange={handleUsernameChange}
        pattern="^[A-Za-z0-9 čćšđžČĆŠĐŽ]{3,30}$"
        required={true}
        data-focused={focused.surname.toString()}
        onBlur={handleFocus}
      ></input>
      <span className={styles.errorFormMessage}>
        Prezime treba biti duljine 3-30 znakova i ne smije sadržavati posebne
        znakove
      </span>

      <button className="save-button" onClick={sendData}>
        Prijava
      </button>
    </div>
  );
}
