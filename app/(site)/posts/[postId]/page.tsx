"use client";

import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { PostItem } from "@/components/Post/Item";
import { usePost } from "@/hooks/usePost";
import { SkeletonItem } from "../../tweet-loading";

export default function PostView({ params }: { params: { postId: string } }) {
  const postId = params.postId;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return <SkeletonItem />;
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      {/* <CommentFeed comments={fetchedPost?.comments} /> */}
    </>
  );
}
