import React from 'react';
import {
  Modal,
  Form,
  DatePicker,
  Input
} from 'antd';
import MaskedInput from 'antd-mask-input'

import Swal from 'sweetalert2'

import moment from "moment";

import api from "services/api";

type Props = {
  action: boolean
  setModal: (action: boolean) => void;
}

const ModalFormulario = function ({ action, setModal }: Props) {
  const [form] = Form.useForm();

  const onCreate = (values: any) => {
    const { nome, cpf, date } = values;
    let data_nascimento = moment(date).format('L');

    let data = {
      nome: nome,
      cpf: cpf,
      data_nascimento: data_nascimento,
    }

    api.post('/clientes', data).then((res) => {
      Swal.fire({
        title: 'Cadastro efetuado com sucesso.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((response) => {
        if (response.value === true) {
          setModal(false)
        }
      })
    }).catch((err) => {
      Swal.fire({
        title: 'Erro ao concluir a ação.',
        icon: 'error',
        confirmButtonText: 'Ok'
      }).then((response) => {
        if (response.value === true) {
          setModal(false)
        }
      })
    });
  };

  return (
    <Modal
      title="Cliente"
      centered
      visible={action}
      onCancel={() => setModal(false)}
      okText="Cadastrar"
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="nome"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira o nome do cliente!' }]}
        >
          <Input size="large"/>
        </Form.Item>

        <Form.Item
          name="cpf"
          label="Cpf"
          rules={[{ required: true, message: 'Por favor, insira o cpf do cliente!' }]}
        >
          <MaskedInput minLength={10} mask="111.111.111-11" size="large"/>
        </Form.Item>

        <Form.Item
          name="date"
          label="Data de nascimento"
          rules={[{ required: true, message: 'Por favor, selecione a data de nascimento!' }]}
        >
          <DatePicker size="large"/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export { ModalFormulario };