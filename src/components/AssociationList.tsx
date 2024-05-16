import axios from "axios";
//import { useAdminContext } from "../AdminContext";
import { useState } from "react";
import AssociationListMember from "./AssociationListMember";
import AssociationLMEdit from "./Forms/AssociationLMEdit";

interface Association {
  id: number;
  name: string;
  address: string;
  city: string;
  approved: boolean;
}
interface City {
  id: Number;
  name: string;
}

interface ListProps {
  associations: Association[];
  approved: boolean;
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
}

const AssociationList: React.FC<ListProps> = ({
  associations,
  approved,
  setUpdateAssociations,
  cities,

}) => {
  //const adminData = useAdminContext();
 // const [editing, setEditing] = useState(false);
 const [associationEditId, setAssociationEditId] = useState<number | null>(
  null
);

  const handleDelete = (id: number) => {
    if (window.confirm("Jeste li sigurni da želite izbrisati udrugu?")) {
      axios.delete(`http://localhost:3001/associations/${id}`).then((rez) => {
        console.log(rez);
        setUpdateAssociations((prev) => !prev);
      });
    }
  };

  const handleApproval = (id: number) => {
    axios
      .patch(`http://localhost:3001/associations/${id}`, {
        approved: true,
      })
      .then((result) => {
        console.log(result);
        setUpdateAssociations((prev) => !prev);
      })
      .catch((err) => console.log(err.message));
  };

//  function toggleEdit() {
  //  setEditing(!editing);
 // }

  return (
    <ul className="association-list">
      {associations.map((item, index) =>
        associationEditId === item.id && item.approved === approved ? (
          <AssociationLMEdit
            key={index}
            index={index}
            item={item}
            // approved={approved}
            //handleDelete={handleDelete}
            //handleApproval={handleApproval}
            //toggleEdit={toggleEdit}
            cities={cities}
            setUpdateAssociations={setUpdateAssociations}
            setAssociationEditId={setAssociationEditId}
          />
        ) : item.approved === approved ? (
          <AssociationListMember
            key={index}
            index={index}
            item={item}
            approved={approved}
            handleDelete={handleDelete}
            handleApproval={handleApproval}
           // toggleEdit={toggleEdit}
            setAssociationEditId={setAssociationEditId}
          />
        ) : (
          <></>
        )
      )}
    </ul>
  );
};

export default AssociationList;
