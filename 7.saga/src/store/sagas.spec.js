import test from 'tape'; //单元测试
import {incrementAsync} from './saga/watchIncrementAsync'
import readAsync from './saga/readAsync'
import {delay, readFile} from './utils'
import {call, cps, put} from 'redux-saga/effects' 
import * as types from './action-types'
test('incrementAsync saga test', function(assert) {
    let gen = incrementAsync();;
    assert.deepEqual(
        gen.next().value,
        call(delay,1000),
        "should return a promise which was delaied 1000 millseconds"
    );
    assert.deepEqual(
        gen.next().value,
        put({type:types.INCREMENT}),
        "should return a promise which was delaied 1000 millseconds"
    );
    assert.end();
})
test('readAsync saga test', function(assert) {
    let gen = readAsync();
    // let v1 = gen.next().value;//第一次产出的值
    assert.deepEqual(
        gen.next().value,
        cps(readFile, 'README.md'),
        'should return REMDME.md s content'
    )
    assert.deepEqual(
        gen.next(),
        {value:undefined, done:true},
        'should return done'
    )
    assert.end();
})
