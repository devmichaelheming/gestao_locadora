import React, { useState } from 'react';
import { Table, PageHeader, Button } from 'antd';
import { ModalFormulario } from "./Modals";

import { data } from "./data";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "styles/icons";
import { Container, ContainerTable } from './styles';

const Home = function () {
  const [ modal, setModal ] = useState(false);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Filme', dataIndex: 'filme', key: 'filme' },
    { title: 'Data de locação', dataIndex: 'data_locacao', key: 'data_locacao' },
    { title: 'Data de devolução', dataIndex: 'data_devolucao', key: 'data_devolucao' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (key: number) => (
        <div className='group-buttons'>
          <button className='btn-action' onClick={() => handleShowForm(key)}><EditOutlined /></button>
          <button className='btn-action' onClick={() => handleDelete(key)}><DeleteOutlined /></button>
        </div>
      ),
    },
  ];

  function handleShowForm(data?: number) {
    console.log(data);
    setModal(true);
  }

  function handleDelete(data: number) {
    alert('deletar');
  }

  return (
    <Container>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Locações"
        subTitle="Informações das locações registradas"
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
        <Table
          columns={columns}
          dataSource={data}
        />
      </ContainerTable>
      <ModalFormulario setModal={setModal} action={modal}/>
    </Container>
  );
}

export { Home };