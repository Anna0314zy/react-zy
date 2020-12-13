import Tree from './components/tree';
export interface TreeData {
    name: string;
    key: string;
    colladpsed: boolean;
    children?: TreeData[];
    parent?:TreeData | undefined;
    checked?:boolean;
    indeterminate?:boolean;
    loading?: boolean //是否正在加载儿子
  }
  