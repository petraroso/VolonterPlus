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
  return (
    <div className="activity-card">
        <img src={activity.image} alt="Activity site" className="activity-image"/>
      <h3>{activity.name}</h3>
      <p>{activity.date}</p>
      <p>
        <i className="bx bx-location-plus"></i>
        {activity.location}
      </p>
    </div>
  );
}
