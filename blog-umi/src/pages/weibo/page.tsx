import { useEffect, useState } from "react";
import { List } from 'antd'
import styles from './search.less'

const Page = ({list, initLoading}) => {
  return (
    <List
      dataSource={list}
      itemLayout="horizontal"
      loading={initLoading}
      renderItem={(item, idx) => {
        return (<a target='_blank' href={item.url}><div key={idx} className={styles.search_item}>
          <div className={styles.title}>
            <span className={idx <= 2 ? styles.hot : ''} style={{
              backgroundImage: `url(${idx <= 2 ? `https://h5.sinaimg.cn/upload/1005/948/2021/08/31/hotRank${idx + 1}.png` : 'https://h5.sinaimg.cn/upload/1005/948/2021/08/31/hotRankDefault.png'})`
            }}><i>{idx + 1}</i></span>
            <span>{item.text}</span>
          </div>
          <div className={styles.hot}>
            <span>热度值：{item.hot || 0}</span>
          </div>
        </div></a>)
      }}
    />
  );
};

export default Page;
