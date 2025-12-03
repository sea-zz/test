import { addArticle, upload } from '../../services/article'
import { cateAll, } from '@/services/cate';
import { tagALl } from '@/services/tag';
import { Editor } from '@bytemd/react'
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import 'bytemd/dist/index.min.css';
import { userId } from '@/store';
import { useRecoilValue } from 'recoil';

import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr';
import mediumZoom from "@bytemd/plugin-medium-zoom";
import gemoji from "@bytemd/plugin-gemoji";
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'

import { Button, Form, Input, message, Popover, Select, Checkbox, Col, Divider, Row } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import styles from './add.less'

// 引入中文包
import zhHans from "bytemd/lib/locales/zh_Hans.json";

const plugins = [
  gfm(), gemoji(), highlight(), mediumZoom(), breaks(), frontmatter()
  // Add more plugins here
]

function MoreItem(props) {
  
  const {value = {}, onChange, cateTag} = props;
  
  function handleInputChange(checkedValues: CheckboxValueType[]) {
    const cloneV = Object.assign({}, value, {tags: checkedValues});
    onChange && onChange(cloneV);
  }
  
  function handleItemAutoSelectChange(v) {
    const cloneV = Object.assign({}, value, {cate: v});
    onChange && onChange(cloneV);
  }
  
  return (
    <>
      {/* <Input.Group compact={true}> */}
        {cateTag && cateTag.cate &&  <Row wrap={false} align="middle" justify="start" gutter={[0, 10]} style={{marginBottom: 10}}>
          <Col flex="none">
          <div style={{ padding: '0 16px' }}>分类</div>
          </Col>
          <Col flex="auto">
            <Select
            onChange={handleItemAutoSelectChange}
            value={value.cate}
            mode="multiple"
            allowClear
            options={cateTag.cate.map(item => ({label: item.name, value: item.id}))}
            style={{width: '100%'}}
            placeholder="选择分类"
          />
          </Col>
          </Row>}
        {cateTag && cateTag.tag && <Row wrap={false} align="middle" justify="start" gutter={[0, 10]} style={{marginBottom: 10}}>
          <Col flex="none">
            <div style={{ padding: '0 16px' }}>标签</div>
          </Col>
          <Col flex="auto">
            <Checkbox.Group options={cateTag.tag.map(item => ({label: item.name, value: item.id}))} value={value.tags || []} onChange={handleInputChange} />
          </Col>
          </Row>
        }
      {/* </Input.Group> */}
    </>
  )
}

const DocsPage = () => {
    const formRef = React.createRef<FormInstance>();
    const form = Form.useForm()

    const userid = useRecoilValue(userId)

    const [cateTag, setCateTag] = useState(null)

    const onFinish = async (values: any) => {
      console.log('Success:', values);
      const saveData = Object.assign({}, values, {cate: values.more && values.more.cate && values.more.cate.length ? values.more.cate.join(',') : '', tags: values.more && values.more.tags && values.more.tags.length ? values.more.tags.join(',') : ''})
      delete saveData.more

      const res = await addArticle(saveData)
      if (res.status === 'ok') {
        message.success('添加成功')
        formRef.current?.resetFields();
      } else {
        message.error(res.msg)
      }
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    useEffect(() => {
      Promise.all([cateAll(), tagALl()]).then(([cate, tag]) => {
        const ret = {}
        cate.status === 'ok' && (ret.cate = cate.data)
        tag.status === 'ok' && (ret.tag = tag.data)

        setCateTag(ret)
      })
    }, [])

    return (
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={formRef}
        className={styles.form}
      >
        <Form.Item
          name='title'
          rules={[
            {
              required: true,
              message: '标题不能为空'
            },
          ]}
        >
          <Input 
              placeholder='请输入标题...'
              maxLength={50}
              showCount={true}
            />
        </Form.Item>
        <Form.Item
          name="content"
          initialValue={''}
          rules={[
            {
              required: true,
              message: '内容不能为空'
            },
          ]}
        >
          <Editor
            plugins={plugins}
            locale={zhHans}
            uploadImages={async files => {
              let data = new FormData()
              data.append('file', files[0])
              const {data: ret} = await upload(data)
              return [
                {
                  url: '/api' + ret.url,
                  title: files[0].name
                }
              ]
            }}
          />
        </Form.Item>
        <Form.Item
          name='uid'
          label='创建人'
          initialValue={userid}
          hidden
        >
          <Input />
        </Form.Item>
        <div className={styles.footer}>
          <Popover placement="topLeft" title={'更多'} content={<React.Fragment>
              <Form.Item name="more">
                <MoreItem cateTag={cateTag} />
              </Form.Item>
            </React.Fragment>} trigger="click"
            overlayInnerStyle={{ width: 600, height: 300, overflowY: 'auto'}}
            >
              <Button>更多</Button>
            </Popover>
          <Form.Item>
            <Button type='primary' htmlType='submit'>保存</Button>
          </Form.Item>
        </div>
      </Form>
    );
  };
  
  export default DocsPage;
  