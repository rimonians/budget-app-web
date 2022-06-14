import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileInfo from "../components/Profile/ProfileInfo";
import useUser from "../hooks/useUser";
import Loading from "../components/Shared/Loading";
import ProfileImageUpdateModal from "../components/Profile/ProfileImageUpdateModal";
import ProfileInfoUpdateModal from "../components/Profile/ProfileInfoUpdateModal";

const Profile = () => {
  const { loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <ProfileHeader />
      <ProfileInfo />
      <ProfileImageUpdateModal />
      <ProfileInfoUpdateModal />
    </div>
  );
};

export default Profile;
