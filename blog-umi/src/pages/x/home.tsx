import { useState, useEffect, useCallback } from 'react'
import { list as getList, del, getTotal } from '@/services/article';
import { List, Avatar, Table, Space, Popconfirm, message } from 'antd';
import styles from './home.less'
import dayjs from 'dayjs'
import {Link, useNavigate} from 'umi'

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [initLoading, setInitLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        getListData()
    }, [page])

    const getListData = useCallback(async () => {
        setInitLoading(true)
        const ret = await getList(page)
        const totalRes = await getTotal()
        setInitLoading(false);
        if (ret.status === 'ok') {
            setList(ret.data)
        } else {
            setList([])
        }
        if (totalRes.status === 'ok') {
            setTotal(totalRes.data.count)
        }
    }, [page])

   const handleDelete = async (data: { id: any; }) => {
        const res = await del(data.id)
        if (res.status === 'ok') {
            message.success('delete success')
            setPage(1)
            getListData()
        } else {
            message.error('delete fail')
        }
   }

   const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '时间',
            dataIndex: 'pub_time',
            key: 'pub_time',
            ellipsis: true,
            render: (t, record, idx) => dayjs(Number(`${t}000`)).format('YYYY-MM-DD HH:mm:ss'),
            align: 'center'
        },
        {
            title: '阅读',
            dataIndex: 'read',
            key: 'read',
            ellipsis: true,
            render: (text, record, idx) => text > 10000 ? Math.ceil(text / 10000) + '万' : text,
            align: 'center',
        },
        {
            title: '创建人',
            dataIndex: 'uid',
            key: 'uid',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => (
                <Popconfirm title="确认删除吗，不可恢复？" okText="是" cancelText="否" onCancel={(e) => {e?.stopPropagation()}} onConfirm={(e) => {
                    e?.stopPropagation()
                    handleDelete(record)
                }}>
                    <a onClick={e => e.stopPropagation()}>删除</a>
                </Popconfirm>
            ),
            align: 'center',
        },
   ]

  return <Table
        columns={columns}
        rowKey={'id'}
        dataSource={list}
        loading={initLoading}
        onRow={record => ({
            onClick: () => {
                navigate(`../article/detail?pageid=${record.id}`)
            }
        })}
        pagination={{
            position: ['bottomCenter'],
            showTotal: (total) => `总共 ${total} 条`,
            hideOnSinglePage: true,
            pageSize: 10,
            showTitle: true,
            total: total,
            onChange: (page, size) => setPage(page)
        }}
    />
};

export default HomePage;
  
