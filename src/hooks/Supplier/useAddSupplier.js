import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/features/actions/authAction";
import { getAllSupplierCompanys } from "../../redux/features/actions/supplierCompanyAction";

const useAddSupplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const { suppliers } = useSelector((state) => state.supplierCompanies);
  const companies = suppliers || [];

  useEffect(() => {
    dispatch(getAllSupplierCompanys());
  }, [dispatch]);
  console.log("Companies:", companies);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    company_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.company_id) {
      toast.error("Please select a company!");
      return;
    }

    const supplierData = { ...formData, role: "supplier" };

    try {
      await dispatch(registerUser(supplierData)).unwrap();
      toast.success("supplier added successfully!");
      navigate("/dashboard/suppliers");
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

  return { formData, handleChange, handleSubmit, isLoading, companies };
};

export default useAddSupplier;
