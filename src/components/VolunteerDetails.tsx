//import { useAdminContext } from "../AdminContext";
interface Volunteer {
  id: number;
  name: string;
  surname: string;
  contact: string;
  city: string;
  image: string;
  activities: string[];
}

interface VolunteerCardProps {
  volunteer: Volunteer;
  //setUpdateVolunteers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VolunteerDetails({ volunteer }: VolunteerCardProps) {
  //const adminData = useAdminContext();

  return (
    <>
      <img
        src={volunteer.image}
        alt="Volunteer avatar"
        className="volunteer-image"
      />
      <h3>
        {volunteer.name} {volunteer.surname}
      </h3>
      <p>{volunteer.contact}</p>
      <p>
        <i className="bx bx-location-plus"></i>
        {volunteer.city}
      </p>
      {volunteer.activities && (
        <>
          <h4>Aktivnosti:</h4>
          {volunteer.activities.map((activity, index) => (
            <div key={index}>
              <p>{activity}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
}
