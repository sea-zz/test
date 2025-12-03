import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'umi';
import SimpleLayout from './AdminLayout';
import BaseLayout from './BaseLayout';
import Login from '@/pages/login';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userInfo } from '@/store';
import { history } from 'umi';
import {notification, Modal, Select, Input, Form, message} from 'antd'
import {EnvironmentOutlined } from '@ant-design/icons'
import { weather, citycode } from '@/services/weibo';
import '../../public/css/pio.css'

const getIsX = path => /^\/x/.test(path)

const App = (props) => {
  // const pathname = location.pathname
  // let isX = /^\/x/.test(pathname)

  const [isX, setIsX] = useState(getIsX(location.pathname))
  const [nowRouter, setNowRouter] = useState(location.pathname)
  const [city, setCity] = useState('北京')
  const [cityInput, setCityInput] = useState('')

  const isLogin = useRecoilValue(userInfo)
  // const [api, contextHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    notification.close(city)
    setCity(cityInput)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getWeather = useCallback(async () => {
    const ret = await weather(city)
    if (ret.status == 1 && ret.info == 'OK' && ret.lives.length) {
      const info = ret.lives[0]
      let str = `${info.city}今天天气${info.weather}，当前温度${info.temperature}°C，${info.winddirection}风${info.windpower}级，空气湿度${info.humidity}%`
      notification.open({
        message: <>今天天气 <span onClick={showModal} title='重新定位'><EnvironmentOutlined />
        </span></>,
        description: str,
        duration: 5,
        key: city
      })
    }
  }, [city])

  useEffect(() => {
    getWeather()
  }, [city])

  useEffect(() => {
    window.navigator && window.navigator.getBattery().then(battery => {
      battery.addEventListener('levelchange', () => {
        message.info(`当前电量：${battery.level * 100}%`)
        if (!battery.charging && battery.level < 0.15) {
          notification.open({
            message: <div style={{color: 'red', fontSize: 20}}>快去充电啊🔋</div>,
            description: '没电了🪫，快去充电🔋',
            duration: 5,
            key: 'battery'
          })
        }
      })
      battery.addEventListener('chargingchange', () => {
        message[battery.charging ? 'success': 'error'](`充电状态：${battery.charging ? '正在充电' : '正在放电'}`)
      })
      battery.addEventListener('chargingtimechange', () => {
        message.info(`完全充电需要时间：${battery.chargingTime}`)
      })
      battery.addEventListener('ischargingtimechange', () => {
        message.info(`完全放电需要时间：${battery.dischargingTime}`)
      })
    })
  }, [])

  useEffect(() => {
    history.listen(({location, action}) => {
      setIsX(getIsX(location.pathname))
      setNowRouter(location.pathname)
      console.log(33333,location, action, isLogin)
    })

    var pio = new Paul_Pio({"mode":"fixed","hidden":false,content: {
      "welcome": ["欢迎来到这个爱酱不太聪明的博客~", "欧尼酱！"],
      "touch": ["今天也是元气满满的一天！", "欧尼酱！", "哈哈哈哈，不要戳了"],
      "skin": ["想看看我的新服装吗？", "新衣服真漂亮~"],
      "home": "点击这里回到首页！",
      "link": "http://localhost:8002/",
      "close": "QWQ 有缘再会吧~",
      // "referer": "你通过 %t 来到了这里",
      "custom": [
          {
              "selector": ".comment-form",
              "text": ["欢迎参与本文评论，别发小广告噢~", "快来参加本文的评论吧~"]
          }
      ]
  },"tips":true,"model":["json/model.json"]});

  }, [])

  let la = null;

  if (isX) {
    if (!isLogin) {
      console.log('x去登录')
      la = <Login />
    } else {
      console.log('x已登录')
      la = <SimpleLayout></SimpleLayout>
    }
  } else if (nowRouter === '/login') {
    console.log('手动去登录')
    la =  <Login />
  } else {
    console.log('普通')
    la =  <BaseLayout></BaseLayout>
  }

  return <>
    {la}
    <Modal
          title='选择城市'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
          style={{top: 150}}
        >
          <Input onChange={e => setCityInput(e.target.value)} value={cityInput} />
        </Modal>
        {props.children}
  </>

  // if (!isLogin) {
  //   history.push('/login')
  //   return <Login />
  // } else if (isX) {
  //   return <SimpleLayout></SimpleLayout>
  // } else {
  //   return <BaseLayout></BaseLayout>
  // }
}


export default function(props: any) {
  return <RecoilRoot>
    <App>
      <div className="pio-container right">
        <div className="pio-action"></div>
        <canvas id="pio" width="280" height="335"></canvas>
      </div>
    </App>
  </RecoilRoot>
}
