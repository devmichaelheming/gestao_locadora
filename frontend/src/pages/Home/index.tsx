import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Button } from 'antd';
import { ModalFormulario } from "./Modals";

import Swal from 'sweetalert2'

import { DeleteOutlined, EditOutlined, PlusOutlined } from "styles/icons";
import { Container, ContainerTable } from './styles';

import api from "services/api";

export interface filmesProps {
  id: number;
  titulo: string;
  classificacaoIndicativa: string;
  lancamento: string;
}
export interface clientesProps {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
}

export interface locacoesProps {
  id: number;
  cliente: clientesProps;
  filme: filmesProps;
  filme_titulo?: string;
  cliente_nome?: string;
  data_locacao: string;
  data_devolucao: string;
}

const Home = function () {
  const [modal, setModal] = useState(false);
  const [locacoes, setLocacoes] = useState<locacoesProps[]>([]);
  const [dataEdit, setDataEdit] = useState<locacoesProps | undefined>();

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Cliente', dataIndex: 'cliente_nome', key: 'cliente_nome' },
    { title: 'Filme', dataIndex: 'filme_titulo', key: 'filme_titulo' },
    { title: 'Data de locação', dataIndex: 'data_locacao', key: 'data_locacao' },
    { title: 'Data de devolução', dataIndex: 'data_devolucao', key: 'data_devolucao' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (key:number, data : locacoesProps) => (
        <div className='group-buttons'>
          <button className='btn-action' onClick={() => handleShowForm(data)}><EditOutlined /></button>
          <button className='btn-action' onClick={() => handleDelete(key)}><DeleteOutlined /></button>
        </div>
      ),
    },
  ];

  function handleShowForm(data?: locacoesProps) {
    setDataEdit(data);
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
        api.delete(`/locacao/${id}`).then((res) => {
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

  useEffect(() => {
    api.get('/locacoes').then((res) => {
      let result = res.data.data;

      result.map((item: any) => {
        item['cliente_nome'] = item.cliente.nome;
        item['filme_titulo'] = item.filme.titulo;
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
      <ModalFormulario setModal={setModal} action={modal} dataEdit={dataEdit}/>
    </Container>
  );
}

export { Home };