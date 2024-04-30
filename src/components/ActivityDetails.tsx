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

export default function ActivityDetails({ activity }: ActivityCardProps) {
  
  return (
    <>
      <h3>{activity.name}</h3>
      <p>{activity.description}</p>
      <p>{activity.association}</p>
      <p>{activity.date}</p>
      <p>
        <i className="bx bx-location-plus"></i>
        {activity.location}
      </p>
      <h4>Volonteri:</h4>
      {activity.volunteers.map((volunteer, index) => (
        <p key={index}>
          {volunteer.name} {volunteer.surname}
        </p>
      ))}
    </>
  );
}
