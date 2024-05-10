import { useState } from "react";
import Modal from "./Modal/Modal";
import ActivityDetails from "./ActivityDetails";
import ActivityDetailsEdit from "./Forms/ActivityDetailsEdit";
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
  byAssociation: boolean;
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
  const [editing, setEditing] = useState(false);

  const filteredVolonteers = activityVolunteers.filter((vol) => {
    return vol.activityId === activity.id;
  });

  const toggleModal = () => {
    setModal(!modal);
    if (modal === true && editing === true) setEditing(false);
  };
  function toggleEdit() {
    setEditing(!editing);
  }
  function toggleEditAndModal() {
    setEditing(!editing);
    setModal(!modal);
  }

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

  return (
    <>
      {modal && (
        <Modal modal={modal} toggleModal={toggleModal}>
          {adminData.admin && editing ? (
            <>
              <ActivityDetailsEdit
                activity={activity}
                volunteers={filteredVolonteers[0]}
                setUpdateActivities={setUpdateActivities}
                toggleEdit={toggleEdit}
              />
            </>
          ) : (
            <>
              <ActivityDetails
                activity={activity}
                volunteers={filteredVolonteers[0]}
                setUpdateActivities={setUpdateActivities}
                toggleEdit={toggleEdit}
              />
              {!adminData.admin && (
                <ActivitySignUp
                  activityId={activity.id}
                  existingVolunteers={filteredVolonteers[0]}
                  setUpdateActivities={setUpdateActivities}
                />
              )}
            </>
          )}
        </Modal>
      )}
      <div className="activity-card">
        <div>
          <img
            onClick={toggleModal}
            src={activity.image}
            alt="Activity site"
            className="activity-image"
          />
        </div>
        <div>
          <h3 onClick={toggleModal}>{activity.name}</h3>
          <p onClick={toggleModal}>{activity.date}</p>
          <p onClick={toggleModal}>
            <i className="bx bx-location-plus"></i>
            {activity.location}
          </p>
        </div>
        {adminData.admin && (
          <div className="admin-buttons">
            <button onClick={handleDeleteActivity} className="admin-delete">
              <i className="bx bx-trash"></i>
            </button>
            <button onClick={toggleEditAndModal}>
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
