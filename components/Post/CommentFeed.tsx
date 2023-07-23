import { PostCommentItem } from "./CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

export const PostCommentFeed: React.FC<CommentFeedProps> = ({
  comments = [],
}) => {
  return (
    <>
      {comments.map((comment) => (
        <PostCommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};
