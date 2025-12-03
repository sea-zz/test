import { useEffect, useState } from "react";
import { search } from "@/services/weibo";
import { List } from 'antd'
import styles from './search.less'

const SearchPage = () => {
  const [list, setList] = useState([])
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
   search().then(ret => {
    if (ret.http_code && ret.http_code === 200) {
      setInitLoading(false);
      setList(ret.data.hotgov ? [ret.data.hotgov].concat(ret.data.band_list) : ret.data.band_list)
    }
   })
  }, [])

  return (
    <List
      dataSource={list}
      itemLayout="horizontal"
      loading={initLoading}
      renderItem={(item, idx) => {
        return (<a target='_blank' href={`https://s.weibo.com/weibo?q=${encodeURIComponent(item.name || item.word_scheme)}`}><div key={idx} className={styles.search_item}>
          <div className={styles.title}>
            <span className={idx <= 2 ? styles.hot : ''} style={{
              backgroundImage: `url(${idx <= 2 ? `https://h5.sinaimg.cn/upload/1005/948/2021/08/31/hotRank${idx + 1}.png` : 'https://h5.sinaimg.cn/upload/1005/948/2021/08/31/hotRankDefault.png'})`
            }}><i>{idx + 1}</i></span>
            <span>{item.word}</span>
            {item.small_icon_desc && <span className={styles.tip} style={{backgroundColor: item.small_icon_desc_color}}>{item.small_icon_desc}</span>}
          </div>
          <div className={styles.hot}>
            <span>热度值：{item.raw_hot || 0}</span>
          </div>
        </div></a>)
      }}
    />
  );
};

export default SearchPage;
  