import { useAdminContext } from "../../AdminContext";
import styles from "./style.module.css";
interface Volunteer {
  id: number;
  name: string;
  surname: string;
  contact: string;
  city: string;
  image: string;
  activities: string[];
  description: string;
}

interface VolunteerCardProps {
  volunteer: Volunteer;
  toggleEdit: () => void;
  //setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VolunteerDetails({
  volunteer,
  toggleEdit,
}: VolunteerCardProps) {
  const adminData = useAdminContext();

  return (
    <div className="details-form">
      <img
        src={volunteer.image}
        alt="Volunteer avatar"
        className={styles.volunteerImage}
      />
      <h3>
        {volunteer.name} {volunteer.surname}
      </h3>
      <p className={styles.volunteerLocation}>
        <i className="bx bx-location-plus"></i>
        {volunteer.city}
      </p>
      <div className="contact-container">
        <h4>Kontakt:</h4>
        <p>{volunteer.contact}</p>
      </div>

      {volunteer.activities && (
        <div className={styles.activityContainer}>
          <h4>Aktivnosti:</h4>
          <div className={styles.activityCheckboxes}>
            {volunteer.activities.map((activity, index) => (
              <div key={index}>
                <p>{activity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {volunteer.description && volunteer.description !== "" && (
        <>
          <hr />
          <p>{volunteer.description}</p>
        </>
      )}

      {adminData.admin && (
        <button className="edit-button" onClick={toggleEdit}>
          <i className="bx bx-edit-alt"></i>
        </button>
      )}
    </div>
  );
}
