import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSupplier, getAllSuppliers } from "../../redux/features/actions/supplierAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteSupplierCompany, getAllSupplierCompanys } from './../../redux/features/actions/supplierCompanyAction';


const useSuppliersCompany = () => {
    const dispatch = useDispatch();
    const { suppliers, isLoading, error } = useSelector((state) => state.supplierCompanies);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllSupplierCompanys());
    }, [dispatch,]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteSupplierCompany(id)).unwrap();
            toast.success("Supplier Company deleted successfully!");
            dispatch(getAllSupplierCompanys());
        } catch (error) {
            toast.error("Failed to delete Supplier!");
        }
    };

    return { suppliers, isLoading, error, handleDelete, navigate };
};

export default useSuppliersCompany;
