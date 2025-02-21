import { useState } from "react";

const Reply = ({
  currentUser,
  newReply,
  setnewReply,
  update,
  setUpdate,
  setcommmentreply,
  commmentreply,
}) => {
  const [reply, setReply] = useState("");
  const { image } = currentUser;
  const { id, user } = newReply;

  const replyButton = (e) => {
    e.preventDefault();

    if (!reply) return;

    const timestamp = new Date();
    const timeDifference = Math.floor((Date.now() - timestamp) / 1000);
    let timeText;
    if (timeDifference < 60) {
      timeText = "few seconds ago";
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      timeText = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      timeText = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      timeText = `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    //const id = Math.floor(Math.random() * 4 + 5 * 2);
    const recentReply = {
      id: Date.now().toString(36) + Math.random().toString(36),
      content: reply,
      createdAt: timeText,
      score: 1,
      replyingTo: user.username,
      user: currentUser,
    };

    console.log(recentReply);

    let newUpdate = update.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [recentReply, ...comment.replies],
        };
      } else if (comment.id !== id) {
        comment.replies = comment.replies.map((reply) => {
          if (reply.id === id) {
            setcommmentreply([recentReply]);
            return {
              ...reply,
              replies: [recentReply, ...commmentreply],
            };
          }
          return reply;
        });
        return {
          ...comment,
          replies: [...comment.replies],
        };
      }
      return comment;
    });
    console.log(newUpdate);
    let result = newUpdate;
    setUpdate(result);
    setReply("");
    setnewReply();
  };

  return (
    <form className="flex items-start gap-3 px-4 py-3 w-[30rem] bg-white  rounded-md">
      <img src={image.png} alt="img" width={30} />
      <input
        className="w-full h-20 pb-13 pl-2 border-1 border-gray-200 outline-0  "
        placeholder={`@${user.username}`}
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button
        className="rounded-sm bg-[#5457b6] px-2 py-0.5 text-white uppercase font-black "
        onClick={replyButton}
      >
        Reply
      </button>
    </form>
  );
};

export default Reply;
