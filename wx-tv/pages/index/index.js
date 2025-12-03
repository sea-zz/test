// index.js

Page({
    data: {
        list: [],
        loading: false,
        searchList: null,
        currentTitle: '',
        currentData: null
    },
    onLoad: function() {
        const that = this;
        wx.request({
          url: 'https://site-tools.netlify.app/assets/menu.json',
          success(res) {
            const menuWithList = [];
            res.data.map(item => {
                wx.request({
                  url: `https://site-tools.netlify.app/assets/${item.title}.json`,
                  success(ret) {
                    menuWithList.push({...item, data: ret.data})
                    that.setData({
                        list: menuWithList,
                        currentTitle: menuWithList[0].title,
                        currentData: menuWithList[0]
                    });
                  }
                })
            })
          }
        });
    },
    // 查询
    onSubmit: function (e) { 
        const tvName = e.detail.value.title.toLowerCase();
        if (tvName) {
            this.setData({ loading: true }); // 按钮搜索
            wx.showLoading(); // loading 展示
            let searchData = [];
            this.data.list.forEach(item => {
                item.data.list.forEach(ite => {
                    ite['tvg-name'].toLowerCase().includes(tvName) && searchData.push(ite);
                });
            });

            this.setData({
                loading: false,
                searchList: searchData
            });
            wx.hideLoading();
        } else { 
            wx.showToast({
                title: '请输入频道名称',
                icon: 'error', // 'success', 'loading', 'none'
                duration: 2000 // 持续时间，单位为毫秒
            });
            this.setData({
                searchList: null
            });
        }
    },
    onChangeCate: function (e) {
        let cateTitle = e.currentTarget.dataset.title;
        let cateData = this.data.list.find(item => item.title === cateTitle);
        this.setData({
            currentTitle: cateTitle,
            currentData: cateData
        });
    },
    handleChange: function(e) {
        if (!e.detail.value) {
            this.setData({
                searchList: null
            });
        }
    },
})
