const timeFormat = {

    currentTime() {
        const time = new Date();
        // 三元表达式
        const yy = time.getFullYear();
        const mon = time.getMonth() + 1;
        const rr = time.getDate();
        const hh = time.getHours();
        const min = time.getMinutes();
        const sec = time.getSeconds();
        let mons = mon < 10 ? '0' + mon :mon;
        let rrs = rr < 10 ? '0' + rr : rr;
        let hhs = hh < 10 ? '0' + hh : hh;
        let mins = min < 10 ? '0' + min : min;
        let secs = sec < 10 ? '0' + sec : sec;
        return yy + '-' + mons + '-' + rrs + ' ' + hhs + ':' + mins + ':' + secs
    }
}

export default timeFormat;