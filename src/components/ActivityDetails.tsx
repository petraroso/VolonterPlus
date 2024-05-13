import axios from "axios";
import { useAdminContext } from "../AdminContext";

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
          .patch(`http://localhost:3001/activityVolunteers/${volunteers.id}`, {
            list: updatedList,
          })
          .then((response) => {
            console.log(response);
            setUpdateActivities((prev) => !prev);
          });
      } else {
        axios
          .delete(`http://localhost:3001/activityVolunteers/${volunteers.id}`)
          .then((response) => {
            console.log(response);
            setUpdateActivities((prev) => !prev);
          });
      }
    }
  };

  return (
    <div className="form details-form">
      <h3>{activity.name}</h3>
      <p>{activity.description}</p>
      <br></br>
      <p>Organizator: {activity.association}</p>
      <p>{activity.date}</p>
      <p>
        <i className="bx bx-location-plus"></i>
        {activity.location}
      </p>
      <br></br>
      {adminData.admin && (
        <button onClick={toggleEdit}>
          <i className="bx bx-edit-alt"></i>
        </button>
      )}
      {volunteers &&
        Array.isArray(volunteers.list) &&
        volunteers.list.length > 0 && (
          <>
            <h4>Volonteri:</h4>
            {volunteers.list.map((volunteer, index) => (
              <div className="volunteer-display" key={index}>
                <p>{volunteer}</p>
                {adminData.admin && (
                  <button
                    onClick={() => handleDeleteVolunteer(index)}
                    className="admin-delete"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                )}
              </div>
            ))}
          </>
        )}
    </div>
  );
}
