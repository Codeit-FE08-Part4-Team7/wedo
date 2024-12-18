"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import T from "Type/Article";

import { Button } from "@/@common/Button";
import Textarea from "@/components/@common/Textarea";
import UserProfile from "@/components/user/Profile";
import { formatToDotDate } from "@/utils/convertDate";

import PatchAndDelete from "./PatchAndDelete";
import { actionPatchArticleComment } from "./action";

function Comment({
  comment,
  ArticleId,
  userId,
}: {
  comment: T.Comment;
  ArticleId: string;
  userId: number;
}) {
  const [reWrite, setReWrite] = useState(false);
  const [commentValue, setCommentValue] = useState(comment.content);

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const param = {
      content: commentValue,
    };

    actionPatchArticleComment(
      { articleId: ArticleId, commentId: `${comment.id}` },
      param,
    );

    setReWrite(false);
  };

  return (
    <article className="flex w-full flex-col gap-y-8 rounded-xl bg-primary-light p-4 tab:px-6 tab:py-5">
      {reWrite ? (
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            defaultValue={commentValue}
            autoFocus
            onChange={handleChangeContent}
          />

          <footer className="flex justify-between">
            <div className="flex items-center gap-x-4">
              <UserProfile
                profileImage={comment.writer.image as string | null}
                nickname={comment.writer.nickname}
              />

              <hr className="h-4 w-px border-0 bg-slate-700" />

              <time className="xs-medium text-secondary-light tab:md-medium">
                {formatToDotDate(comment.createdAt)}
              </time>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="transparent"
                size="sm"
                className="border-none"
                onClick={() => {
                  setReWrite(false);
                }}
              >
                취소
              </Button>

              <Button type="submit" variant="outline" size="sm">
                수정하기
              </Button>
            </div>
          </footer>
        </form>
      ) : (
        <>
          <div>
            {comment.writer.id === userId && (
              <div className="float-end">
                <PatchAndDelete
                  id={{ articleId: ArticleId, commentId: `${comment.id}` }}
                  section="comment"
                  setState={setReWrite}
                />
              </div>
            )}

            <p>{comment.content}</p>
          </div>

          <footer className="flex justify-between">
            <div className="flex items-center gap-x-4">
              <UserProfile
                profileImage={comment.writer.image as string | null}
                nickname={comment.writer.nickname}
              />

              <hr className="h-4 w-px border-0 bg-slate-700" />

              <time className="xs-medium text-secondary-light tab:md-medium">
                {formatToDotDate(comment.createdAt)}
              </time>
            </div>
          </footer>
        </>
      )}
    </article>
  );
}

export default function CommentList({
  comments,
  articleId,
  userId,
}: {
  comments: T.Comments;
  articleId: string;
  userId: number;
}) {
  return (
    <ol className="flex flex-col gap-y-4">
      {comments.list.map((comment: T.Comment) => (
        <li key={comment.id}>
          <Comment
            key={comment.id}
            ArticleId={articleId}
            comment={comment}
            userId={userId}
          />
        </li>
      ))}
    </ol>
  );
}
