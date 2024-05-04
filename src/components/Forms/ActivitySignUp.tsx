import { useState } from "react";
import axios from "axios";

interface ActivitySignUpProps {
  activityId: number;
  existingVolunteers: Volunteer[];
}
interface Volunteer {
  name: string;
  surname: string;
}
export default function ActivitySignUp({
  activityId,
  existingVolunteers,
}: ActivitySignUpProps) {
  const [username, setUsername] = useState({
    name: "",
    surname: "",
  });

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUsername({ ...username, [name]: value });
  };

  const sendData = () => {
    if (username.name === "" || username.surname === "") {
      window.alert("Unesite ime i prezime.");
    } else {
      axios
        .patch(`http://localhost:3001/activities/${activityId}`, {
          volunteers: [...existingVolunteers, username],
        })
        .then((result) => {
          console.log(result);
          setUsername({ ...username, name: "", surname: "" });
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="form">
      <label htmlFor="name">Ime:</label>
      <input
        type="text"
        id="name"
        name="name"
        autoComplete="auto"
        placeholder="Vaše ime"
        value={username.name}
        onChange={handleUsernameChange}
      ></input>
      <label htmlFor="surname">Prezime:</label>
      <input
        type="text"
        id="surname"
        name="surname"
        autoComplete="auto"
        placeholder="Vaše prezime"
        value={username.surname}
        onChange={handleUsernameChange}
      ></input>

      <button onClick={sendData}>Prijava ✔️</button>
    </div>
  );
}
