import axios from "axios";
import { useState, useEffect } from "react";

import ActivityCard from "../components/ActivityCard";
import PlusButton from "../components/PlusButton/PlusButton";
import Modal from "../components/Modal/Modal";
import NewActivityForm from "../components/Forms/NewActivityForm";
import Filter from "../components/Filter/Filter";
import Loader from "../components/Loader/Loader";

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
interface City {
  id: number;
  name: string;
}
type SortOrder = "asc" | "desc";
type DateKey = "dateAdded" | "date";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityVolunteers, setActivityVolunteers] = useState<Volunteers[]>(
    []
  );
  const [cities, setCities] = useState<City[]>([]);
  const [sortValue, setSortValue] = useState("latest");
  const [openNewActivityForm, setOpenNewActivityForm] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [updateActivities, setUpdateActivities] = useState(false);
  const [cityFilter, setCityFilter] = useState("Svi");

  useEffect(() => {
    axios
      .get("https://json-server-volonterplus.onrender.com/activities")
      .then((res) => {
        setActivities(sortActivities(res.data, "desc", "dateAdded"));
      })
      .catch((err) => console.log(err.message));
    axios
      .get("https://json-server-volonterplus.onrender.com/activityVolunteers")
      .then((res) => {
        setActivityVolunteers(res.data);
      })
      .catch((err) => console.log(err.message));
    axios
      .get("https://json-server-volonterplus.onrender.com/cities")
      .then((res) => {
        setCities(sortAscending(res.data, "name"));
      })
      .catch((err) => console.log(err.message));
  }, [updateActivities]);

  function sortAscending<T>(items: T[], key: keyof T): T[] {
    return items.slice().sort((a, b) => {
      const valueA = String(a[key]).toLowerCase();
      const valueB = String(b[key]).toLowerCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  }

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortValue(() => value);

    if (value === "latest") {
      setActivities(sortActivities([...activities], "desc", "dateAdded"));
    } else if (value === "oldest") {
      setActivities(sortActivities([...activities], "asc", "dateAdded"));
    } else {
      setActivities(sortActivities([...activities], "asc", "date"));
    }
  };

  const sortActivities = (
    activities: Activity[],
    order: SortOrder,
    dateKey: DateKey
  ): Activity[] => {
    return activities.slice().sort((a, b) => {
      const dateA = parseDate(a[dateKey].toString()).getTime();
      const dateB = parseDate(b[dateKey].toString()).getTime();
      if (order === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };

  const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const toggleOpenNewActivityForm = () => {
    setOpenNewActivityForm(!openNewActivityForm);
  };

  const handleUserMessage = () => {
    setShowUserMessage(false);
    setOpenNewActivityForm(!openNewActivityForm);
  };

  return (
    <div className="page-container">
      <h2>Popis svih aktivnosti</h2>
      {activities.length ? (
        <>
          <h3>Sortiranje</h3>
          <select id="sort" name="sort" value={sortValue} onChange={handleSort}>
            <option value={"latest"}>Najnovije dodano</option>
            <option value={"oldest"}>Najstarije dodano</option>
            <option value={"chronological"}>Po datumu odvijanja</option>
          </select>
          <div>
            <Filter
              cities={cities}
              cityFilter={cityFilter}
              setCityFilter={setCityFilter}
              //activityFilter={activityFilter}
              //setActivityFilter={setActivityFilter}
            />
          </div>
          {activities.map((activity) =>
            cityFilter === "Svi" || cityFilter === activity.location ? (
              <ActivityCard
                key={activity.id}
                activity={activity}
                activityVolunteers={activityVolunteers}
                setUpdateActivities={setUpdateActivities}
              />
            ) : (
              <></>
            )
          )}
          <PlusButton openModal={toggleOpenNewActivityForm} />
          {openNewActivityForm && showUserMessage ? (
            <Modal modal={openNewActivityForm} toggleModal={handleUserMessage}>
              <div className="user-message-modal">
                <h3>Nova aktivnost dodana!</h3>
              </div>
            </Modal>
          ) : (
            openNewActivityForm && (
              <Modal
                modal={openNewActivityForm}
                toggleModal={toggleOpenNewActivityForm}
              >
                <NewActivityForm
                  setUpdateActivities={setUpdateActivities}
                  setShowUserMessage={setShowUserMessage}
                />
              </Modal>
            )
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
