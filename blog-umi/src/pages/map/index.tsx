import React, { useEffect, useRef } from "react";
import s from './index.less'
import AMapLoader from '@amap/amap-jsapi-loader';

export default function Map() {

    const container = useRef()

    useEffect(() => {
        let map;
        window._AMapSecurityConfig = {
            serviceHost: window.location.host + '/_AMapService',
            securityJsCode: 'ffbd12a45e3f3b4e6dfa3ad1087393c2'
            // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
        }

        AMapLoader.load({
            "key": "a2310fcac1c5726f81ecffe64e273c22",              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
            map = new AMap.Map(container.current, {
                zoom:11,//级别
                center: [116.397428, 39.90923],//中心点坐标
                viewMode:'3D',//使用3D视图

                // center: [116.397428, 39.90923],
                layers: [//使用多个图层
                    // new AMap.TileLayer.Satellite(),
                    new AMap.TileLayer.RoadNet(),
                    new AMap.TileLayer.Traffic({
                        zIndex: 10
                    })
                ],
                // zooms: [4,18],//设置地图级别范围
                // zoom: 11,
                // position:[116.39, 39.9]//位置
            });

            //实时路况图层
            // var trafficLayer = new AMap.TileLayer.Traffic({
            //     zIndex: 10
            // });
            // map.add(trafficLayer);//添加图层到地图
        }).catch(e => {
            console.log(e);
        })
    }, [])

    return <div ref={container} id='container' className={s.container}></div> 
}


