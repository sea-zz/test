import { useEffect, useState } from "react";
import { socialevent } from "@/services/weibo";
import Page from "./page";

const SocialeventPage = () => {
  const [list, setList] = useState([])
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    socialevent().then(ret => {
    if (ret.status && ret.status === 'ok') {
      setInitLoading(false);
      setList(ret.data)
    }
   })
  }, [])

  return <Page list={list} initLoading={initLoading} />
};

export default SocialeventPage;
  