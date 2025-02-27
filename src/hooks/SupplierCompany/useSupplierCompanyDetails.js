import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getSupplierById, updateSupplier } from "../../redux/features/actions/supplierAction";
import { getSupplierCompanyById } from "../../redux/features/actions/supplierCompanyAction";

const useSupplierCompanyDetails = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { supplier, isLoading, error } = useSelector((state) => state.supplierCompanies);

  const [editData, setEditData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    dispatch(getSupplierCompanyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (supplier) {
      setEditData({ name: supplier.name, email: supplier.email, password: "" });
    }
  }, [supplier]);

  const handleSave = () => {
    if (!editData?.name?.trim() || !editData?.email?.trim()) {
      return toast.error("Name and email cannot be empty!");
    }

    if (editData.password?.trim() && editData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }

    const updatedData = { id, name: editData.name, email: editData.email };

    if (editData.password?.trim()) {
      updatedData.password = editData.password;
    }

    dispatch(updateSupplier(updatedData))
      .then(() => {
        toast.success("Supplier updated successfully!");
        navigate("/dashboard/suppliers-companies");
      })
      .catch(() => {
        toast.error("Failed to update supplier!");
      });
  };

  useEffect(() => {
    console.log("Updated supplier in state:", supplier);
    if (supplier) {
      setEditData({ name: supplier.name, email: supplier.email, password: "" });
    }
  }, [supplier]);

  return { supplier, isLoading, error, editData, setEditData, handleSave, navigate };
};

export default useSupplierCompanyDetails;
