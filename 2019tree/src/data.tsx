//申明一个接口 定义一个变量的类型 定义对象的属性名和属性的类型
import {TreeData} from './typings'
const data: TreeData = {
  name: "父亲",
  key: "1",
  colladpsed: false,
  children: [
    {
      name: "儿子1",
      key: "1-1",
      colladpsed: false,
      children: [
        {
          name: "孙子",
          key: "1-1-1",
          colladpsed: false,
          children: [
            {
              name: "重孙1",
              key: "1-1-1-1",
              colladpsed: true,
              children: [],
            },
            {
              name: "重孙2",
              key: "1-1-1-2",
              colladpsed: true,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "儿子2",
      key: "1-2",
      colladpsed: true
    },
  ],
};
export default data;
