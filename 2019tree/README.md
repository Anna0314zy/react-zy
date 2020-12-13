# 安装依赖
cnpm init -y
cnpm i react@16 @types/react react-dom@16 @types/react-dom -S
cnpm i webpack@4 webpack-cli@3 webpack-dev-server@3 -D
cnpm i typescript ts-loader source-map-loader style-loader css-loader less-loader less file-loader url-loader html-webpack-plugin -D
cnpm i jest @types/jest ts-jest jest-junit enzyme @types/enzyme enzyme-adapter-react-16 
cnpm i @types/enzyme-adapter-react-16 -D
cnpm i axios express qs @types/qs -D

tsc --init 生成
# 单元测试 
-jest
-安装依赖包
-创建配置文件
