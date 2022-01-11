import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Button } from 'antd';
import Swal from 'sweetalert2'

import { ModalFormulario } from './Modals';

import { DeleteOutlined, EditOutlined, PlusOutlined } from 'styles/icons';

import { Container, ContainerTable } from './styles';

import api from "services/api";

export interface clientesProps {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: string
}

const Clientes = function () {
  const [modal, setModal] = useState(false);
  const [clientes, setClientes] = useState<clientesProps[]>([]);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Cpf', dataIndex: 'cpf', key: 'cpf' },
    {
      title: 'Data de nascimento',
      dataIndex: 'data_nascimento',
      key: 'data_nascimento',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (key: number) => (
        <div className="group-buttons">
          <button className="btn-action" onClick={() => handleEdit(key)}>
            <EditOutlined />
          </button>
          <button className="btn-action" onClick={() => handleDelete(key)}>
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  function handleShowForm(data?: number) {
    console.log(data);
    setModal(true);
  }

  function handleDelete(data: number) {
    console.log(data);
    alert('deletar');
  }

  function handleEdit(data: number) {
    console.log(data);
    setModal(true);
  }

  useEffect(() => {
    api.get('/cliente').then((res) => {
      setClientes(res.data.data);
    }).catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });
  }, [clientes]);

  return (
    <Container>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Clientes"
        subTitle="Informações dos clientes registrados"
        extra={[
          <Button
            type="primary"
            onClick={() => handleShowForm()}
            icon={<PlusOutlined />}
            size="large"
          >
            Novo
          </Button>
        ]}
      />
      <ContainerTable>
        <Table columns={columns} dataSource={clientes} />
      </ContainerTable>
      <ModalFormulario setModal={setModal} action={modal} />
    </Container>
  );
};

export { Clientes };
