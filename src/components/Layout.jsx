import { useEffect, useState } from "react";
import { comments, currentUser } from "../../data.json";
import Input from "./Input";
import Reply from "./Reply";

const Layout = () => {
  const [update, setUpdate] = useState(comments);
  const [newReply, setnewReply] = useState();

  const replyButton = (id) => {
    const Reply = update.find((user) => {
      if (user.id === id) {
        return user;
      }
    });

    setnewReply(Reply);
  };

  const replyComment = (id) => {
    update.map((comment) => {
      const { replies } = comment;
      replies.filter((reply) => {
        if (reply.id === id) {
          setnewReply(reply);
        }
      });
    });
  };

  const editButton = (id) => {
    console.log(id);
  };

  const deleteButton = (id) => {
    console.log(id);
  };

  const increaseButton = (id) => {
    const newComment = update.filter((comment) => {
      comment.replies.filter((reply) => {
        reply?.replies?.filter((replyReply) => {
          if (replyReply.id === id)
            return {
              ...replyReply,
              score: replyReply.score++,
            };
          return replyReply;
        });
        if (reply.id === id)
          return {
            ...reply,
            score: reply.score++,
          };
        return reply;
      });
      if (comment.id === id) {
        return {
          ...comment,
          score: comment.score++,
        };
      }
      return comment;
    });

    setUpdate(newComment);
  };

  const decreaseButton = (id) => {
    const newComments = update.filter((comment) => {
      comment.replies.filter((reply) => {
        reply?.replies?.filter((replyReply) => {
          if (replyReply.id === id)
            return {
              ...replyReply,
              score: replyReply.score <= 1 ? 1 : replyReply.score--,
            };
          return replyReply;
        });
        if (reply.id === id)
          return {
            ...reply,
            score: reply.score <= 1 ? 1 : reply.score--,
          };
        return reply;
      });
      if (comment.id === id) {
        return {
          ...comment,
          score: comment.score <= 1 ? 1 : comment.score--,
        };
      }
      return comment;
    });

    setUpdate(newComments);
  };

  return (
    <main className="grid gap-3 py-5">
      {update.map((comment) => {
        const { id, content, createdAt, score, user, replies } = comment;

        return (
          <>
            <section className="flex flex-col gap-3">
              <section
                key={id}
                className="flex items-center gap-3 px-4 py-2 w-[30rem] bg-white  rounded-md"
              >
                <div className="bg-[#eaecf1] flex flex-col  gap-3 items-center justify-center h-20 w-12 rounded-sm py-2 ">
                  <button
                    className="cursor-pointer"
                    onClick={() => increaseButton(id)}
                  >
                    <img src="/Images/Icons/icon-plus.svg" />
                  </button>
                  <p className="text-lg font-extrabold text-center text-[#5457b6]">
                    {score}
                  </p>
                  <button
                    className="cursor-pointer"
                    onClick={() => decreaseButton(id)}
                  >
                    <img src="/Images/Icons/icon-minus.svg" />
                  </button>
                </div>

                <div className="w-full ">
                  <article className="flex justify-between items-center">
                    <div className="grid gap-5">
                      <div className="flex gap-2 ">
                        <img
                          src={user.image.png}
                          alt="img"
                          height={20}
                          width={20}
                        />
                        <p>{user.username}</p>
                        {user.username === "juliusomo" ? (
                          <p className="bg-[#5457b6] rounded-sm h-[18px] px-1.5 font-black text-white text-[13px]">
                            You
                          </p>
                        ) : (
                          ""
                        )}
                        <p>{createdAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      {user.username === "juliusomo" ? (
                        <button
                          className="flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black"
                          onClick={() => deleteButton(id)}
                        >
                          {" "}
                          <img src="/Images/Icons/icon-delete.svg" /> Delete{" "}
                        </button>
                      ) : (
                        ""
                      )}
                      {user.username === "juliusomo" ? (
                        <button
                          className="flex gap-x-0.5 cursor-pointer text-[#5457b6] font-black"
                          onClick={() => editButton(id)}
                        >
                          {" "}
                          <img src="/Images/Icons/icon-edit.svg" /> Edit{" "}
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-2 cursor-pointer text-[#5457b6]"
                          onClick={() => replyButton(id)}
                        >
                          {" "}
                          <img src="/Images/Icons/icon-reply.svg" /> reply{" "}
                        </button>
                      )}
                    </div>
                  </article>

                  <p className="w-[23rem]  text-justify">{content}</p>
                </div>
              </section>
              {newReply?.id === id && (
                <Reply
                  currentUser={currentUser}
                  newReply={newReply}
                  setnewReply={setnewReply}
                  update={update}
                  setUpdate={setUpdate}
                />
              )}
              <div className="grid ml-16 gap-3 pt-2">
                {replies.map((reply) => {
                  const {
                    content,
                    id,
                    createdAt,
                    score,
                    replyingTo,
                    user,
                    replies,
                  } = reply;
                  return (
                    <section key={id} className="grid gap-3">
                      <div className="flex items-center gap-3 px-4 py-2 w-[30rem] bg-white  rounded-md">
                        <div className="bg-[#eaecf1] flex flex-col h-20 gap-3 items-center justify-center w-12 rounded-sm py-2 ">
                          <button
                            className="cursor-pointer"
                            onClick={() => increaseButton(id)}
                          >
                            <img src="/Images/Icons/icon-plus.svg" />
                          </button>
                          <p className="text-lg font-extrabold text-center text-[#5457b6]">
                            {score}
                          </p>
                          <button
                            className="cursor-pointer"
                            onClick={() => decreaseButton(id)}
                          >
                            <img src="/Images/Icons/icon-minus.svg" />
                          </button>
                        </div>
                        <div className="w-full ">
                          <article className="flex justify-between items-center">
                            <div className="grid gap-3">
                              <div className="flex items-center gap-2 ">
                                <img
                                  src={user.image.png}
                                  alt="img"
                                  height={0}
                                  width={20}
                                />
                                <p>{user.username}</p>
                                {user.username === "juliusomo" ? (
                                  <p className="bg-[#5457b6] rounded-sm h-[18px] px-1.5 font-black text-white text-[13px]">
                                    You
                                  </p>
                                ) : (
                                  ""
                                )}
                                <p>{createdAt}</p>
                              </div>
                            </div>
                            <div className="flex gap-5  ">
                              {user.username === "juliusomo" ? (
                                <button
                                  className="flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black"
                                  onClick={() => deleteButton(id)}
                                >
                                  {" "}
                                  <img src="/Images/Icons/icon-delete.svg" />{" "}
                                  Delete{" "}
                                </button>
                              ) : (
                                ""
                              )}
                              {user.username === "juliusomo" ? (
                                <button
                                  className="flex gap-x-0.5 cursor-pointer text-[#5457b6] font-black"
                                  onClick={() => editButton(id)}
                                >
                                  {" "}
                                  <img src="/Images/Icons/icon-edit.svg" /> Edit{" "}
                                </button>
                              ) : (
                                <button
                                  className="flex items-center gap-2 cursor-pointer text-[#5457b6]"
                                  onClick={() => replyComment(id)}
                                >
                                  {" "}
                                  <img src="/Images/Icons/icon-reply.svg" />{" "}
                                  reply{" "}
                                </button>
                              )}
                            </div>
                          </article>

                          <p className="w-[23rem]  text-justify">
                            {" "}
                            <span className="text-[#5457b6] font-extrabold">
                              @{replyingTo}
                            </span>{" "}
                            {content}
                          </p>
                        </div>
                      </div>
                      <div>
                        {replies?.map((d) => {
                          const {
                            content,
                            id,
                            createdAt,
                            score,
                            replyingTo,
                            user,
                          } = d;
                          return (
                            <section key={id} className="grid gap-3">
                              <div className="flex items-center gap-3 px-4 py-2 w-[30rem] bg-white  rounded-md">
                                <div className="bg-[#eaecf1] flex flex-col h-20 gap-3 items-center justify-center w-12 rounded-sm py-2 ">
                                  <button
                                    className="cursor-pointer"
                                    onClick={() => increaseButton(id)}
                                  >
                                    <img src="/Images/Icons/icon-plus.svg" />
                                  </button>
                                  <p className="text-lg font-extrabold text-center text-[#5457b6]">
                                    {score}
                                  </p>
                                  <button
                                    className="cursor-pointer"
                                    onClick={() => decreaseButton(id)}
                                  >
                                    <img src="/Images/Icons/icon-minus.svg" />
                                  </button>
                                </div>
                                <div className="w-full ">
                                  <article className="flex justify-between items-center">
                                    <div className="grid gap-3">
                                      <div className="flex items-center gap-2 ">
                                        <img
                                          src={user.image.png}
                                          alt="img"
                                          height={0}
                                          width={20}
                                        />
                                        <p>{user.username}</p>
                                        {user.username === "juliusomo" ? (
                                          <p className="bg-[#5457b6] rounded-sm h-[18px] px-1.5 font-black text-white text-[13px]">
                                            You
                                          </p>
                                        ) : (
                                          ""
                                        )}
                                        <p>{createdAt}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-5  ">
                                      {user.username === "juliusomo" ? (
                                        <button
                                          className="flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black"
                                          onClick={() => deleteButton(id)}
                                        >
                                          {" "}
                                          <img src="/Images/Icons/icon-delete.svg" />{" "}
                                          Delete{" "}
                                        </button>
                                      ) : (
                                        ""
                                      )}
                                      {user.username === "juliusomo" ? (
                                        <button
                                          className="flex gap-x-0.5 cursor-pointer text-[#5457b6] font-black"
                                          onClick={() => editButton(id)}
                                        >
                                          {" "}
                                          <img src="/Images/Icons/icon-edit.svg" />{" "}
                                          Edit{" "}
                                        </button>
                                      ) : (
                                        <button
                                          className="flex items-center gap-2 cursor-pointer text-[#5457b6]"
                                          onClick={() => replyComment(id)}
                                        >
                                          {" "}
                                          <img src="/Images/Icons/icon-reply.svg" />{" "}
                                          reply{" "}
                                        </button>
                                      )}
                                    </div>
                                  </article>

                                  <p className="w-[23rem]  text-justify">
                                    {" "}
                                    <span className="text-[#5457b6] font-extrabold">
                                      @{replyingTo}
                                    </span>{" "}
                                    {content}
                                  </p>
                                </div>
                              </div>
                            </section>
                          );
                        })}
                      </div>
                      {newReply?.id === id && (
                        <Reply
                          currentUser={currentUser}
                          newReply={newReply}
                          setnewReply={setnewReply}
                          update={update}
                          setUpdate={setUpdate}
                        />
                      )}
                    </section>
                  );
                })}
              </div>
            </section>
          </>
        );
      })}
      <Input currentUser={currentUser} setUpdate={setUpdate} update={update} />
    </main>
  );
};

export default Layout;
