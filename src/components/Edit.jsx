import { useState } from "react";

const Edit = ({ content, setedit, editId, update, setUpdate }) => {
  const [reEdit, setreEdit] = useState(content);

  const reEditbutton = (e) => {
    e.preventDefault();

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

    const newUpdate = update.map((d) => {
      if (d.id === editId) {
        return {
          ...d,
          content: reEdit,
          createdAt: timeText,
        };
      }
      let dw = d.replies.map((reply) => {
        if (reply.id === editId) {
          return {
            ...reply,
            content: reEdit,
            createdAt: timeText,
          };
        }
        return reply;
      });
      return {
        ...d,
        replies: [...dw],
      };
    });

    setUpdate(newUpdate);
    setedit(false);
  };
  return (
    <form className="grid gap-3 place-items-end pt-3">
      <textarea
        rows={3}
        cols={50}
        className="w-full overflow-hidden  rounded-sm h-20 pb-13 pl-3 pr-4 border-1 border-gray-200 outline-0"
        contentEditable="true"
        type="text"
        defaultValue={`${content}`}
        onChange={(e) => setreEdit(e.target.value)}
      />
      <button
        className="rounded-sm bg-[#5457b6] px-2 py-0.5 text-white uppercase font-black"
        onClick={reEditbutton}
      >
        Update
      </button>
    </form>
  );
};

export default Edit;
