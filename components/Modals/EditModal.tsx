"use client";
import { FormInput } from "../Form/Input";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useIndividualUser } from "@/hooks/useIndividualUser";
import useEditModal from "@/hooks/useEditModal";
import { ImageUpload } from "../ImageUpload";

export const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const editModal = useEditModal();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFetchedUser } = useIndividualUser(currentUser?.id);
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.profileImage,
    currentUser?.username,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        bio,
        coverImage,
        profileImage,
        name,
        username,
      });
      mutateFetchedUser();

      toast.success("Updated");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModal,
    mutateFetchedUser,
    profileImage,
    name,
    username,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />

      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload Cover Image"
      />
      <FormInput
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        disabled={isLoading}
      />
      <FormInput
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        disabled={isLoading}
      />
      <FormInput
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
