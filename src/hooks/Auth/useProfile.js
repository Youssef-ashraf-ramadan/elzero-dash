import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/features/actions/authAction";

const useProfile = () => {
  const dispatch = useDispatch();
  const { profile, isLoading, error } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);


  return { profile, isLoading, error };

}

export default useProfile;
