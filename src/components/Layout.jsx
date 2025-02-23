import { useState } from "react";
import { currentUser } from "../../data.json";
import Input from "./Input";
import Reply from "./Reply";
import Edit from "./Edit";

const Layout = ({
  update,
  setUpdate,
  replydeleteButton,
  commmentreply,
  setcommmentreply,
}) => {
  const [newReply, setnewReply] = useState();

  const [edit, setedit] = useState(false);
  const [editId, seteditId] = useState();

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
    console.log(newReply);
  };

  const editButton = (id) => {
    setedit(true);
    seteditId(id);
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
    <main className="py-4 lg:gap-3  lg:py-5 ">
      {update.map((comment) => {
        const { id, content, createdAt, score, user, replies } = comment;

        return (
          <main key={id}>
            <section className="flex flex-col items-center gap-2  lg:flex-col lg:gap-3 ">
              <section
                key={id}
                className=" grid gap-2 px-3  lg:flex lg:items-center lg:gap-3 lg:px-4 py-2 lg:w-[30rem] bg-white  rounded-md"
              >
                {(edit && editId === id) || (
                  <div className="flex order-last justify-between items-center pl-6 lg:px-0 lg:order-first  h-10 lg:h-full">
                    <div className=" rotate-[90deg] lg:rotate-0 ">
                      <div className="bg-[#eaecf1] flex flex-col px-4 gap-3 items-center h-24  w-10 justify-center  lg:h-20 lg:w-12 rounded-sm lg:py-2 ">
                        <button
                          className="cursor-pointer rotate-[90deg] lg:rotate-0"
                          onClick={() => increaseButton(id)}
                        >
                          <img src="/Images/Icons/icon-plus.svg" />
                        </button>
                        <p className="text-lg font-extrabold text-center text-[#5457b6] rotate-[-90deg] lg:rotate-0">
                          {score}
                        </p>
                        <button
                          className="cursor-pointer rotate-[90deg] lg:rotate-0"
                          onClick={() => decreaseButton(id)}
                        >
                          <img src="/Images/Icons/icon-minus.svg" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-5 lg:hidden">
                      {user.username === "juliusomo" ? (
                        <button
                          className="flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black"
                          onClick={() => replydeleteButton(id)}
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
                          className="flex items-center gap-2 lg:cursor-pointer text-[#5457b6] "
                          onClick={() => replyButton(id)}
                        >
                          {" "}
                          <img src="/Images/Icons/icon-reply.svg" /> reply{" "}
                        </button>
                      )}
                    </div>
                  </div>
                )}

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
                    <div className="hidden lg:flex gap-5 items-center">
                      {user.username === "juliusomo" ? (
                        <button
                          className="flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black"
                          onClick={() => replydeleteButton(id)}
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
                          className="hidden lg:flex lg:items-center lg:gap-2 lg:cursor-pointer lg:text-[#5457b6] "
                          onClick={() => replyButton(id)}
                        >
                          {" "}
                          <img src="/Images/Icons/icon-reply.svg" /> reply{" "}
                        </button>
                      )}
                    </div>
                  </article>

                  <div>
                    {edit && editId === id ? (
                      <Edit
                        editId={editId}
                        setedit={setedit}
                        content={content}
                        update={update}
                        setUpdate={setUpdate}
                      />
                    ) : (
                      <p className=" w-[18rem] lg:w-[23rem]  text-justify">
                        {content}
                      </p>
                    )}
                  </div>
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
              <div className="flex flex-col items-center ml-6 lg:ml-16 gap-2 lg:gap-3 lg:pb-3 py-2">
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
                    <section key={id} className="grid gap-1">
                      <div className="grid gap-3 lg:flex items-center lg:gap-3 px-4 py-2 lg:w-[30rem] bg-white  rounded-md">
                        {(edit && editId === id) || (
                          <div className="flex order-last justify-between items-center pl-6 lg:px-0 lg:order-first  h-10 lg:h-full">
                            <div className=" rotate-[90deg] lg:rotate-0 ">
                              <div className="bg-[#eaecf1] flex flex-col px-4 gap-3 items-center h-24  w-10 justify-center  lg:h-20 lg:w-12 rounded-sm lg:py-2 ">
                                <button
                                  className="cursor-pointer rotate-[90deg] lg:rotate-0"
                                  onClick={() => increaseButton(id)}
                                >
                                  <img src="/Images/Icons/icon-plus.svg" />
                                </button>
                                <p className="text-lg font-extrabold text-center text-[#5457b6] rotate-[-90deg] lg:rotate-0">
                                  {score}
                                </p>
                                <button
                                  className="cursor-pointer rotate-[90deg] lg:rotate-0"
                                  onClick={() => decreaseButton(id)}
                                >
                                  <img src="/Images/Icons/icon-minus.svg" />
                                </button>
                              </div>
                            </div>

                            <div className="flex gap-5 lg:hidden">
                              {user.username === "juliusomo" ? (
                                <button
                                  className="flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black"
                                  onClick={() => replydeleteButton(id)}
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
                                  className=" flex items-center gap-2 cursor-pointer text-[#5457b6]"
                                  onClick={() => replyComment(id)}
                                >
                                  {" "}
                                  <img src="/Images/Icons/icon-reply.svg" />{" "}
                                  reply{" "}
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="w-full ">
                          <article className="flex justify-between items-center">
                            <div className="grid gap-3">
                              <div className="flex items-center gap-3 justify-between ">
                                <div className="flex gap-2">
                                  <img
                                    src={user.image.png}
                                    alt="img"
                                    height={0}
                                    width={20}
                                  />
                                  <p>{user.username}</p>
                                </div>
                                <div className="flex gap-3">
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
                            </div>
                            <div className="hidden lg:flex gap-5   ">
                              {user.username === "juliusomo" ? (
                                <button
                                  className="flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black"
                                  onClick={() => replydeleteButton(id)}
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
                                  className="hidden lg:flex lg:items-center lg:gap-2 lg:cursor-pointer lg:text-[#5457b6]"
                                  onClick={() => replyComment(id)}
                                >
                                  {" "}
                                  <img src="/Images/Icons/icon-reply.svg" />{" "}
                                  reply{" "}
                                </button>
                              )}
                            </div>
                          </article>
                          <div>
                            {edit && editId === id ? (
                              <Edit
                                editId={editId}
                                setedit={setedit}
                                content={content}
                                update={update}
                                setUpdate={setUpdate}
                              />
                            ) : (
                              <p className="w-[18rem]  lg:w-[23rem]  text-justify">
                                {" "}
                                <span className="text-[#5457b6] font-extrabold">
                                  @{replyingTo}
                                </span>{" "}
                                {content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-3 pt-2 ml-4">
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
                              <div className="grid lg:flex lg:items-center lg:gap-3 px-4 py-2 lg:w-[30rem] bg-white  rounded-md">
                                <div className="flex order-last justify-between items-center pl-6 lg:px-0 lg:order-first  h-10 lg:h-full">
                                  <div className=" rotate-[90deg] lg:rotate-0 ">
                                    <div className="bg-[#eaecf1] flex flex-col px-4 gap-3 items-center h-24  w-10 justify-center  lg:h-20 lg:w-12 rounded-sm lg:py-2 ">
                                      <button
                                        className="cursor-pointer rotate-[90deg] lg:rotate-0"
                                        onClick={() => increaseButton(id)}
                                      >
                                        <img src="/Images/Icons/icon-plus.svg" />
                                      </button>
                                      <p className="text-lg font-extrabold text-center text-[#5457b6] rotate-[-90deg] lg:rotate-0">
                                        {score}
                                      </p>
                                      <button
                                        className="cursor-pointer rotate-[90deg] lg:rotate-0"
                                        onClick={() => decreaseButton(id)}
                                      >
                                        <img src="/Images/Icons/icon-minus.svg" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-5 lg:hidden">
                                    {user.username === "juliusomo" ? (
                                      <button
                                        className="flex gap-x-0.5 items-center cursor-pointer  text-center text-red-600/65 font-black"
                                        onClick={() => replydeleteButton(id)}
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
                                        className="flex gap-x-0.5 items-center cursor-pointer text-[#5457b6] font-black"
                                        onClick={() => editButton(id)}
                                      >
                                        {" "}
                                        <img src="/Images/Icons/icon-edit.svg" />{" "}
                                        Edit{" "}
                                      </button>
                                    ) : (
                                      <button
                                        className=" flex items-center gap-2 cursor-pointer text-[#5457b6]"
                                        onClick={() => replyComment(id)}
                                      >
                                        {" "}
                                        <img src="/Images/Icons/icon-reply.svg" />{" "}
                                        reply{" "}
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <div className="w-full ">
                                  <article className="flex justify-between items-center">
                                    <div className="grid gap-3">
                                      <div className="flex items-center gap-3 justify-between ">
                                        <div className="flex gap-2">
                                          <img
                                            src={user.image.png}
                                            alt="img"
                                            height={0}
                                            width={20}
                                          />
                                          <p>{user.username}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
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
                                    </div>
                                    <div className="hidden lg:flex gap-5   ">
                                      {user.username === "juliusomo" ? (
                                        <button
                                          className="flex gap-x-0.5 items-center  cursor-pointer  text-center text-red-600/65 font-black"
                                          onClick={() => replydeleteButton(id)}
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
                                          className="flex gap-x-0.5 items-center cursor-pointer text-[#5457b6] font-black"
                                          onClick={() => editButton(id)}
                                        >
                                          {" "}
                                          <img src="/Images/Icons/icon-edit.svg" />{" "}
                                          Edit{" "}
                                        </button>
                                      ) : (
                                        <button
                                          className="hidden lg:flex lg:items-center lg:gap-2 lg:cursor-pointer lg:text-[#5457b6]"
                                          onClick={() => replyComment(id)}
                                        >
                                          {" "}
                                          <img src="/Images/Icons/icon-reply.svg" />{" "}
                                          reply{" "}
                                        </button>
                                      )}
                                    </div>
                                  </article>
                                  <p className="lg:w-[23rem]  text-justify">
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
                          commmentreply={commmentreply}
                          setcommmentreply={setcommmentreply}
                          update={update}
                          setUpdate={setUpdate}
                        />
                      )}
                    </section>
                  );
                })}
              </div>
            </section>
          </main>
        );
      })}
      <Input currentUser={currentUser} setUpdate={setUpdate} update={update} />
    </main>
  );
};

export default Layout;
