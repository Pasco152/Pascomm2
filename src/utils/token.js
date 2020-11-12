// 工具人函数

// 把key提取出来
const TOKEN = 'token'

// 保存token
function saveToken(val) {
    window.localStorage.setItem(TOKEN, val)
}

// 获取token 
function getToken(TOKEN) {
    return window.localStorage.getItem(TOKEN)
}

// 删除token 
function removeToken(TOKEN) {
    window.localStorage.removeItem(TOKEN)
}

export { saveToken, getToken, removeToken } // 把函数暴露出去
