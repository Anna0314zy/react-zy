module.exports = {
    verbose: true,//显示详细信息
    clearMocks: true,//清楚mocks
    collectCoverage: true, //收集测试覆盖率信息
    reporters:["default","jest-junit"],
    moduleFileExtensions: ['js','jsx', 'ts', 'tsx'],
    moduleDirectories:['node_modules'],
    transform:{//如果模块是以tsx结尾的话 就需要用ts-jesy转译
        '^.+\\.tsx?$':"ts-jest"
    },
    //表示要进行单元测试的正则匹配
    testRegex: '(/__test__/.*|(test|spec)\\.(jsx|tsx))$'

}
