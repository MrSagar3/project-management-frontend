import { useSelector } from "react-redux";

import { Header, PrimaryLabel } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/store";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <Header title={user?.name} description="View your information here" />
      </div>

      <div className="space-y-6 mt-6 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b">
          <div className="sm:col-span-7">
            <Avatar className="w-24 h-24 bg-gray-400 rounded-full">
              <AvatarImage
                className="rounded-full object-cover"
                src={user?.logo}
                alt={user?.name}
              />
              <AvatarFallback className="text-4xl font-semibold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel
              labelText="User ID"
              id="fullname"
              className="text-md"
            />
          </div>
          <div className="sm:col-span-7">
            <p className="text-md">{user?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel
              labelText="Username"
              id="username"
              className="text-md"
            />
          </div>
          <div className="sm:col-span-7 flex items-center">
            <p className="text-md">{user?.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4">
          <div className="sm:col-span-2">
            <PrimaryLabel labelText="Email" id="email" className="text-md" />
          </div>
          <div className="sm:col-span-7">
            <p className="text-md">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
