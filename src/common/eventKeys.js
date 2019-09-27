// 申明用户pubsub-js的组件之间的通信

const EventKeys = {
    // 获取种类的名字
    getCategoryName: 'getCategoryName'
}

export default EventKeys;


/**
 * 使用方法
 * 
 * 发布事件
 * import Pubsub from 'pubsub-js';
 * import EventKeys from '@/common/eventKeys';
 * Pubsub.pulish(a,b) ----->a代表发布事件的名字，b是参数数据
 * ------------------------------
 * 订阅数据
 * Pubsub.subscribe(a,(keyName,val)=>{
 *  console.log(val)
 * });
 * 
 * a---->代表的接收keyName 
 * keyName----->表示的是事件的名称
 * val------->传递的数据
 * 
 * 
 * 
 * eg:
 * Pubsub.pulish('form',b) -
 * 
 * Pubsub.subscribe('form',(keyName,val)=>{
 *  console.log(val)
 * });
 */