import './style/index.less'
const initWebpack = () => {
    console.log('hello webpack')
}

class Teacher {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name
    }
}
initWebpack()