import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { PostFeed } from "@/components/Post/Feed";
import { Suspense } from "react";
import { SkeletonItem } from "./tweet-loading";

export default function Home() {
  return (
    <>
      <Header label="Home" />;
      <Form placeholder="What's happening?" />
      <Suspense fallback={<SkeletonItem />}>
        <PostFeed />
      </Suspense>
    </>
  );
}
