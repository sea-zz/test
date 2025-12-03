import { useState, useEffect } from 'react'
import { zhihu } from '@/services/weibo';
import { List, Avatar } from 'antd';
import styles from './index.less'

const ZhihuPage = () => {
  const [list, setList] = useState([])
  const [initLoading, setInitLoading] = useState(true)

  useEffect(() => {
    setInitLoading(true)
    zhihu().then(ret => {
     if (ret.data) {
        setInitLoading(false);
        setList(val => val.concat(ret.data))
     } else {
      setInitLoading(false);
     }
    })
   }, [])

  return (
    <List
      dataSource={list}
      itemLayout="vertical"
      loading={initLoading}
      size="large"
      renderItem={(item, idx) => (
        <List.Item
          className={styles.topic_list}
          key={idx}
          actions={[
            <span>讨论：{item.detail_text}</span>,
          ]}
          extra={
            <img
            height={100}
            width={150}
            alt="logo"
            src={item.children[0].thumbnail}
          />
          }
        >
          <List.Item.Meta
            title={<a target='_blank' href={ 'https://www.zhihu.com/question/' +  item.target.url.split('/').pop() }>{ item.target.title }</a>}
            description={item.target.excerpt}
          />
          {/* <p dangerouslySetInnerHTML={{__html: item.mblog.text}}></p> */}
        </List.Item>
      )}
    />
  );
  };
  
export default ZhihuPage;
  