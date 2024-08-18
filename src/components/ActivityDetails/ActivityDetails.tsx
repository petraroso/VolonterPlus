import axios from "axios";
import { useAdminContext } from "../../AdminContext";
import styles from "./style.module.css";

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  association: string;
  byAssociation: Boolean;
  dateAdded: Date;
}
interface Volunteers {
  id: number;
  activityId: number;
  list: string[];
}
interface ActivityCardProps {
  activity: Activity;
  volunteers: Volunteers;
  toggleEdit: () => void;
  setUpdateActivities: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActivityDetails({
  activity,
  volunteers,
  toggleEdit,
  setUpdateActivities,
}: ActivityCardProps) {
  const adminData = useAdminContext();

  const handleDeleteVolunteer = (volunteerIndex: number) => {
    if (window.confirm("Jeste li sigurni da želite izbrisati volontera?")) {
      if (
        volunteers &&
        Array.isArray(volunteers.list) &&
        volunteers.list.length > 0
      ) {
        const updatedList = volunteers.list.filter(
          (_volunteer, index) => index !== volunteerIndex
        );
        axios
          .patch(
            `https://json-server-volonterplus.onrender.com/activityVolunteers/${volunteers.id}`,
            {
              list: updatedList,
            }
          )
          .then((response) => {
            console.log(response);
            setUpdateActivities((prev) => !prev);
          });
      } else {
        axios
          .delete(
            `https://json-server-volonterplus.onrender.com/activityVolunteers/${volunteers.id}`
          )
          .then((response) => {
            console.log(response);
            setUpdateActivities((prev) => !prev);
          });
      }
    }
  };

  return (
    <div className="details-form">
      <img
        src={activity.image}
        alt="activity image"
        className={styles.activityImageDetails}
      />
      <h3>{activity.name}</h3>

      <p className={styles.activityLocation}>
        <i className="bx bx-location-plus"></i>
        {activity.location}
      </p>
      <p className={styles.activityDate}>{activity.date}</p>
      <p>{activity.description}</p>
      <br></br>
      <p>
        <strong>Organizator:</strong> {activity.association}
      </p>

      <hr></hr>

      {volunteers &&
        Array.isArray(volunteers.list) &&
        volunteers.list.length > 0 && (
          <div className={styles.volunteerListLayout}>
            <h4>Prijavljeni volonteri:</h4>
            <div>
              {volunteers.list.map((volunteer, index) => (
                <div className={styles.volunteerDisplay} key={index}>
                  <p>{volunteer}</p>
                  {adminData.admin && (
                    <button
                      onClick={() => handleDeleteVolunteer(index)}
                      className="delete-button"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      {adminData.admin && (
        <button className="edit-button" onClick={toggleEdit}>
          <i className="bx bx-edit-alt"></i>
        </button>
      )}
    </div>
  );
}
