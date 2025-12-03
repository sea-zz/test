import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './login.less'
import {getInfo} from '@/services/user'
import { useNavigate, history } from 'umi';
import { setInfo as setCookieInfo } from '@/store';
import { useRecoilState } from 'recoil';
import {userInfo} from '@/store'
import ParticlesBg from 'particles-bg'

const App: React.FC = () => {
  const [info, setInfo] = useRecoilState(userInfo)
  let navigate = useNavigate();
  const onFinish = async (values: any) => {
    const info = await getInfo(values)
    if (info.status === 'fail') {
        message.error('User not exists!')
    } else {
      history.push('/x/home')
      // history.go(-1)
      // navigate("../x/home", { replace: true });
      setInfo(info.data)
      setCookieInfo(info.data)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>
      <div className={styles.right}>
          <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.form}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="pass"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ParticlesBg type='cobweb' bg={true} />
    </div>
  );
};

export default App;