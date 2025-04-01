import { useGetCurrentUser, useUpdateProfile } from "@/api/UserApi";
import UserProfileForm from "@/form/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateProfile();
  const { CurrentUser, isLoading: isGetLoading } = useGetCurrentUser();

  if (isGetLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
        <div>Loading Profile...</div>
      </div>
    );
  }

  if (!CurrentUser) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-semibold">
        Unable to load user profile. Please try again.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Your Profile
        </h2>
        <UserProfileForm 
          currentUser={CurrentUser} 
          onSave={updateUser} 
          isLoading={isUpdateLoading} 
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
