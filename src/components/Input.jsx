import { useState } from "react";

const Input = ({ currentUser, setUpdate, comments }) => {
  const { image } = currentUser;

  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return null;

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

    setUpdate({
      currentUser,
      comments: [
        ...comments,
        {
          id: Date.now().toString(36) + Math.random().toString(36),
          content: content,
          createdAt: timeText,
          score: 1,
          replies: [],
          user: currentUser,
        },
      ],
    });
    setContent("");
  };

  return (
    <form className="grid w-[20rem] lg:flex items-start gap-3 px-4 py-3 lg:w-[30rem] bg-white  rounded-md">
      <img src={image.png} alt="img" width={30} className="hidden lg:flex" />
      <div className="order-last flex justify-between lg:hidden">
        <img src={image.png} alt="img" width={30} />
        <button
          className="rounded-sm bg-[#5457b6] px-2 py-0.5 text-white uppercase font-black  "
          onClick={handleSubmit}
        >
          send
        </button>
      </div>
      <textarea
        rows={3}
        cols={50}
        className="w-full overflow-hidden  rounded-sm  h-20 pb-13 pl-2 border-1 border-gray-200 outline-0  "
        placeholder="Add a comment..."
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="hidden lg:flex lg:rounded-sm bg-[#5457b6] px-2 py-0.5 text-white uppercase font-black  "
        onClick={handleSubmit}
      >
        send
      </button>
    </form>
  );
};

export default Input;
