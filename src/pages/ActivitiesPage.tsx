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
  const [sortValue, setSortValue] = useState("latest");

  useEffect(() => {
    axios
      .get("http://localhost:3001/activities")
      .then((res) => {
        setActivities(sortedActivitiesAscending(res.data));
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortValue(() => value);

    if (value === "latest") {
      setActivities(sortedActivitiesAscending([...activities]));
    } else {
      setActivities(sortedActivitiesDescending([...activities]));
    }
  };

  const sortedActivitiesAscending = (activities: Activity[]) => {
    return activities.sort((a: Activity, b: Activity) => {
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    });
  };

  const sortedActivitiesDescending = (activities: Activity[]) => {
    return activities.sort((a: Activity, b: Activity) => {
      return parseDate(a.date).getTime() - parseDate(b.date).getTime();
    });
  };

  const parseDate = (dateString: string): Date => {
    const [year, day, month] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  return (
    <>
      <h2>Popis aktivnosti</h2>
      <select id="sort" name="sort" value={sortValue} onChange={handleSort}>
        <option value={"latest"}>Najnoviji</option>
        <option value={"oldest"}>Najstariji</option>
      </select>
      {activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} />
      ))}
    </>
  );
}
