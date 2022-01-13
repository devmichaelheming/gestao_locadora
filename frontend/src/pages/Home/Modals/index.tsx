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

import { locacoesProps, filmesProps, clientesProps } from "../index";

type Props = {
  action: boolean
  setModal: (action: boolean) => void;
  dataEdit?: locacoesProps;
}

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YYYY'];

const ModalFormulario = function ({ action, setModal, dataEdit }: Props) {
  const [form] = Form.useForm();
  const [clientes, setClientes] = useState<clientesProps[]>([]);
  const [filmes, setFilmes] = useState<filmesProps[]>([]);

  const onCreate = (values: any) => {
    const { date, filme, cliente } = values;
    let date_locacao = moment(date[0]).format('L');
    let date_devolucao = moment(date[1]).format('L');

    console.log(date_locacao, date_devolucao);

    // let momentDateLocacao = moment(date).format();

    // let splitMomentLocacao = momentDateLocacao.split('T');
    // let splitDateLocacao = splitMomentLocacao[0].split('-');

    // let anoLocacao = splitDateLocacao[0];
    // let mesLocacao = splitDateLocacao[1];
    // let diaLocacao = splitDateLocacao[2];

    // let momentDateDevolucao = moment(date).format();

    // let splitMomentDevolucao = momentDateDevolucao.split('T');
    // let splitDateDevolucao = splitMomentDevolucao[0].split('-');

    // let anoDevolucao = splitDateDevolucao[0];
    // let mesDevolucao = splitDateDevolucao[1];
    // let diaDevolucao = splitDateDevolucao[2];

    let data = {
      cliente: {
        id: cliente,
      },
      filme: {
        id: filme,
      },
      data_locacao: date_locacao,
      data_devolucao: date_devolucao
    }

    // if (dataEdit?.id) {
    //   api.put(`/locacoes/${dataEdit.id}`, data).then((res) => {
    //     Swal.fire({
    //       title: 'Cadastro efetuado com sucesso.',
    //       icon: 'success',
    //       confirmButtonText: 'Ok'
    //     }).then((response) => {
    //       if (response.value === true) {
    //         setModal(false)
    //       }
    //     })
    //   }).catch((err) => {
    //     Swal.fire({
    //       title: 'Erro ao concluir a ação.',
    //       icon: 'error',
    //       confirmButtonText: 'Ok'
    //     }).then((response) => {
    //       if (response.value === true) {
    //         setModal(false)
    //       }
    //     })
    //   });
    // } else {
    //   api.post('/locacoes', data).then((res) => {
    //     Swal.fire({
    //       title: 'Cadastro efetuado com sucesso.',
    //       icon: 'success',
    //       confirmButtonText: 'Ok'
    //     }).then((response) => {
    //       if (response.value === true) {
    //         setModal(false)
    //       }
    //     })
    //   }).catch((err) => {
    //     Swal.fire({
    //       title: 'Erro ao concluir a ação.',
    //       icon: 'error',
    //       confirmButtonText: 'Ok'
    //     }).then((response) => {
    //       if (response.value === true) {
    //         setModal(false)
    //       }
    //     })
    //   });
    // }
  };

  useEffect(() => {
    api.get('/clientes').then((res) => {
      setClientes(res.data.data);
    }).catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });

    api.get('/filmes').then((res) => {
      setFilmes(res.data.data);
    }).catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });
  }, [clientes, filmes]);

  return (
    <Modal
      title="Locação"
      centered
      visible={action}
      onCancel={() => setModal(false)}
      okText={dataEdit?.id ? "Atualizar" : "Cadastrar"}
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
          label="Clientes"
          rules={[{ required: true, message: 'Por favor, selecione o cliente!' }]}
        >
          <Select placeholder="selecione o cliente" size="large">
            {
              clientes.map(cliente => (
                <Option
                  value={cliente.id}
                  key={cliente.id}
                  selected
                >
                  {cliente.nome}
                </Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="filme"
          label="Filmes"
          rules={[{ required: true, message: 'Por favor, selecione o filme!' }]}
        >
          <Select placeholder="selecione um filme" size="large">
            {
              filmes.map(filme => (
                <Option
                  value={filme.id}
                  key={filme.id}
                >
                  {filme.titulo}
                </Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Período de locação"
          rules={[{ required: true, message: 'Por favor, selecione o período de locação!' }]}
        >
          <DatePicker.RangePicker size="large" format={dateFormatList} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export { ModalFormulario };