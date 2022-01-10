import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Select,
  DatePicker,
} from 'antd';
import moment from "moment";

import Swal from 'sweetalert2'

const { Option } = Select;
const { RangePicker } = DatePicker;

import api from "services/api";

import { clientesProps } from "pages/Clientes";
import { filmesProps } from "pages/Filmes";

type Props = {
  action: boolean
  setModal: (action: boolean) => void;
}

const ModalFormulario = function ({ action, setModal }: Props) {
  const [form] = Form.useForm();
  const [clientes, setClientes] = useState<clientesProps[]>([]);
  const [filmes, setFilmes] = useState<filmesProps[]>([]);

  const onCreate = (values: any) => {
    const { date, filme, cliente } = values;
    let date_locacao = moment(date[0]).format('L');
    let date_devolucao = moment(date[1]).format('L');

    let data = {
      id_cliente: cliente,
      id_filme: filme,
      data_locacao: date_locacao,
      data_devolucao: date_devolucao
    }

    api.post('/locacao', data).then((res) => {
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

  useEffect(() => {
    api.get('/cliente').then((res) => {
      setClientes(res.data.data);
    }).catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });
  }, [clientes]);

  useEffect(() => {
    api.get('/filme').then((res) => {
      setFilmes(res.data.data);
    }).catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });
  }, [clientes]);

  return (
    <Modal
      title="Locação"
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
          name="cliente"
          label="Cliente"
          rules={[{ required: true, message: 'Por favor, selecione um cliente!' }]}
        >
          <Select placeholder="selecione o cliente">
            {
              clientes.map(cliente => (
                <Option value={cliente.id} key={cliente.id}>{cliente.nome}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="filme"
          label="Filme"
          rules={[{ required: true, message: 'Por favor, selecione um filme!' }]}
        >
          <Select placeholder="selecione um filme">
            {
              filmes.map(filme => (
                <Option value={filme.id} key={filme.id}>{filme.titulo}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Período de locação"
          rules={[{ required: true, message: 'Por favor, selecione o período de locação!' }]}
        >
          <DatePicker.RangePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export { ModalFormulario };