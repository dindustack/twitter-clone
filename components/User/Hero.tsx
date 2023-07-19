import Image from "next/image";
import { Avatar } from "../Avatar";

interface UserHeroProps {
  fetchedUser: any;
}

export const UserHero: React.FC<UserHeroProps> = ({
  fetchedUser,
}: UserHeroProps) => {
  return (
    <>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar isLarge hasBorder />
        </div>
      </div>
    </>
  );
};
