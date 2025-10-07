import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Check,
  X,
  SendHorizonal,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetCommentsQuery,
  useStoreCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "@/services/endpoints/commentEndpoints";
import { RootState } from "@/store";

const TaskComments = ({
  taskId,
  currentUserId,
}: {
  taskId: number;
  currentUserId: number;
}) => {
  const { data: comments = [], isLoading } = useGetCommentsQuery(
    { taskId },
    { skip: !taskId },
  );
  const [storeComment] = useStoreCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const username = useSelector((state: RootState) => state.auth.user.name);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await storeComment({ taskId, comment: newComment });
      setNewComment("");
    }
  };

  const handleUpdateComment = async () => {
    if (editingComment) {
      await updateComment({
        taskId,
        commentId: editingComment.id,
        newComment: editingComment.text,
      });
      setEditingComment(null);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment({ taskId, commentId });
  };

  return (
    <div>
      <label className="text-sm font-medium">Activity</label>
      <CardContent className="rounded-[3px] mt-2">
        <div
          className={`max-h-[135px] bg-gray-100 ${comments.length && "p-2"} overflow-y-auto space-y-2`}>
          {isLoading ? (
            <p className="text-gray-500 text-[12px]"></p>
          ) : (
            comments.map((comment) =>
              editingComment && editingComment.id !== comment.id ? null : (
                <div
                  key={comment.id}
                  className="flex items-start space-x-3 p-2 bg-white rounded-[3px] shadow-sm min-h-[30px] relative">
                  <Avatar className="w-8 h-8 bg-gray-500 rounded-full flex justify-center items-center">
                    <AvatarImage className="rounded-full bg-contain" />
                    <AvatarFallback className="text-white text-[14px]">
                      {comment.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500 font-semibold">
                      {comment.user.name}
                    </p>
                    {editingComment?.id === comment.id ? (
                      <Textarea
                        value={editingComment.text}
                        onChange={(e) =>
                          setEditingComment({
                            ...editingComment,
                            text: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-[3px] p-2"
                      />
                    ) : (
                      <p className="text-gray-700 break-words text-sm leading-relaxed max-w-[90%] overflow-hidden">
                        {comment.comment}
                      </p>
                    )}
                    {editingComment?.id === comment.id && (
                      <div className="flex justify-end space-x-1 mt-1">
                        <Button
                          type="button"
                          size="icon"
                          onClick={handleUpdateComment}
                          className="bg-green-600 hover:bg-green-700 p-1 h-6 w-6 flex items-center justify-center rounded-md">
                          <Check className="w-3 h-3 text-white" />
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => setEditingComment(null)}
                          className="bg-gray-400 hover:bg-gray-500 p-1 h-6 w-6 flex items-center justify-center rounded-md">
                          <X className="w-3 h-3 text-white" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {comment.user.id === currentUserId &&
                    editingComment?.id !== comment.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="absolute top-2 right-2 p-1 h-8 w-8 flex items-center justify-center">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-32 bg-white">
                          <DropdownMenuItem
                            className="hover:bg-gray-300"
                            onClick={() =>
                              setEditingComment({
                                id: comment.id,
                                text: comment.comment,
                              })
                            }>
                            <Pencil className="w-4 h-4 mr-2 hover:bg-gray-30 " />{" "}
                            <span className="font-primary">Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-600 hover:bg-gray-300">
                            <Trash2 className="w-4 h-4 mr-2 " />
                            <span className="font-primary">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                </div>
              ),
            )
          )}
        </div>
        <div className={`mt-2 ${comments.length && "pt-2"} pb-2 bg-white`}>
          <div className="flex items-center space-x-2 h-10">
            <Avatar className="w-8 h-8 bg-gray-500 rounded-full flex justify-center items-center">
              <AvatarImage className="rounded-full bg-contain" />
              <AvatarFallback className="text-white text-[14px]">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border h-10 border-gray-300 rounded-md"
            />
            <SendHorizonal
              onClick={handleAddComment}
              className="w-6 h-6 flex text-gray-800 justify-center cursor-pointer items-center hover:text-gray-400"
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default TaskComments;
