import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/features/actions/authAction";

const useAddAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
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

    const adminData = { ...formData, role: "admin" };

    try {
      await dispatch(registerUser(adminData)).unwrap();
      toast.success("Admin added successfully!");
      navigate("/dashboard/admin");
    } catch (error) {
      if (error && typeof error === 'object' && Object.keys(error).length > 0) {
        // Handle validation errors object
        const errors = error;
        Object.keys(errors).forEach(key => {
          errors[key].forEach(message => {
            toast.error(`${key}: ${message}`);
          });
        });
      } else {
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to add admin.";
        toast.error(errorMessage);
      }
    }
  };
  return { formData, handleChange, handleSubmit, isLoading };
};

export default useAddAdmin;
