import { useEffect, useState } from "react";
import { entrank } from "@/services/weibo";
import Page from "./page";
import { Tabs } from 'antd';

const EntrankPage = () => {
  const [list, setList] = useState(null)
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    entrank().then(ret => {
    if (ret.status && ret.status === 'ok') {
      setInitLoading(false);
      setList(ret.data)
    }
   })
  }, [])

  return <Tabs
            defaultActiveKey="1"
            type="card"
            items={[
                {
                    label: '文娱',
                    key: '1',
                    children: <Page list={list ? list.now : []} initLoading={initLoading} />
                },
                {
                    label: '正在出圈',
                    key: '2',
                    children: <Page list={list ? list.nowing : []} initLoading={initLoading} />
                },
            ]}
        />
};

export default EntrankPage;
  