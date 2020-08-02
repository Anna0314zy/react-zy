


export default {
    login(username, password) {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                if (Math.random()>0) {
                    reslove(username+new Date().getTime())
                }else {
                    reject('登录失败');
                }
            }, 1000)
        })
    },
    setItem(key, value) {
        localStorage.setItem(key, value);
    },
    getTtem(key) {
        return localStorage.getItem(key);
    }
}