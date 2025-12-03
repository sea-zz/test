import React, { useEffect, useState, useCallback } from "react";
import Page from "./Page";
import styles from './index.less'
import {baidu as baiduHot} from '@/services/weibo'
import { Spin, Empty } from 'antd'

const types = [
    {
        text: "热搜榜",
        typeName: "realtime"
    },
    {
        text: "小说榜",
        typeName: "novel"
    },
    {
        text: "电影榜",
        typeName: "movie"
    },
    {
        text: "电视剧榜",
        typeName: "teleplay"
    },
    {
        text: "汽车榜",
        typeName: "car"
    },
    {
        text: "游戏榜",
        typeName: "game"
    },
]

export default function Baidu() {
    const [type, setType] = useState('realtime')
    const [data, setData] = useState([])
    const [initLoading, setInitLoading] = useState(true)
    
    const getBaiduHot = useCallback(async () => {
        setInitLoading(true)
        const ret = await baiduHot(type)
        if (ret.success === true) {
            const zero = ret.data.cards[0]
            setData(zero.topContent ? zero.topContent.concat(zero.content) : zero.content)
        } else {
            setData([])
        }
        setInitLoading(false)
    }, [type])

    useEffect(() => {
        // 请求对应的数据
        getBaiduHot()
    }, [type])

    return <div className={styles.container}>
        <div className={styles.header}>
            {types.map((item, idx) => <span className={item.typeName === type ? styles.select : ''} key={item.typeName} onClick={() => setType(item.typeName)}>{item.text}</span>)}
        </div>
        {initLoading ? <div style={{width: '100%', height: '100%', textAlign: 'center', paddingTop: '100px'}}>
            <Spin size='large' />
        </div> : (data.length ? <Page data={data} type={type} /> : <Empty />)}
    </div>
}
