import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSupplier, getAllSuppliers } from "../../redux/features/actions/supplierAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useSuppliers = () => {
    const dispatch = useDispatch();
    const { suppliers, isLoading, error } = useSelector((state) => state.suppliers);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllSuppliers());
    }, [dispatch,]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteSupplier(id)).unwrap();
            toast.success("Supplier deleted successfully!");
            dispatch(getAllSuppliers());
        } catch (error) {
            toast.error("Failed to delete Supplier!");
        }
    };

    return { suppliers, isLoading, error, handleDelete, navigate };
};

export default useSuppliers;
