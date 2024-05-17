import { useAdminContext } from "../AdminContext";

interface Association {
  id: number;
  name: string;
  address: string;
  city: string;
  approved: boolean;
}
interface ListProps {
  index: number;
  item: Association;
  approved: boolean;
  handleDelete: (arg0: number) => void;
  handleApproval: (arg0: number) => void;
  setAssociationEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AssociationListMember: React.FC<ListProps> = ({
  index,
  item,
  approved,
  handleDelete,
  handleApproval,
  setAssociationEditId,
}) => {
  const adminData = useAdminContext();
  return (
    <li key={index} className="association-list-nonedit">
      <strong>{item.name}</strong>
      <em>{item.address}</em> {item.city}
      {approved && adminData.admin ? (
        <div>
          <button onClick={() => setAssociationEditId(item.id)}>
            <i className="bx bx-edit-alt"></i>
          </button>
          <button onClick={() => handleDelete(item.id)}>
            <i className="bx bx-trash"></i>
          </button>
        </div>
      ) : adminData.admin ? (
        <div className="admin-buttons">
          <button onClick={() => setAssociationEditId(item.id)}>
            <i className="bx bx-edit-alt"></i>
          </button>
          <button onClick={() => handleDelete(item.id)}>
            <i className="bx bx-trash"></i>
          </button>
          <button onClick={() => handleApproval(item.id)}>
            <i className="bx bxs-up-arrow-square"></i>
          </button>
        </div>
      ) : (
        <></>
      )}
    </li>
  );
};

export default AssociationListMember;
