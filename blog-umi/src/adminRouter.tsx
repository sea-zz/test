import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    TagOutlined,
    SwapLeftOutlined
  } from '@ant-design/icons';

export default [
    {
        key: '/x',
        label: '文章管理',
        icon: <DesktopOutlined />,
        children: [
            {
                key: '/x/add',
                label: '添加文章',
            },
            {
                key: '/x/home',
                label: '文章列表',
            }
        ]
    },
    {
        key: '/x/cate',
        label: '分类',
        icon: <PieChartOutlined />
    },
    {
        key: '/x/tag',
        label: '标签',
        icon: <TagOutlined />
    },
    {
        key: '/x/user',
        label: '用户',
        icon: <UserOutlined />
    },
    {
        key: '/',
        label: '首页',
        icon: <SwapLeftOutlined />
    }
]
