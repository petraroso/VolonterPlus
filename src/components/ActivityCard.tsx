import { useState } from "react";
import Modal from "./Modal/Modal";
import ActivityDetails from "./ActivityDetails";
import ActivitySignUp from "./ActivitySignUp";

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
interface ActivityCardProps {
  activity: Activity;
}
export default function ActivityCard({ activity }: ActivityCardProps) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <Modal modal={modal} toggleModal={toggleModal}>
          <ActivityDetails activity={activity} />
          <ActivitySignUp
            activityId={activity.id}
            existingVolunteers={activity.volunteers}
          />
        </Modal>
      )}
      <div onClick={toggleModal} className="activity-card">
        <img
          src={activity.image}
          alt="Activity site"
          className="activity-image"
        />
        <h3>{activity.name}</h3>
        <p>{activity.date}</p>
        <p>
          <i className="bx bx-location-plus"></i>
          {activity.location}
        </p>
      </div>
    </>
  );
}
