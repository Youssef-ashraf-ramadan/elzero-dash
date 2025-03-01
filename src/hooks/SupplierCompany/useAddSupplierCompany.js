import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/features/actions/authAction";

const useAddSupplierCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  // Only keep the 'name' field in the state
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = { name: formData.name, role: "supplier_company" };

    try {
      await dispatch(registerUser(supplierData)).unwrap();
      toast.success("Supplier company added successfully!");
      navigate("/dashboard/suppliers-companies");
    } catch (error) {
      if (error && typeof error === "object" && Object.keys(error).length > 0) {
        // Handle validation errors object
        const errors = error;
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((message) => {
            toast.error(`${key}: ${message}`);
          });
        });
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to add Supplier.";
        toast.error(errorMessage);
      }
    }
  };

  return { formData, handleChange, handleSubmit, isLoading };
};

export default useAddSupplierCompany;
