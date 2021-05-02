import Modal from "react-modal";
import styled from "styled-components";

export const CenteredModalOptions: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "burlywood",
    border: "2px solid hsl(34, 57%, 60%)",
    borderRadius: 10,
    maxWidth: 500,
  },
  overlay: {
    backgroundColor: "rgb(0, 0, 0, .45)",
    zIndex: 999,
  },
};

export const ModalStyles = {
  Title: styled.div`
    font-family: inherit;
    font-size: 13pt;
    font-weight: 600;
    color: var(--color-secondary);
    margin-bottom: 5px;
  `,
  Message: styled.div`
    font-size: 9.5pt;
    font-weight: 600;
    color: brown;
    margin-bottom: 10px;
  `,
  ButtonContainer: styled.div`
    display: flex;
    flex-direction: row;
  `,
  SecondaryButton: styled.button`
    padding: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    margin-left: 10px;
    color: var(--color-secondary);
    font-family: inherit;
    font-weight: 500;
    font-size: 9pt;
    cursor: pointer;
  `,
};
