import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Button } from 'antd';
import { ModalFormulario } from "./Modals";

import Swal from 'sweetalert2'

import { DeleteOutlined, EditOutlined, PlusOutlined } from "styles/icons";
import { Container, ContainerTable } from './styles';

import api from "services/api";
import { FileMarkdownFilled, LeftCircleTwoTone } from '@ant-design/icons';

interface locacoesProps {
  id: number;
  id_cliente: number | string;
  id_filme: number | string;
  data_locacao: string;
  data_devolucao: string;
}

import { clientesProps } from "pages/Clientes";
import { filmesProps } from "pages/Filmes";

const Home = function () {
  const [modal, setModal] = useState(false);
  const [clientes, setClientes] = useState<clientesProps[]>([]);
  const [filmes, setFilmes] = useState<filmesProps[]>([]);
  const [locacoes, setLocacoes] = useState<locacoesProps[]>([]);

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

  function handleDelete(data: any) {
    const { id } = data;
    Swal.fire({
      title: 'Deseja remover esta locação?',
      text: "Não será possivel recuperar as informações.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        api.delete(`/locacao/${id}`).then((res) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }).catch((err) => {
          console.error(`ops! ocorreu um erro${err}`);
        });
        
      }
    })
  }

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
  }, [filmes]);

  useEffect(() => {
    api.get('/locacao').then((res) => {
      let result = res.data.data;

      result.map((item: locacoesProps) => {
        clientes.map(cliente => {
          if (item.id_cliente === cliente.id) {
            item.id_cliente = cliente.nome;
          }
        })
      })

      result.map((item: locacoesProps) => {
        filmes.map(filme => {
          if (item.id_filme === filme.id) {
            item.id_filme = filme.titulo;
          }
        })
      })
      
      setLocacoes(result);
    }).catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });
  }, [locacoes]);

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
          dataSource={locacoes}
        />
      </ContainerTable>
      <ModalFormulario setModal={setModal} action={modal}/>
    </Container>
  );
}

export { Home };