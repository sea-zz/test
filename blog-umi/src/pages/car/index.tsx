import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { list } from '@/services/zhiyao'
import s from './index.less'
import { Table , Image, Form, Input, Slider, Select, Button} from 'antd'

export default function Car() {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [data, setData] = useState(null)
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')

    const getList = useCallback(async () => {
        const ret = await list({
            page, size, name, type, price
        })
        if (ret.status && ret.status === 'ok') {
            setData(ret.data)
        }
    }, [page, size, type, name, price])

    useEffect(() => {
        getList();
    }, [page, size, type, name, price])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'series_id',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '排名',
            dataIndex: 'rank',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '名称',
            dataIndex: 'series_name',
            ellipsis: true,
            align: 'center',
            render: (t, record, dx) => <a target='_blank' href={`https://www.dongchedi.com/auto/series/${record.series_id}`}>{t}</a>
        },
        {
            title: '价格',
            dataIndex: 'dealer_price',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '销量',
            dataIndex: 'count',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '图片',
            dataIndex: 'image',
            ellipsis: true,
            align: 'center',
            render: t => <Image src={t} width={100} />
        },
        {
            title: '品类',
            dataIndex: 'outter_detail_type',
            ellipsis: true,
            align: 'center',
            filters: [
                {
                    text: '轿车',
                    value: '0,1,2,3,4,5'
                },
                {
                    text: 'SUV',
                    value: '10,11,12,13,14'
                },
                {
                    text: 'MPV',
                    value: '20,21,22,23'
                },
            ],
            onFilter: (value, record) => {
                return value.split(',').includes(record.outter_detail_type + '')
            },
            render: t => {
                if ('0,1,2,3,4,5'.includes(t)) {
                    return '轿车'
                } else if ('10,11,12,13,14'.includes(t)) {
                    return 'SUV'
                } else if ('20,21,22,23'.includes(t)) {
                    return 'MPV'
                } else {
                    return '未知'
                }
            }
        }
    ]

    return <React.Fragment>
        <div className={s.header}>
            <Form 
                onFinish={val => {
                    console.log(2222, val)
                    setName(val.name)
                    setPrice(val.price ? val.price.join(',') : '')
                    setType(val.type)
                }}
                autoComplete="open"
            >
                <Form.Item
                    label="名称"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="价格"
                    name="price"
                >
                    <Slider range />
                </Form.Item>
                <Form.Item
                    label="类型"
                    name="type"
                >
                    <Select
                        options={[
                            {
                                value: '',
                                label: '全部',
                            },
                            {
                                value: '0,1,2,3,4,5',
                                label: '轿车',
                            },
                            {
                                value: '10,11,12,13,14',
                                label: 'SUV',
                            },
                            {
                                value: '20,21,22,23',
                                label: 'MPV',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <Table
            dataSource={data ? data.data : []}
            columns={columns}
            rowKey="id"
            pagination={{
                showSizeChanger: true,
                onShowSizeChange: (current, size) => setSize(size),
                total: data ? data.count.count : 0,
                current: page,
                pageSize: size,
                showTotal: () => `总共 ${data ? data.count.count : 0} 条`,
                onChange: (page, pageSize) => setPage(page)
            }}
            scroll={{
                x: 1300,
            }}
        />
    </React.Fragment>
}
