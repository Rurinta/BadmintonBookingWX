Page({
  data:{
    imgUrls: [
         'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530342912&di=fac14d62b6a45a31cebb22991cb2b4d0&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.mat.shu.edu.cn%2FPortals%2F43%2F20151115%E7%BE%BD%E6%AF%9B%E7%90%83%E5%8F%8B%E8%B0%8A%E8%B5%9B-2.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529748330337&di=b36568c0a030f195f2f0fc9709bd36ca&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1682121874%2C1677265313%26fm%3D214%26gp%3D0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529748277402&di=aa798550b17ec1a5cc22101a0a833faa&imgtype=0&src=http%3A%2F%2Fblog.sina.com.cn%2Fpic%2F48201b9a8acafa29508da'
    ],
    contentItems:['',''],
    listItems:['','','','','']
  },
  news:function(e){
    wx.navigateTo({
      url: '../news/news'
    })
  },
  battle: function (e) {
    wx.navigateTo({
      url: '../battle/battle'
    })
  }
})