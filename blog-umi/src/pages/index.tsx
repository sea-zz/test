import { useState, useEffect } from 'react'
import { list as getList } from '@/services/article';
import { List, Avatar } from 'antd';
import styles from './index.less'
import dayjs from 'dayjs'
import {Link} from 'umi'

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [initLoading, setInitLoading] = useState(true)
  const [more, setMore] = useState(true)

  const handleNextPage = () => {
    setPage(val => val + 1)
  }

  useEffect(() => {
    setInitLoading(true)
    getList(page).then(ret => {
     if (ret.status === 'ok') {
      setInitLoading(false);
      if (ret.data.length > 0) {
        setList(val => val.concat(ret.data))
      } else {
        setMore(false)
      }
     } 
    })
   }, [page])

  return (
    <List
      dataSource={list}
      itemLayout="vertical"
      loading={initLoading}
      size="large"
      footer={
        more && <div className={styles.more} onClick={handleNextPage}>
          加载更多
        </div>
      }
      renderItem={(item, idx) => (
        <List.Item
          className={styles.topic_list}
          key={item.id}
          actions={[
            <span>阅读：{item.read > 10000 ? Math.ceil(item.read / 10000) + '万' : item.read}</span>,
            <span>发布时间：{dayjs(Number(`${item.pub_time}000`)).format('YYYY-MM-DD HH:mm:ss')}</span>,
            <span>创建人：{item.uid}</span>,
          ]}
        >
          <List.Item.Meta
            title={<Link to={`/article/detail?pageid=${item.id}`}>{item.title}</Link>}
            style={{marginBottom: 0}}
          />
        </List.Item>
      )}
    />
  );
  };
  
export default HomePage;
  
