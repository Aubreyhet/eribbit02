import Mock from 'mockjs'

// mock的配置
Mock.setup({
  // 随机延时500-1000毫秒
  timeout: '500-1000'
})

Mock.mock(/\/my\/test/, 'get', () => {
  return { msg: '请求测试接口成功', result: [] }
})

// 单个数据
Mock.mock('@integer(0,7)')
// 对象数据
Mock.mock({
  id: '@id',
  name: '@ctitle(2,4)'
})
