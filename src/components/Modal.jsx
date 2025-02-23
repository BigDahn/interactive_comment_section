const Modal = ({ setOpenModal, delete_and_close }) => {
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <section className="fixed inset-0 grid place-items-center z-50  bg-black/30 shadow-md">
      <div className="bg-white rounded-sm w-80 px-6 h-52 py-4 flex flex-col gap-3.5    ">
        <h2 className="font-black text-[20px] text-gray-600">Delete Comment</h2>
        <p className="text-justify text-gray-500 font-black">
          Are you sure you want to delete this comment? This will remove the
          comment and can' t be undone.
        </p>
        <div className="flex justify-between">
          <button
            className="bg-gray-400 font-black cursor-pointer text-white px-5 rounded-sm py-1.5"
            onClick={closeModal}
          >
            No, Cancel
          </button>
          <button
            className="bg-red-500 font-black cursor-pointer text-white px-5 rounded-sm py-1.5"
            onClick={delete_and_close}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
