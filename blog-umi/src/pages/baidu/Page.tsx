import React from "react";
import styles from './page.less';

function Item({item, type}) {
    let containerHeight113 = ['realtime', 'car', 'game'].includes(type);

    return <div className={`${styles.item_container} ${containerHeight113 ? styles.height_113 : styles.height_135}`}>
        <a href={item.rawUrl} className={styles.item_left}>
            <img src={item.img} alt={item.word} style={{width: type === 'game' ? '65px' : '', height: type === 'game' ? 'auto' : '100%'}} />
            <span>{item.index + 1}</span>
        </a>
        <div className={styles.item_content}>
            <a href={item.rawUrl}>
                <h3>{item.word}</h3>
            </a>
            {item.show.length ? item.show.map((one, idx) => <div key={idx}>{one}</div>) : null}
            <div className={item.show.length ? styles.desc : ''}>
                {item.desc}
                <a href={item.rawUrl}>查看更多</a>
            </div>
        </div>
        <div className={styles.item_right}>
            <span>{item.hotScore}</span>
            <span>热搜指数</span>
        </div>
    </div>
}

export default function Page({data, type}) {
    return <div className={styles.container}>
        {data.map((item, idx) => <Item item={item} key={idx} type={type} />)}
    </div>
}

