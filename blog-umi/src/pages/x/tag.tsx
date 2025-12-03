import { getList, delTag, addTag, editTag } from "@/services/tag"
import { Form, Input, InputNumber, message, Popconfirm, Table, Typography, Space, Button } from 'antd';
import React, { useState, useEffect, useCallback } from "react"

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input maxLength={30} showCount />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${name}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
};

const Tag = () => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [initLoading, setInitLoading] = useState(true)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [count, setCount] = useState(0)
    const [add, setAdd] = useState(false)

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
          name: '',
          id: '',
          ...record,
        });
        setEditingKey(record.id);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.id);
          if (index > -1) {
            const item = newData[index];
            const tmp = {
                ...item,
                ...row,
            };
            const ret = await editTag(tmp)
            if (ret.status === 'ok') {
                message.success('修改成功')
            } else {
                message.error('FAIL')
            }
            newData.splice(index, 1, tmp);
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = async record => {
        const ret = await delTag(record.id)
        if (ret.status === 'ok') {
            message.success('删除成功')
            setPage(1)
        } else {
            message.error('删除失败')
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
        },
        {
            title: '名称',
            dataIndex: 'name',
            align: 'center',
            ellipsis: true,
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link
                    onClick={() => save(record.id)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    保存
                  </Typography.Link>
                  <Popconfirm title="确认取消吗?" onConfirm={cancel} okText='确认' cancelText='取消'>
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <Space size={10}>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    修改
                    </Typography.Link>
                    <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete(record)} okText='确认' cancelText='取消'>
                        <Typography.Link disabled={editingKey !== ''}>
                        删除
                        </Typography.Link>
                    </Popconfirm>
                </Space>
              );
            },
        },
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'id' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.name,
            editing: isEditing(record),
          }),
        };
    });

    const onFinish = async (values) => {
        const ret = await addTag(values)
        if (ret.status === 'ok') {
            message.success('OK')
            setAdd(!add)
            setData(val => [{id: ret.data.id, ...values}].concat(val || []))
        } else {
            message.error('FAIL')
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const getListData = useCallback(async () => {
        setInitLoading(true)
        const ret = await getList(page)
        setInitLoading(false);
        if (ret.status === 'ok') {
            setData(ret.data.res)
            setCount(ret.data.total)
        } else {
            setData(null)
        }
    }, [page])

    useEffect(() => {
        getListData()
    }, [page])

    return <React.Fragment>
        <Button
            onClick={() => setAdd(!add)}
            type="primary"
            style={{
            marginBottom: 16,
            }}
        >
            添加
        </Button>
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                    cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowKey="id"
                initLoading={initLoading}
                rowClassName="editable-row"
                pagination={{
                    onChange: (page, size) => {
                        setPage(page)
                        setEditingKey('');
                    },
                    position: ['bottomCenter'],
                    showTotal: (count) => `总共 ${count} 条`,
                    hideOnSinglePage: true,
                    pageSize: 10,
                    showTitle: true,
                    total: count,
                }}
                footer={add ? () => (<Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '名称必须填',
                            }
                        ]}
                    >
                        <Input maxLength={30} showCount placeholder="请输入名称..." />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="default" onClick={() => setAdd(!add)}>取消</Button>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Space>
                    </Form.Item>
                </Form>) : null}
            />
        </Form>
    </React.Fragment>
}

export default Tag
