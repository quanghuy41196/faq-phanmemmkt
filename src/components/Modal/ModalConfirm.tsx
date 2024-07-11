"use client";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react";
import ButtonFlowbite from "../ButtonFlowbite";

interface ModalConfirmProps {
  title?: string | ReactNode;
  children?: string | ReactNode;
  isShow?: boolean;
  setIsShow?: Dispatch<SetStateAction<boolean>>;
  onCancel?: () => void;
  onChange?: (mutate?: UseMutateFunction<any, Error, any, unknown>) => void;
  CallAPi?: () => UseMutationResult<any, Error, any, unknown>;
  onSuccess?: () => void;
}

const ModalConfirm: FC<ModalConfirmProps> = ({
  title = "Thông báo",
  children = "Bạn có chắc chắn muốn xóa không?",
  isShow,
  setIsShow,
  onCancel,
  onChange,
  CallAPi,
  onSuccess,
}) => {
  const { mutate, isPending, status } = (CallAPi && CallAPi()) ?? {};

  const handleClose = () => {
    if (isPending) return;
    setIsShow && setIsShow(false);
    onCancel && onCancel();
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      if (status === "success") {
        onSuccess && onSuccess();
      }
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Modal show={isShow} onClose={handleClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="flex justify-end">
        <ButtonFlowbite
          color="failure"
          onClick={handleClose}
          disabled={isPending}
        >
          Hủy
        </ButtonFlowbite>
        <ButtonFlowbite
          color="blue"
          isProcessing={isPending}
          onClick={() => {
            onChange && onChange(mutate);
          }}
        >
          Đồng ý
        </ButtonFlowbite>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
