import { cateAll, del as DelCate, edit as editCate, addCate } from '@/services/cate'
import { message, Tree, Input, Button, Modal, TreeSelect, Space } from 'antd'
import { DownOutlined , PlusOutlined} from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import styles from './cate.less'

const Cate = () => {
    const [data, setData] = useState([])
    const [editing, setEditing] = useState(false)
    const [editData, setEditData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState<string | undefined>(undefined);
    const [dataSource, setDataSource] = useState([])
    const [name, setName] = useState('')

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = async () => {
        const ret = await addCate({
            name,
            pid: value
        })
        if (ret.status === 'ok') {
            message.success('OK')
            setIsModalOpen(false);
            setValue('')
            setName('')
            getCateList()
        } else {
            message.error('FAIl')
        }
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const getCateList = async () => {
        const ret = await cateAll()
        if (ret.status === 'ok') {
            setDataSource(ret.data)
            const res = parseTree(ret.data, 0)
            setData(res)
        } else {
            setData([])
        }
    }

    const parseTree = (data: { pid: any; name: any; id: any; }[], pid: number, isAdd = false) => {
        let newArr: { title: any; key: string; children: any[]; }[] = []
        data.forEach((item: { pid: any; name: any; id: any; }) => {
            if (item.pid == pid) {
                newArr.push(Object.assign({
                    value: item.id,
                    title: item.name,
                    children: parseTree(data, item.id, isAdd),
                }, !isAdd ? {key: `${pid}-${item.id}` } : {}))
            }
        })

        return newArr
    }

    const handleDelete = async (data) => {
        const ret = await DelCate(data.value)
        if (ret.status === 'ok') {
            message.success('ok')
            getCateList()
        } else {
            message.error(ret.msg)
        }
    }

    const handleChange = e => {
        e.stopPropagation()
        setEditData(val => Object.assign({}, val, {title: e.target.value}))
    }

    const handleChangeSave = async (e) => {
        e.stopPropagation()
        const ret = await editCate({
            id: editData.value,
            name: editData.title
        })
        if (ret.status === 'ok') {
            message.success('OK')
            setEditing(!editing)
            setEditData(null)
            getCateList()
        } else {
            message.error('FAIL')
        }
    }

    useEffect(() => {
        getCateList()
    }, [])
    
    return <React.Fragment>
        <Button type='primary' onClick={showModal} style={{marginBottom: 10}}><PlusOutlined />添加</Button>
        <Modal title="添加分类" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <TreeSelect
                showSearch
                style={{ width: '100%', marginBottom: 10 }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="选择父级分类"
                allowClear
                treeDefaultExpandAll={true}
                onChange={onChange}
                treeData={[{value: 0, title: '未选择'}].concat(parseTree(dataSource, 0, true))}
            />
            <Input placeholder='输入分类名' value={name} onChange={e => setName(e.target.value)} maxLength={30} showCount />
        </Modal>
        <Tree
            className={styles.tree}
            autoExpandParent={true}
            blockNode={true}
            showLine
            switcherIcon={<DownOutlined />}
            onSelect={onSelect}
            treeData={data}
            titleRender={nodeData => {
                return <div className={styles.item}>
                    <div className={styles.title}>{editing && editData && editData.value === nodeData.value ? <Input value={editData.title} onChange={handleChange} onBlur={e => {
                        e.stopPropagation()
                        setEditing(!editing)
                        setEditData(null)
                    }} /> : nodeData.title}</div>
                    <div className={styles.operate}>
                        {editing && editData && editData.value === nodeData.value ? (
                            <React.Fragment>
                            <span onClick={(e) => {
                                e.stopPropagation()
                                setEditing(!editing)
                                setEditData(null)
                            }}>取消</span>
                            <span data-id={editData.value} onClick={(e) => {
                                e.stopPropagation()
                            }}>保存</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {/* <span onClick={(e) => {
                                e.stopPropagation()
                                setEditing(!editing)
                                setEditData(nodeData)
                            }}>编辑</span> */}
                            <span onClick={(e) => {
                                e.stopPropagation() 
                                handleDelete(nodeData)
                            }}>删除</span>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            }}
        />
    </React.Fragment>
}

export default Cate
