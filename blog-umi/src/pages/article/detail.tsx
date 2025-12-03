import { useLocation } from 'umi'
import { detail as getDetail  } from '../../services/article'
import { useState, useEffect, useRef, cloneElement } from 'react';
import { Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import styles from './detail.less'
import dayjs from 'dayjs'
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css'
import 'juejin-markdown-themes/dist/juejin.min.css'  // 其实就是需要这个css文件

import { asBlob } from 'html-docx-js-typescript'
// if you want to save the docx file, you need import 'file-saver'
import { saveAs } from 'file-saver'

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const scale = 2

const plugins = [
  gfm(), 
]

const DocsPage = () => {
    const location = useLocation()
    const [detail, setDetail] = useState(null)

    const html = useRef()

    // 导出为word
    const handleExport = async () => {
      html.current && asBlob(document.getElementById('root').getElementsByClassName('ant-layout-content')[0].outerHTML).then(data => {
        saveAs(data, '下载.docx') // save as docx file
      })
    }

    // 导出pdf
    const handleExportPdf = async () => {
      // 这里的元素必须是整个
      html2canvas(document.getElementsByClassName('ant-layout-content')[0].children[0]).then(function(canvas) {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //pdf页面偏移
        var position = 0;
        //a4纸的尺寸[595.28, 841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 595.28 / contentWidth * contentHeight;

        var pageData = canvas.toDataURL('image/jpeg', 1.0);

        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 50, 0, imgWidth, imgHeight );
        } else {
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }

        pdf.save('导出为PDF.pdf'); //
      });

      // let canBox = document.createElement('canvas');
      // let pefEle = document.getElementsByClassName('markdown-body')[0];
      // // let pefEle = document.getElementsByTagName('article')[0]
    
      // const canvas = await html2canvas(pefEle, {
      //   canvas: createCanvas(pefEle),
      //   background: '#fff'
      // })
      // downloadPdf(canvas)
      // // pefEle.hidden = true;
      // canBox.appendChild(canvas)
    }

  function downloadPdf(canvas) {
    //将canvas变成PDF并下载
      const size = [canvas.width / scale, canvas.height / scale] //pdf真实宽高
      //第一个参数表示横向与纵向，具体可看文档，我这里做了一个适配，宽比高长则是横向反之则是纵向
      const doc = new jsPDF(size[0] / size[1] > 1 ? 'l' : 'p', 'px', size)
      var contentHeight = canvas.height;
      var contentWidth = canvas.width;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89;
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      //pdf页面偏移
      var position = 0;
      var imgWidth = 595.28;
      var imgHeight = 592.28 / contentWidth * contentHeight;

      // if (leftHeight < pageHeight) {
        doc.addImage(pageData, 'JPEG', 0, 0, ...size) //将canvas转换为图片并添加到jsPDF中
      // } else {
      //   while (leftHeight > 0) {
      //     doc.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      //     leftHeight -= pageHeight;
      //     position -= 841.89;
      //   // 避免添加空白页
      //     if (leftHeight > 0) {
      //       doc.addPage();
      //     }
      //   }
      // }
      
      doc.save("test.pdf"); //保存PDF
  }

  function createCanvas(target) { //target是待截取的标签，我们通过target生成对应大小的canvas
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d")
      let clientRect = target.getBoundingClientRect() // 获取标签相对可视区域的偏移量
      canvas.width = target.offsetWidth * scale * 2; // 画布实际宽度
      canvas.height = target.offsetHeight * scale * 2; // 画布实际高度
      canvas.style.width = target.offsetWidth + 'px' // 浏览器上显示的宽度
      canvas.style.height = target.offsetHeight + 'px' //浏览器上显示的高度
      context.scale(scale, scale); //等比缩放
      console.log(1111111, clientRect, target.offsetWidth, target.offsetHeight, target.scrollHeight, target.scrollWidth)
      context.translate(0, 0); //通过translate取反位移
      return canvas
  }

    useEffect(() => {
        // let id = location.pathname.split('/').pop()
        let id = location.search.split('?')[1].split('&').map(item => {
          const arr = item.split('=')
          return arr[0] === 'pageid' && arr[1]
        })
        getDetail(id).then(res => res.status === 'ok' && setDetail(res.data))
    }, [location.pathname])

    return (
      <article ref={html} className={styles.container}>
        {detail && <>
          <header>
            <h1>{detail.title}</h1>
            <div>
              <span>{detail.creater}</span>
              <span>{dayjs(Number(detail.pub_time + '000')).format('YYYY-MM-DD HH:mm:ss')}</span>
              <span className={styles.read}>阅读：{detail.read}</span>
              <span className={`${styles.word} download`} onClick={handleExport}>Word下载</span>
              <span className={`${styles.pdf} download`} onClick={handleExportPdf}>PDF下载</span>
            </div>
          </header>
          <Viewer
            value={detail.content}
            plugins={plugins}
          />
        </>}
      </article>
    );
  };
  
  export default DocsPage;
  