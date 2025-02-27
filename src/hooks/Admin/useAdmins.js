import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin, getAllAdmins } from "../../redux/features/actions/adminAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAdmins = () => {
  const dispatch = useDispatch();
  const { admins, isLoading, error } = useSelector((state) => state.admin);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (admins.length > 0 && id === admins[0].id) {
      toast.error("Cannot delete the first admin!");
      return;
    }

    dispatch(deleteAdmin(id))
      .then(() => toast.success("Admin deleted successfully!"))
      .catch(() => toast.error("Failed to delete admin!"));
  };

  return { admins, isLoading, error, handleDelete,navigate };
};

export default useAdmins;
