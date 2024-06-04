import axios from "axios";
import { useState } from "react";
import AssociationListMember from "./AssociationListMember";
import AssociationLMEdit from "./Forms/AssociationLMEdit";
import Modal from "./Modal/Modal";

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
  const [associationEditId, setAssociationEditId] = useState<number | null>(
    null
  );
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
      <ul className="association-list">
        {associations.map((item) =>
          associationEditId === item.id && item.approved === approved ? (
            <AssociationLMEdit
              key={item.id}
              item={item}
              cities={cities}
              setUpdateAssociations={setUpdateAssociations}
              setAssociationEditId={setAssociationEditId}
              setShowUserMessage={setShowUserMessage}
            />
          ) : item.approved === approved ? (
            <AssociationListMember
              key={item.id}
              item={item}
              approved={approved}
              handleDelete={handleDelete}
              handleApproval={handleApproval}
              setAssociationEditId={setAssociationEditId}
            />
          ) : (
            <></>
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
