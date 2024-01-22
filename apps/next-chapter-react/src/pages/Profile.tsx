import { BaseLayout } from "layouts";
import { useUser } from "@clerk/clerk-react";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <BaseLayout>
      <div className="flex items-center flex-col py-4">
        {user?.imageUrl && (
          <Avatar className="w-32 h-32" src={user?.imageUrl} alt="Avatar" />
        )}
        <p>{user?.emailAddresses[0]?.emailAddress}</p>
      </div>
    </BaseLayout>
  );
};

export default Profile;
