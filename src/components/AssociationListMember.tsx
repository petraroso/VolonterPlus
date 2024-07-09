import { useAdminContext } from "../AdminContext";
import Modal from "./Modal/Modal";
import { useState } from "react";
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
  association: Association;
  approvedStatus: boolean;
  handleDelete: (arg0: number) => void;
  handleApproval: (arg0: number) => void;
  cities: City[];
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssociationListMember: React.FC<ListProps> = ({
  association,
  approvedStatus,
  handleDelete,
  handleApproval,
  cities,
  setUpdateAssociations,
}) => {
  const adminData = useAdminContext();
  const [modal, setModal] = useState(false);
  const [associationEditId, setAssociationEditId] = useState<number | null>(
    null
  );
  const [showUserMessage, setShowUserMessage] = useState(false);

  const toggleModal = () => {
    setModal(false);
    setAssociationEditId(null);
  };

  const openModal = () => {
    setModal(true);
    setAssociationEditId(association.id);
  };
  const handleUserMessage = () => {
    setShowUserMessage(false);
    setModal(!modal);
  };

  return (
    <>
      {modal && showUserMessage ? (
        <Modal modal={modal} toggleModal={handleUserMessage}>
          <div className="user-message-modal">
            <h3>Udruga spremljena!</h3>
          </div>
        </Modal>
      ) : (
        modal && (
          <Modal modal={modal} toggleModal={toggleModal}>
            {adminData.admin && associationEditId && (
              <AssociationLMEdit
                association={association}
                cities={cities}
                setUpdateAssociations={setUpdateAssociations}
                setAssociationEditId={setAssociationEditId}
                setShowUserMessage={setShowUserMessage}
                setModal={setModal}
              />
            )}
          </Modal>
        )
      )}

      <li key={association.id} className="association-list-nonedit">
        <strong>{association.name}</strong>
        <em>{association.address}</em> {association.city}
        {approvedStatus && adminData.admin ? (
          <div className="admin-buttons">
            <button onClick={openModal}>
              <i className="bx bx-edit-alt"></i>
            </button>
            <button onClick={() => handleDelete(association.id)}>
              <i className="bx bx-trash"></i>
            </button>
          </div>
        ) : adminData.admin ? (
          <div className="admin-buttons">
            <button onClick={openModal}>
              <i className="bx bx-edit-alt"></i>
            </button>
            <button onClick={() => handleDelete(association.id)}>
              <i className="bx bx-trash"></i>
            </button>
            <button onClick={() => handleApproval(association.id)}>
              <i className="bx bxs-up-arrow-square"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
      </li>
    </>
  );
};

export default AssociationListMember;
