import { getAll, del, add } from "@/services/user"
import { Table, Form, Button, Avatar, Popconfirm, message, Modal, Input, Upload } from "antd"
import React, { useState, useEffect, useRef } from "react"
import {  UploadOutlined } from '@ant-design/icons';

const User = () => {
    const [initLoading, setInitLoading] = useState(false)
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    
    const ref = useRef()

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleOk = () => {
        ref.current.validateFields().then(async data => {
            const ret = await add(Object.assign({}, data, {pic: data.pic ? `/api${data.pic.file.response.data.url}` : null}))
            if (ret.status === 'ok') {
                message.success('添加成功')
                setIsModalOpen(false)
                getAllData()
                ref.current.resetFields()
            } else {
                message.error('FAIL')
            }
        })
    }

    const getAllData = async () => {
        setInitLoading(true)
        const ret = await getAll()
        setInitLoading(false)
        if (ret.status === 'ok') {
            setData(ret.data)
        } else {
            setData([])
        }
    }

    const handleDelete = async (record) => {
        const ret = await del(record.id)
        if (ret.status === 'ok') {
            message.success('OK')
            const newData = data.filter(item => item.id !== record.id)
            setData(newData)
        } else {
            message.error('FAIL')
        }
    }

    useEffect(() => {
        getAllData()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '头像',
            dataIndex: 'pic',
            align: 'center',
            ellipsis: true,
            render: (t, record, idx) => {
                return <Avatar src={t}></Avatar>
            }
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '名称',
            dataIndex: 'name',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '公司',
            dataIndex: 'company',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '职位',
            dataIndex: 'work',
            align: 'center',
            ellipsis: true,
        },
        // {
        //     title: '简介',
        //     dataIndex: 'description',
        //     align: 'center',
        //     ellipsis: true,
        // },
        {
            title: '站点',
            dataIndex: 'site',
            align: 'center',
            ellipsis: true,
            render: (t, record, idx) => {
                return <a href={t} target='_blank'>{t}</a>
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            render: (_, record) => (
                <Popconfirm title="确认删除吗，不可恢复？" okText="是" cancelText="否" onCancel={(e) => {e?.stopPropagation()}} onConfirm={(e) => {
                    e?.stopPropagation()
                    handleDelete(record)
                }}>
                    <a onClick={e => e.stopPropagation()}>删除</a>
                </Popconfirm>
            ),
        }
    ]
    
    return <React.Fragment>
        <Button
            onClick={showModal}
            type="primary"
            style={{
                marginBottom: 16,
            }}
        >
            添加
        </Button>
        <Modal title="用户信息添加" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            bodyStyle={{height: 500, overflowY: 'auto'}}
        >
            <Form ref={ref}>
                <Form.Item
                    name='email'
                    label="邮箱"
                    rules={[
                        {
                            required: true,
                            message: '邮箱必须'
                        }
                    ]}
                >
                    <Input maxLength={50} showCount />
                </Form.Item>
                <Form.Item
                    name='pass'
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '密码必须'
                        }
                    ]}
                >
                    <Input.Password maxLength={20} showCount />
                </Form.Item>
                <Form.Item
                    name='name'
                    label="名称"
                    rules={[
                        {
                            required: true,
                            message: '名称必须'
                        }
                    ]}
                >
                    <Input maxLength={50} showCount />
                </Form.Item>
                <Form.Item
                    name='company'
                    label="公司"
                    rules={[
                        {
                            required: true,
                            message: '公司必须'
                        }
                    ]}
                >
                    <Input maxLength={50} showCount />
                </Form.Item>
                <Form.Item
                    name='work'
                    label="岗位"
                    rules={[
                        {
                            required: true,
                            message: '岗位必须'
                        }
                    ]}
                >
                    <Input maxLength={50} showCount />
                </Form.Item>
                <Form.Item
                    name='description'
                    label="描述"
                    rules={[
                        {
                            required: true,
                            message: '描述必须'
                        }
                    ]}
                >
                    <Input.TextArea autoSize={{minRows: 3}} maxLength={300} showCount />
                </Form.Item>
                <Form.Item
                    name='site'
                    label="站点"
                    rules={[
                        {
                            required: true,
                            message: '站点必须'
                        }
                    ]}
                >
                    <Input maxLength={50} showCount />
                </Form.Item>
                <Form.Item
                    name="pic"
                    label="头像"
                    rules={[
                        {
                            required: true,
                            message: '头像必须'
                        }
                    ]}
                >
                    <Upload maxCount={1} name="logo" action="/api/article/upload" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
        <Table
            dataSource={data}
            columns={columns}
            initLoading={initLoading}
            rowKey='id'
            pagination={false}
            expandable={{
                expandedRowRender: (record) => (
                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    简介：{record.description}
                  </p>
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
        />
    </React.Fragment>
}

export default User
