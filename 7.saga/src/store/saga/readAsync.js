import { readFile } from '../utils';
import {cps} from 'redux-saga/effects'; //这个库里有delay

export default function* readAsync() {
    //yield 只适用调用call方法
    let content = yield cps(readFile, 'README.md');
    console.log(content)
}