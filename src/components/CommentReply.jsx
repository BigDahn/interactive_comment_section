import Edit from "./Edit";
import Replies from "./Replies";
import Reply from "./Reply";

const CommentReply = ({
  replies,
  edit,
  editId,
  decreaseButton,
  increaseButton,
  replydeleteButton,
  editButton,
  replyComment,
  newReply,
  setnewReply,
  currentUser,
  setedit,
  setUpdate,
  comments,
  commmentreply,
  setcommmentreply,
}) => {
  return (
    <div className="flex flex-col items-center ml-6 lg:ml-16 gap-2 lg:gap-3 lg:pb-3 py-2">
      {replies.map((reply) => {
        const { content, id, createdAt, score, replyingTo, user, replies } =
          reply;
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
                        className=" flex items-center gap-2 cursor-pointer text-[#5457b6]"
                        onClick={() => replyComment(id)}
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
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 justify-between ">
                      <div className="flex gap-2">
                        <img
                          src={user.image.png}
                          alt="img"
                          height={20}
                          width={24}
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
                        className="hidden lg:flex lg:items-center lg:gap-2 lg:cursor-pointer lg:text-[#5457b6]"
                        onClick={() => replyComment(id)}
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
                      currentUser={currentUser}
                      content={content}
                      comments={comments}
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
            {newReply?.id === id && (
              <Reply
                currentUser={currentUser}
                newReply={newReply}
                setnewReply={setnewReply}
                commmentreply={commmentreply}
                setcommmentreply={setcommmentreply}
                comments={comments}
                setUpdate={setUpdate}
              />
            )}
            <Replies
              replies={replies}
              edit={edit}
              editId={editId}
              decreaseButton={decreaseButton}
              increaseButton={increaseButton}
              replydeleteButton={replydeleteButton}
              editButton={editButton}
              replyComment={replyComment}
              currentUser={currentUser}
              comments={comments}
              setUpdate={setUpdate}
              setedit={setedit}
            />
          </section>
        );
      })}
    </div>
  );
};

export default CommentReply;
