import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/actions/authAction";
import toast from "react-hot-toast";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, isLoading, error } = useSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!credentials.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginUser(credentials));
    }
  };

  useEffect(() => {
    if (admin&&admin.role === 'admin') {
        toast.success("Welcome Admin")
      
      navigate("/dashboard/admin");
    }
  }, [admin, navigate]);

  return { credentials, errors, handleChange, handleSubmit, isLoading, error };
};

export default useLogin;
