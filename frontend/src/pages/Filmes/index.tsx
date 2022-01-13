import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Button } from 'antd';
import Swal from 'sweetalert2'


import { Container, ContainerTable } from './styles';
import { ModalFormulario } from "./Modals";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "styles/icons";

import api from "services/api";

export interface filmesProps {
  id: number;
  titulo: string;
  classifiacaoIndicativa: string;
  lancamento: string;
}

const Filmes = function () {
  const [modal, setModal] = useState(false);
  const [filmes, setFilmes] = useState<filmesProps[]>([]);

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

  function handleShowForm(data?: number) {
    setModal(true);
  }

  function handleDelete(data: any) {
    const { id } = data;
    Swal.fire({
      title: 'Deseja remover este item?',
      text: "Não será possivel recuperar as informações.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result: any) => {
      if (result.isConfirmed) {
        api.delete(`/filmes/${id}`).then((res) => {
          Swal.fire(
            'Removido!',
            'Você removeu este item.',
            'success'
          )
        }).catch((err) => {
          console.error(`ops! ocorreu um erro${err}`);
        });
        
      }
    })
  }

  function handleEdit(data: number) {
    setModal(true);
  }

  useEffect(() => {
    api.get('/filmes').then((res) => {
      setFilmes(res.data.data);
    }).catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });
  }, [filmes]);

  return (
    <Container>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Filmes"
        subTitle="Informações dos filmes registrados"
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
          dataSource={filmes}
        />
      </ContainerTable>
      <ModalFormulario setModal={setModal} action={modal}/>
    </Container>
  );
}

export { Filmes };