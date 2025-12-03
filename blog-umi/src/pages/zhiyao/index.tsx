import { Input, Button, message } from "antd"
import React, { useCallback, useState, useEffect } from "react"
import s from './index.less'
import { search, add } from '@/services/zhiyao'

export default function Zhiyao() {
    const [page, setPage] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [data, setData] = useState(null)
    
    const handleClick = useCallback(async () => {
        setDisabled(true)
        const ret = await search(page)
        if (ret.status === 'ok') {
            setData(ret.data)
        }
        setDisabled(false)
        
        console.log('查询数据', ret)
    }, [page])

    const handleInsert = async () => {
        let t = []
        data.forEach(ite => {
            t.push(Object.assign({}, ite, {data: JSON.stringify(ite.data)}))
        })
        try {
            const res = await add(t)
            message.success(res.data.message)
        } catch (e) {
            console.error(e)
        }
        
        console.log('插入数据')
    }

    useEffect(() => {
        function quickSearch(e) {
            if (e.keyCode === 13) {
                handleClick()
            }
        }

        window.addEventListener('keydown', quickSearch)

        return () => {
            window.removeEventListener('keydown', quickSearch)
        }
    }, [page])

    return <div className={s.container}>
        <div className={s.header}>
            <Input onChange={e => setPage(e.target.value)} />
            <Button onClick={handleClick} type='primary' loading={disabled}>查询(页码)</Button>
            <Button onClick={handleInsert} disabled={disabled}>插入</Button>
        </div>
        <div>
            {data && data.map((item, idx) => <div key={idx}>
                <h2>{item.title}</h2>
                <p>{item.date}</p>
                <p>ID: {item.detailid}</p>
                <h3>释意</h3>
                {item.data.map((one, dx) => <p key={dx}>{one}</p>)}
                <hr />
            </div>)}
        </div>
    </div>
}
