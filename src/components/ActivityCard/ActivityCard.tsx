import { useState } from "react";
import Modal from "../Modal/Modal";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import ActivityDetailsEdit from "../Forms/ActivityDetailsEdit";
import ActivitySignUp from "../Forms/ActivitySignUp";
import { useAdminContext } from "../../AdminContext";
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
  const [showUserMessage, setShowUserMessage] = useState(false);

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
        .delete(
          `https://json-server-volonterplus.onrender.com/activities/${activity.id}`
        )
        .then((rez) => {
          console.log(rez);
          setUpdateActivities((prev) => !prev);
        });
    }
  };
  const handleUserMessage = () => {
    setShowUserMessage(false);
    setModal(!modal);
  };

  return (
    <>
      {modal && showUserMessage ? (
        <Modal modal={modal} toggleModal={handleUserMessage}>
          <div className="user-message-modal">
            <h3>Aktivnost spremljena!</h3>
          </div>
        </Modal>
      ) : (
        modal && (
          <Modal modal={modal} toggleModal={toggleModal}>
            {adminData.admin && editing ? (
              <>
                <ActivityDetailsEdit
                  activity={activity}
                  volunteers={filteredVolonteers[0]}
                  setUpdateActivities={setUpdateActivities}
                  toggleEdit={toggleEdit}
                  setShowUserMessage={setShowUserMessage}
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
        )
      )}
      <div className={styles.activityCard}>
        <div className={styles.activityImage}>
          <img
            onClick={toggleModal}
            src={activity.image}
            alt="Activity site"
            className={styles.activityImage}
          />
        </div>
        <div className={styles.activityContent}>
          <div className={styles.activityInfo}>
            <h3 onClick={toggleModal}>{activity.name}</h3>
            <div className={styles.activityDateLocation}>
              <p onClick={toggleModal}>{activity.date}</p>
              <p className={styles.activityLocation} onClick={toggleModal}>
                <i className="bx bx-location-plus"></i>
                {activity.location}
              </p>
            </div>
          </div>
          {adminData.admin && (
            <div className={styles.adminButtons}>
              <button className="edit-button" onClick={toggleEditAndModal}>
                <i className="bx bx-edit-alt"></i>
              </button>
              <button onClick={handleDeleteActivity} className="delete-button">
                <i className="bx bx-trash"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
