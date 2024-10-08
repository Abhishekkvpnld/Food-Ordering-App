import { useGetCurrentUser, useUpdateProfile } from "@/api/UserApi";
import UserProfileForm from "@/form/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateProfile();
  const { CurrentUser, isLoading: isGetLoading } = useGetCurrentUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!CurrentUser) {
    return <span>Unable to load user profile...</span>;
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center mt-8">
      <UserProfileForm currentUser={CurrentUser} onSave={updateUser} isLoading={isUpdateLoading} />
    </div>
  );
};

export default UserProfilePage;
