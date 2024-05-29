import { useState, useEffect } from "react";
import axios from "axios";

interface Association {
  id: number;
  name: string;
  address: string;
  city: string;
  approved: boolean;
}
interface City {
  id: Number;
  name: string;
}
interface ListProps {
  item: Association;
  cities: City[];
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
  setAssociationEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AssociationLMEdit: React.FC<ListProps> = ({
  item,
  cities,
  setUpdateAssociations,
  setAssociationEditId,
}) => {
  const [formData, setFormData] = useState<Association>({
    id: 0,
    name: "",
    address: "",
    city: "",
    approved: false,
  });

  useEffect(() => {
    setFormData(item);
  }, []);

  const handleFormData = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "approved") {
      const boolValue: boolean = value === "true";
      if (boolValue === false)
        setFormData({
          ...formData,
          [name]: boolValue,
        });
      else setFormData({ ...formData, [name]: boolValue });
    } else setFormData({ ...formData, [name]: value });
  };

  const sendData = () => {
    if (
      formData.name === "" ||
      formData.address === "" ||
      formData.city === ""
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      axios
        .patch(
          `https://json-server-volonterplus.onrender.com/associations/${formData.id}`,
          formData
        )
        .then((result) => {
          console.log(result);
          setUpdateAssociations((prev) => !prev);
          setAssociationEditId(null);
        })
        .catch((err) => console.log(err.message));
    }
  };

  function handleAbort() {
    setAssociationEditId(null);
  }

  return (
    <li key={item.id} className="association-list-edit">
      <strong>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Naziv udruge"
          value={formData.name}
          onChange={handleFormData}
          required
        />
      </strong>
      <em>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Naziv udruge"
          value={formData.address}
          onChange={handleFormData}
          required
        />
      </em>{" "}
      <select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleFormData}
        required
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <select
        id="approved"
        name="approved"
        value={formData.approved.toString()}
        onChange={handleFormData}
        required
      >
        <option value={"false"}>Neodobreno</option>
        <option value={"true"}>Odobreno</option>
      </select>
      <div>
        <button onClick={sendData}>✔️</button>
        <button onClick={handleAbort}>❌</button>
      </div>
    </li>
  );
};

export default AssociationLMEdit;
