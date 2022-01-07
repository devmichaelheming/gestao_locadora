import React, { useState } from 'react';
import { Table, PageHeader, Button } from 'antd';
import { ModalFormulario } from "./Modals";

import { data } from "./data";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "styles/icons";
import { Container, ContainerTable } from './styles';

const Filmes = function () {
  const [ modal, setModal ] = useState(false);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Titulo', dataIndex: 'titulo', key: 'titulo' },
    { title: 'Classificação Indicativa', dataIndex: 'classificacaoIndicativa', key: 'classificacaoIndicativa' },
    { title: 'Data de lançamento', dataIndex: 'lancamento', key: 'lancamento' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (key: number) => (
        <div className='group-buttons'>
          <button className='btn-action' onClick={() => handleEdit(key)}><EditOutlined /></button>
          <button className='btn-action' onClick={() => handleDelete(key)}><DeleteOutlined /></button>
        </div>
      ),
    },
  ];

  function handleDelete(data: number) {
    console.log(data);
    alert('deletar');
  }

  function handleEdit(data: number) {
    console.log(data);
    setModal(true);
  }

  return (
    <Container>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Filmes"
        subTitle="Informações dos filmes registrados"
        extra={[
          <Button type="primary" icon={<PlusOutlined />} size="large">
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

export { Filmes };