import axios from "axios";
import { useState } from "react";
import AssociationListMember from "../AssociationListMember/AssociationListMember";
import Modal from "../Modal/Modal";
import styles from "./style.module.css";

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
  approvedStatus: boolean;
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
}

const AssociationList: React.FC<ListProps> = ({
  associations,
  approvedStatus,
  setUpdateAssociations,
  cities,
}) => {
  const [showUserMessage, setShowUserMessage] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm("Jeste li sigurni da želite izbrisati udrugu?")) {
      axios
        .delete(
          `https://json-server-volonterplus.onrender.com/associations/${id}`
        )
        .then((rez) => {
          console.log(rez);
          setUpdateAssociations((prev) => !prev);
        });
    }
  };

  const handleApproval = (id: number) => {
    axios
      .patch(
        `https://json-server-volonterplus.onrender.com/associations/${id}`,
        {
          approved: true,
        }
      )
      .then((result) => {
        console.log(result);
        setUpdateAssociations((prev) => !prev);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <ul className={styles.associationList}>
        {associations.map(
          (association) =>
            association.approved === approvedStatus && (
              <AssociationListMember
                key={association.id}
                association={association}
                approvedStatus={approvedStatus}
                handleDelete={handleDelete}
                handleApproval={handleApproval}
                cities={cities}
                setUpdateAssociations={setUpdateAssociations}
              />
            )
        )}
      </ul>
      {showUserMessage && (
        <Modal
          modal={showUserMessage}
          toggleModal={() => setShowUserMessage(false)}
        >
          <div className="user-message-modal">
            <h3>Podaci spremljeni!</h3>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AssociationList;
