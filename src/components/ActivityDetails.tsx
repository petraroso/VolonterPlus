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
  volunteers: Volunteer[];
}
interface Volunteer {
  id: number;
  name: string;
  surname: string;
}
interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityDetails({ activity }: ActivityCardProps) {
  const adminData = useAdminContext();

  const handleDeleteVolunteer = (volunteerId: number) => {
    //console.log(volunteerId)
    //console.log(activity.id)
    if (window.confirm("Jeste li sigurni da želite izbrisati volontera?")) {
      axios
        .delete(
          `http://localhost:3001/activities/${activity.id}/volunteers/${volunteerId}`
        )
        .then((response) => {
          console.log(response);
          //setUpdateActivities((prev) => !prev);
        });
    }
  };

  return (
    <div className="form details-form">
      <h3>{activity.name}</h3>
      <p>{activity.description}</p>
      <br></br>
      <p>Udruga: {activity.association}</p>
      <p>{activity.date}</p>
      <p>
        <i className="bx bx-location-plus"></i>
        {activity.location}
      </p>
      <br></br>
      {activity.volunteers && (
        <>
          <h4>Volonteri:</h4>
          {activity.volunteers.map((volunteer, index) => (
            <div className="volunteer-display" key={index}>
              <p>
                {volunteer.name} {volunteer.surname}
              </p>
              {adminData.admin && (
                <>
                  <button
                    onClick={() => handleDeleteVolunteer(volunteer.id)}
                    className="admin-delete"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
