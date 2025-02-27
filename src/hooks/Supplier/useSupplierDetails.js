import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getSupplierById, updateSupplier } from "../../redux/features/actions/supplierAction";
import { getAllSupplierCompanys } from "../../redux/features/actions/supplierCompanyAction";

const useSupplierDetails = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { supplier, isLoading, error } = useSelector((state) => state.suppliers);
  const { suppliers: companies } = useSelector((state) => state.supplierCompanies);

  const [editData, setEditData] = useState({ name: "", email: "", password: "", company_id: "" });

  useEffect(() => {
    dispatch(getSupplierById(id));
    dispatch(getAllSupplierCompanys());
  }, [dispatch, id]);

  useEffect(() => {
    if (supplier) {
      setEditData({ 
        name: supplier.name, 
        email: supplier.email, 
        password: "",
        company_id: supplier.company_id || ""
      });
    }
  }, [supplier]);

  const handleSave = () => {
    if (!editData?.name?.trim() || !editData?.email?.trim()) {
      return toast.error("Name and email cannot be empty!");
    }

    if (!editData.company_id) {
      return toast.error("Please select a company!");
    }

    if (editData.password?.trim() && editData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }

    const updatedData = { 
      id, 
      name: editData.name, 
      email: editData.email,
      company_id: editData.company_id 
    };
    
    if (editData.password?.trim()) {
      updatedData.password = editData.password;
    }

    dispatch(updateSupplier(updatedData))
      .then(() => {
        toast.success("Supplier updated successfully!");
        navigate("/dashboard/suppliers");
      })
      .catch((error) => {
        if (error && typeof error === 'object' && Object.keys(error).length > 0) {
          const errors = error;
          Object.keys(errors).forEach((key) => {
            errors[key].forEach((message) => {
              toast.error(`${key}: ${message}`);
            });
          });
        } else {
          const errorMessage = error?.response?.data?.message || error?.message || "Failed to update supplier.";
          toast.error(errorMessage);
        }
      });
  };

  return { supplier, isLoading, error, editData, setEditData, handleSave, navigate, companies };
};

export default useSupplierDetails;
