import axios from "axios";
import { useState, useEffect } from "react";

import ActivityCard from "../components/ActivityCard";

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

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/activities")
      .then((res) => {
        setActivities(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <h2>Popis aktivnosti</h2>
      {activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} />
      ))}
    </>
  );
}
