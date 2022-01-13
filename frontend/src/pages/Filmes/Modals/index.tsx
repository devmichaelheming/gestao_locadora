import React from 'react';
import {
  Modal,
  Form,
  DatePicker,
  Input,
} from 'antd';
import MaskedInput from 'antd-mask-input'
import Swal from 'sweetalert2'
import moment from "moment";

import api from "services/api";

type Props = {
  action: boolean
  setModal: (action: boolean) => void;
}

const dateFormatList = 'DD/MM/YYYY';

const ModalFormulario = function ({ action, setModal }: Props) {
  const [form] = Form.useForm();

  const onCreate = (values: any) => {
    const { titulo, classificacaoIndicativa, lancamento } = values;
    let momentDate = moment(lancamento).format();

    let splitMoment = momentDate.split('T');
    let splitDate = splitMoment[0].split('-');

    let ano = splitDate[0];
    let mes = splitDate[1];
    let dia = splitDate[2];

    let data = {
      titulo: titulo,
      classificacaoIndicativa: parseInt(classificacaoIndicativa),
      lancamento: `${dia}/${mes}/${ano}`,
    }

    api.post('/filmes', data).then((res) => {
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
      title="Filme"
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
          name="titulo"
          label="Titulo"
          rules={[{ required: true, message: 'Por favor, insira o titulo do filme!' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="classificacaoIndicativa"
          label="Classificação indicativa"
          rules={[{ required: true, message: 'Por favor, insira a classificação do filme!' }]}
        >
          <MaskedInput maxLength={2} mask="11" size="large"/>
        </Form.Item>

        <Form.Item
          name="lancamento"
          label="Data de lançamento"
          rules={[{ required: true, message: 'Por favor, selecione a data de lançamento!' }]}
        >
          <DatePicker size="large" format={dateFormatList} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export { ModalFormulario };