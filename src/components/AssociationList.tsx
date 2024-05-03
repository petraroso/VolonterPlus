import axios from "axios";

interface Association {
  id: number;
  name: string;
  address: string;
  city: string;
  approved: boolean;
}
interface ListProps {
  associations: Association[];
  approved: boolean;
  setUpdateAssociations: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssociationList: React.FC<ListProps> = ({
  associations,
  approved,
  setUpdateAssociations,
}) => {
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

  return (
    <ul className="association-list">
      {associations.map((item, index) => {
        if (item.approved === approved) {
          return (
            <li key={index}>
              {item.name} {item.address} {item.city}
              {approved ? (
                <button onClick={() => handleDelete(item.id)}>
                  <i className="bx bx-trash"></i>
                </button>
              ) : (
                <>
                  <button onClick={() => handleDelete(item.id)}>
                    <i className="bx bx-trash"></i>
                  </button>
                  <button onClick={() => handleApproval(item.id)}>
                    <i className="bx bxs-up-arrow-square"></i>
                  </button>
                </>
              )}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default AssociationList;
