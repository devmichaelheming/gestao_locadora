import React, { useState } from 'react';
import {
  Modal,
  Form,
  Select,
  Button,
  DatePicker,
  Input
} from 'antd';
import moment from "moment";

import { clientes } from "../../Clientes/data";

const { Option } = Select;
const { RangePicker } = DatePicker;

type Props = {
  action: boolean
  setModal: (action: boolean) => void;
}

const ModalFormulario = function ({ action, setModal }: Props) {
  const [form] = Form.useForm();

  const onCreate = (values: any) => {
    const { date, filme, cliente } = values;
    let date_locacao = moment(date[0]).format('L');
    let date_devolucao = moment(date[1]).format('L');

    let data = {
      "cliente": cliente,
      "filme": filme,
      "data_locacao": date_locacao,
      "data_devolucao": date_devolucao,
    }

    console.log(data);
  };

  return (
    <Modal
      title="Cadastrar locação"
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
              clientes.map((item, index) => {
                <Option value={item.id}>item.nome</Option>
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="filme"
          label="Filme"
          rules={[{ required: true, message: 'Por favor, selecione um filme!' }]}
        >
          <Select placeholder="selecione um filme">
            <Option value="1">Batman vs Superman</Option>
            <Option value="2">Inocação do mal</Option>
            <Option value="3">Velozes e furiosos</Option>
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