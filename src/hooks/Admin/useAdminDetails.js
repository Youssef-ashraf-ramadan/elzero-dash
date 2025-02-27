import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminById, updateAdmin } from "../../redux/features/actions/adminAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useAdminDetails = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, isLoading, error } = useSelector((state) => state.admin);

  const [editData, setEditData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    dispatch(getAdminById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (admin) {
      setEditData({ name: admin.name, email: admin.email, password: "" });
    }
  }, [admin]);

  const handleSave = () => {
    if (!editData?.name?.trim() || !editData?.email?.trim()) {
      return toast.error("Name and email cannot be empty!", {
        duration: 3000,
        style: {
          background: '#ff4444',
          color: '#fff',
          padding: '12px'
        }
      });
    }

    if (editData.password?.trim() && editData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long!", {
        duration: 3000,
        style: {
          background: '#ff4444',
          color: '#fff',
          padding: '12px'
        }
      });
    }
  
    const updatedData = { id, name: editData.name, email: editData.email };
    
    if (editData.password?.trim()) {
      updatedData.password = editData.password;
    }
  
    dispatch(updateAdmin(updatedData))
      .then(() => {
        toast.success("Admin updated successfully!", {
          duration: 3000,
          style: {
            background: '#22c55e',
            color: '#fff',
            padding: '12px'
          }
        });
        navigate("/dashboard/admin");
      })
      .catch((error) => {
        if (error && typeof error === 'object' && Object.keys(error).length > 0) {
          Object.keys(error).forEach(key => {
            if (Array.isArray(error[key])) {
              error[key].forEach(message => {
                toast.error(`${key}: ${message}`, {
                  duration: 3000,
                  style: {
                    background: '#ff4444',
                    color: '#fff',
                    padding: '12px'
                  }
                });
              });
            } else {
              toast.error(`${key}: ${error[key]}`, {
                duration: 3000,
                style: {
                  background: '#ff4444',
                  color: '#fff',
                  padding: '12px'
                }
              });
            }
          });
        } else {
          const errorMessage = error?.response?.data?.message || error?.message || "Failed to update admin!";
          toast.error(errorMessage, {
            duration: 3000,
            style: {
              background: '#ff4444',
              color: '#fff',
              padding: '12px'
            }
          });
        }
      });
  };

  
  useEffect(() => {
    console.log("Updated admin in state:", admin);
    if (admin) {
      setEditData({ name: admin.name, email: admin.email, password: "" });
    }
  }, [admin]);
  

  return { admin, isLoading, error, editData, setEditData, handleSave, navigate };
};

export default useAdminDetails;