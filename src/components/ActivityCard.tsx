import { useState } from "react";
import Modal from "./Modal/Modal";
import ActivityDetails from "./ActivityDetails";
import ActivitySignUp from "./Forms/ActivitySignUp";
import { useAdminContext } from "../AdminContext";
import axios from "axios";

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  association: string;
}
interface Volunteers {
  id: number;
  activityId: number;
  list: string[];
}
interface ActivityCardProps {
  activity: Activity;
  activityVolunteers: Volunteers[];
  setUpdateActivities: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ActivityCard({
  activity,
  activityVolunteers,
  setUpdateActivities,
}: ActivityCardProps) {
  const adminData = useAdminContext();
  const [modal, setModal] = useState(false);

  const filteredVolonteers = activityVolunteers.filter((vol) => {
    return vol.activityId === activity.id;
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDeleteActivity = () => {
    if (window.confirm("Jeste li sigurni da želite izbrisati aktivnost?")) {
      axios
        .delete(`http://localhost:3001/activities/${activity.id}`)
        .then((rez) => {
          console.log(rez);
          setUpdateActivities((prev) => !prev);
        });
    }
  };

  console.log(typeof filteredVolonteers[0], filteredVolonteers[0]);

  return (
    <>
      {modal && (
        <Modal modal={modal} toggleModal={toggleModal}>
          <ActivityDetails
            activity={activity}
            volunteers={filteredVolonteers[0]}
            setUpdateActivities={setUpdateActivities}
          />
          <ActivitySignUp
            activityId={activity.id}
            existingVolunteers={filteredVolonteers[0]}
            setUpdateActivities={setUpdateActivities}
          />
        </Modal>
      )}
      <div className="activity-card">
        <img
          onClick={toggleModal}
          src={activity.image}
          alt="Activity site"
          className="activity-image"
        />
        <div>
          <h3 onClick={toggleModal}>{activity.name}</h3>
          <p onClick={toggleModal}>{activity.date}</p>
          <p onClick={toggleModal}>
            <i className="bx bx-location-plus"></i>
            {activity.location}
          </p>
        </div>
        {adminData.admin && (
          <button onClick={handleDeleteActivity} className="admin-delete">
            <i className="bx bx-trash"></i>
          </button>
        )}
      </div>
    </>
  );
}
