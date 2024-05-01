import axios from "axios";
import { useState, useEffect } from "react";

import ActivityCard from "../components/ActivityCard";
import PlusButton from "../components/PlusButton/PlusButton";
import Modal from "../components/Modal/Modal";
import NewActivityForm from "../components/Forms/NewActivityForm";

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  association: string;
  volunteers: Volunteer[];
}
interface Volunteer {
  name: string;
  surname: string;
}
export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [sortValue, setSortValue] = useState("latest");
  const [openNewActivityForm, setOpenNewActivityForm] = useState(false);
  const [updateActivities, setUpdateActivities] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/activities")
      .then((res) => {
        setActivities(sortedActivitiesAscending(res.data));
      })
      .catch((err) => console.log(err.message));
  }, [updateActivities]);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortValue(() => value);

    if (value === "latest") {
      setActivities(sortedActivitiesAscending([...activities]));
    } else {
      setActivities(sortedActivitiesDescending([...activities]));
    }
  };

  const sortedActivitiesAscending = (activities: Activity[]) => {
    return activities.sort((a: Activity, b: Activity) => {
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    });
  };

  const sortedActivitiesDescending = (activities: Activity[]) => {
    return activities.sort((a: Activity, b: Activity) => {
      return parseDate(a.date).getTime() - parseDate(b.date).getTime();
    });
  };

  const parseDate = (dateString: string): Date => {
    const [year, day, month] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const toggleOpenNewActivityForm = () => {
    setOpenNewActivityForm(!openNewActivityForm);
  };

  return (
    <>
      <h2>Popis aktivnosti</h2>
      <select id="sort" name="sort" value={sortValue} onChange={handleSort}>
        <option value={"latest"}>Najnoviji</option>
        <option value={"oldest"}>Najstariji</option>
      </select>
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          activity={activity}
          setUpdateActivities={setUpdateActivities}
        />
      ))}
      <PlusButton openModal={toggleOpenNewActivityForm} />
      {openNewActivityForm && (
        <Modal
          modal={openNewActivityForm}
          toggleModal={toggleOpenNewActivityForm}
        >
          <NewActivityForm setUpdateActivities={setUpdateActivities} />
        </Modal>
      )}
    </>
  );
}
