import { useIndividualUser } from "@/hooks/useIndividualUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
  profileImage?: string;
  userId?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  onProfilePage?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
  onProfilePage,
  profileImage,
}) => {
  const router = useRouter();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`
		${hasBorder ? "border-4 border-black" : ""}
${isLarge ? "h-32" : "h-12"}
${isLarge ? "w-32" : "w-12"}
${!onProfilePage && "hover:opacity-90 cursor-pointer"}
rounded-full
transition
relative
		`}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        sizes="100%"
        onClick={onClick}
        src={profileImage || "/images/placeholder.png"}
        className={`
        ${hasBorder ? "border-4 border-black" : ""}
        `}
      />
    </div>
  );
};
