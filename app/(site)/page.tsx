"use client";

import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { PostFeed } from "@/components/Post/Feed";
import { Suspense } from "react";
import { SkeletonItem } from "./tweet-loading";
import { useSession } from "@/hooks/useSession";
import { AuthBlock } from "@/components/AuthBlock";

export default function Home() {
  const { data: currentUser } = useSession();

  if (!currentUser) {
    return <AuthBlock />;
  }

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <Suspense fallback={<SkeletonItem />}>
        {currentUser && <PostFeed />}
      </Suspense>
    </>
  );
}
