import { useUpdateProfile } from "@/api/UserApi";
import UserProfileForm from "@/form/user-profile-form/UserProfileForm";

const UserProfilePage = () => {

  const {updateUser,isLoading} = useUpdateProfile();

  return (
<div className="w-full h-[100vh] flex items-center justify-center mt-8">
<UserProfileForm onSave={updateUser} isLoading={isLoading}/>
</div>
  )
}

export default UserProfilePage;