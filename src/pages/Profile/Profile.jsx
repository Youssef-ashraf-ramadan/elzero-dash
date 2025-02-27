import React from "react";
import Skeleton from "react-loading-skeleton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import useProfile from './../../hooks/Auth/useProfile';

const ProfilePage = () => {
  const { profile, isLoading, error } = useProfile();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Profile</h2>

      {isLoading ? (
        <Skeleton height={200} />
      ) : error ? (
        <p className="text-danger text-center">Error: {error.message}</p>
      ) : (
        <div className="card text-center p-4 shadow-sm">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt="Profile Avatar"
              className="rounded-circle mb-3"
              width={100}
              height={100}
            />
          ) : (
            <Skeleton circle height={100} width={100} />
          )}

          <h4>{profile?.name || <Skeleton width={120} />}</h4>
          <p className="text-muted">{profile?.email || <Skeleton width={180} />}</p>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ProfilePage;
