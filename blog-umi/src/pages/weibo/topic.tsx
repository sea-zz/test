import { useState, useEffect } from 'react'
import { topic } from '@/services/weibo';
import { List, Avatar } from 'antd';
import styles from './topic.less'

const TopicPage = () => {
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [initLoading, setInitLoading] = useState(true)
  const [more, setMore] = useState(true)

  const handleNextPage = () => {
    setPage(val => val + 1)
  }

  useEffect(() => {
    setInitLoading(true)
    topic(page).then(ret => {
     if (ret.http_code && ret.http_code === 200) {
        setInitLoading(false);
        setList(val => val.concat(ret.data.statuses))
     } else {
      setInitLoading(false);
      setMore(false)
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
          key={idx}
          actions={[
            <span>阅读：{Math.ceil(item.read / 10000) + '万'}</span>,
            <span>讨论：{Math.ceil(item.mention / 10000) + '万'}</span>,
          ]}
          extra={
            <img
            height={100}
            alt="logo"
            src={item.images_url}
          />
          }
        >
          <List.Item.Meta
            // avatar={<span className={idx <= 2 ? styles.hot : ''} style={{
            //   backgroundImage: `url(${idx <= 2 ? `https://h5.sinaimg.cn/upload/1005/948/2021/08/31/hotRank${idx + 1}.png` : 'https://h5.sinaimg.cn/upload/1005/948/2021/08/31/hotRankDefault.png'})`
            // }}><i>{idx + 1}</i></span>}
            title={<a href={`https://s.weibo.com/weibo?q=${encodeURIComponent('#'+item.topic+'#')}`}>{'#'+item.topic+'#'}</a>}
            description={item.summary}
          />
          {/* <p dangerouslySetInnerHTML={{__html: item.mblog.text}}></p> */}
        </List.Item>
      )}
    />
  );
  };
  
export default TopicPage;
  