import { useState } from "react";

const Reply = ({ currentUser, newReply, setnewReply, update, setUpdate }) => {
  const [reply, setReply] = useState("");
  const { image } = currentUser;
  const { id, user, replies } = newReply;
  const [replyingTo, setReplyingTo] = useState();

  const replyButton = (e) => {
    e.preventDefault();
    if (!reply) return;
    const recentReply = {
      id: 20,
      content: reply,
      createdAt: "few seconds ago",
      score: 1,
      replyingTo: user.username,
      user: currentUser,
    };

    const newUpdate = update.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          replies: [recentReply, ...d.replies],
        };
      }
      if (d.id !== id) {
        const { replies } = d;

        let newReply = replies.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              replies: [recentReply],
            };
          }
          return r;
        });

        return {
          ...d,
          replies: newReply,
        };
      }
      return d;
    });
    let result = newUpdate;
    setUpdate(result);
    console.log(result);
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
