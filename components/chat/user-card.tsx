import { Avatar, AvatarImage } from "../ui/avatar";

import { UserCardProps } from "./types";
import { twMerge } from "tailwind-merge";

const UserCard = (props: UserCardProps) => {
  const { handleSelectUser, selectedUser, user } = props;

  const isSelected = selectedUser?._id === user._id;
  return (
    <div
      onClick={() => handleSelectUser(user)}
      className={twMerge(
        "flex items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover cursor-pointer",
        isSelected && "bg-sigBackgroundFeedHover"
      )}
    >
      <Avatar className="cursor-pointer hover:bg-sigBackgroundSecondaryHover">
        <AvatarImage src={user.avatar} />
      </Avatar>
      <span>{user.fullName}</span>
    </div>
  );
};
export default UserCard;
