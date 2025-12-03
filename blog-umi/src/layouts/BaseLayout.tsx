import { Link, Outlet, history } from 'umi';
import { Avatar, Breadcrumb, Layout, Menu, Popconfirm } from 'antd';
import rotues from '../router'
import { useEffect, useLayoutEffect } from 'react';
import { userInfo, delInfo } from '@/store';
import { useRecoilValue, useRecoilState } from 'recoil';

import 'antd/dist/antd.less'
import styles from './index.less'

const { SubMenu, Item } = Menu

const { Header, Content, Footer } = Layout;

const items = [
  {
    label: '首页',
    key: '/',
  },
  {
    label: '微博',
    key: '/weibo',
    children: [
      {
        label: '热搜榜',
        key: '/weibo/search'
      },
      {
        label: '话题榜',
        key: '/weibo/topic'
      },
      {
        label: '要闻榜',
        key: '/weibo/socialevent'
      },
      {
        label: '文娱榜',
        key: '/weibo/entrank'
      },
      
    ]
  },
  {
    label: '百度',
    key: '/baidu',
  },
  {
    label: '知乎',
    key: '/zhihu'
  },
  // {
  //   label: '实验室',
  //   key: '',
  //   children: [
  //     {
  //       label: '高德地图',
  //       key: '/map'
  //     },
  //     {
  //       label: '知妖',
  //       key: '/zhiyao'
  //     },
  //     {
  //       label: '汽车销量榜',
  //       key: '/car'
  //     }
  //   ]
  // }
]

const App = () => {
    // const user = useRecoilValue(userInfo)
    const [user, setUser] = useRecoilState(userInfo)

    const getMenuList = (routes) => {
      return (
        routes &&
        routes
          .filter((route) => !route.redirect)
          .map((item) => {
            if (item.routes) {
              return renderSubMenu(item)
            }
  
            return renderMenu(item)
          })
      )
    }

    const renderSubMenu = ({ path, name, routes }) => {
      return (
        <SubMenu
            key={path}
            title={name}
          >
            {getMenuList(routes)}
          </SubMenu>
      )
    }

    const renderMenu = ({ path, name }) => {
      return (
        <Item key={path}>
            {name}
        </Item>
      )
    }

    const menuList = getMenuList(rotues)

    return <Layout className={styles.layout}>
    <Header className={styles.baseHeader}>
      <Menu 
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        items={items}
        onClick={item => history.push(item.key)}
      />
      <div className={styles.logo}>
        {user ? <div className={styles.user}>
          <Popconfirm title='操作'
            onConfirm={() => {
              setUser(null)
              delInfo()
              history.push('/')
            }}
            onCancel={() => {
              history.push('/x/home')
            }}
            okText="退出"
            cancelText="去X世界"
          >
            <span>{user.name}</span>
            <Avatar src={user.pic} />
          </Popconfirm>
          </div> : <span onClick={() => history.push('/login')}>登录</span>}
      </div>
    </Header>
    <Content
      style={{
        padding: '0 50px',
        height: 'calc(100% - 64px)',
        overflowY: 'auto'
      }}
    >
      <div className={styles['site-layout-content']}>
        <Outlet />
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      @2023 云谷
    </Footer>
  </Layout>
};
export default App;