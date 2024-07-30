import { useAdminContext } from "../AdminContext";
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
    <div className="form details-form">
      <img
        src={volunteer.image}
        alt="Volunteer avatar"
        className="volunteer-image"
      />
      <h3>
        {volunteer.name} {volunteer.surname}
      </h3>
      <p className="volunteer-location">
        <i className="bx bx-location-plus"></i>
        {volunteer.city}
      </p>
      <div className="contact-container">
        <h4>Kontakt:</h4>
        <p>{volunteer.contact}</p>
      </div>

      {volunteer.activities && (
        <div className="activity-container">
          <h4>Aktivnosti:</h4>
          <div className="activity-checkboxes">
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
