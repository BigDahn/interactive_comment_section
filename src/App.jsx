import { useState } from "react";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import { comments } from "../data.json";
const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState(comments);
  const [deleteId, setDeleteId] = useState();
  const [commmentreply, setcommmentreply] = useState([]);

  //console.log(update);
  const replydeleteButton = (id) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const delete_and_close = () => {
    let newUpdate = update
      .map((post) => {
        // Filter out replies with the given id
        post.replies = post.replies.filter((reply) => reply.id !== deleteId);

        // Filter replies inside nested replies (if any)
        post.replies = post.replies.map((reply) => {
          if (reply.replies && reply.replies.length > 0) {
            reply.replies = reply.replies.filter(
              (reply) => reply.id !== deleteId
            );
          }
          return reply;
        });

        return post;
      })
      .filter((post) => post.id !== deleteId);
    let newCommentreply = commmentreply.filter(
      (reply) => reply.id !== deleteId
    );
    setcommmentreply(newCommentreply);
    setUpdate(newUpdate);
    setOpenModal(false);
    // Remove the main post if it matches the id
  };

  return (
    <div className="grid place-items-center m-auto pt-2">
      <Layout
        update={update}
        setUpdate={setUpdate}
        replydeleteButton={replydeleteButton}
        commmentreply={commmentreply}
        setcommmentreply={setcommmentreply}
      />
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          delete_and_close={delete_and_close}
        />
      )}
    </div>
  );
};

export default App;
