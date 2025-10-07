import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import { Header } from "@/components";
import Invite from "@/components/form/Invite";
import { AvatarImage } from "@/components/ui/avatar";
import { useGetMemberByOrganizationQuery } from "@/services/endpoints/membersEndpoints";
import { RootState } from "@/store";
import { TAppContextType } from "@/types";

const MembersList = () => {
  const { setLoading } = useOutletContext<TAppContextType>();
  const userToken = useSelector((state: RootState) => state.auth.token);
  const selectedOrganization = useSelector(
    (state: RootState) => state.organizations.selectedOrganization,
  );
  const {
    data: members,
    error,
    isLoading,
  } = useGetMemberByOrganizationQuery(
    {
      organization_id: selectedOrganization?.id?.toString() || "",
      userToken: userToken || "",
    },
    { skip: !selectedOrganization || !userToken },
  );

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  if (error) {
    return <div className="text-red-500">Failed to load members</div>;
  }

  return (
    <div>
      <Header
        title="Members List "
        description="View all of your members here"
      />
      <div className="members-list bg-white p-5 rounded-lg shadow font-primary ml-4 text-sm ">
        <div className="flex justify-between ">
          <h2 className="text-xl  mb-4">Members - {members?.length}</h2>
          <Invite />
        </div>
        <div className="space-y-4">
          {members && members.length > 0 ? (
            members.map((member: any) => (
              <div
                key={member.id}
                className="flex items-center justify-between border p-3 rounded-md">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8 text-white bg-[#9F9F9F] rounded-full flex justify-center items-center">
                    <AvatarImage
                      className="rounded-full bg-contain"
                      src={member?.logo}
                      alt={member?.name}
                    />
                    <AvatarFallback className="text-[14px]">
                      {member?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium">{member.name}</span>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">
              No members found for this organization.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersList;
