import { useState } from "react";
import Modal from "./Modal/Modal";
import ActivityDetails from "./ActivityDetails";

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  association: string;
  volunteers: string;
}
interface ActivityCardProps {
  activity: Activity;
}
export default function ActivityCard({ activity }: ActivityCardProps) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      {modal && (
        <Modal toggleModal={toggleModal}>
          <ActivityDetails activity={activity} />
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
