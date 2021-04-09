import Modal from "react-modal";

export const CenteredModalOptions: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "burlywood",
    border: "none",
    borderRadius: 10,
    maxWidth: 500,
  },
  overlay: {
    backgroundColor: "rgb(0, 0, 0, .45)",
    zIndex: 999,
  },
};
