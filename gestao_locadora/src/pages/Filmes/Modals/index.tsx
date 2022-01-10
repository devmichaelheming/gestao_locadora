import React from 'react';
import { Modal } from 'antd';

type Props = {
    action: boolean
    setModal: (action: boolean) => void;
}

const ModalFormulario = function ({ action, setModal }: Props){
  return (
    <Modal
        title="Filme"
        centered
        visible={action}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
  );
}

export { ModalFormulario };