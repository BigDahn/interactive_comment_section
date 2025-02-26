import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import Loading from "./components/Loading";

const url = "data.json";
const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState({});
  const [deleteId, setDeleteId] = useState();
  const [commmentreply, setcommmentreply] = useState([]);
  const [loading, setLoading] = useState(true);

  const display = async () => {
    let data = "";
    try {
      setLoading(true);
      const response = await fetch(url);
      data = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdate(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    display();
  }, []);

  const replydeleteButton = (id) => {
    setDeleteId(id);
    setOpenModal(true);
  };
  const delete_and_close = () => {
    const { currentUser, comments } = update;
    let newCommentreply = commmentreply.filter(
      (reply) => reply.id !== deleteId
    );
    setcommmentreply(newCommentreply);
    setUpdate({
      currentUser,
      comments: comments
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
        .filter((post) => post.id !== deleteId),
    });
    setOpenModal(false);
    // Remove the main post if it matches the id
  };

  if (loading) {
    return <Loading />;
  }

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
