import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
dayjs.extend(duration);
moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    //@ts-ignore
    meridiemHour: (hour, meridiem) => {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    //@ts-ignore
    meridiem: (hour, minute, isLower?: any) => {
        if(isLower) {
            // console.log(isLower)
        }
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    //@ts-ignore
    ordinal: (number, period) => {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
})

export const formatMonthAndDay = (value: any) => {
    // return 12.11
    const localeVal = moment(value).format("MMM Do YY").split('')
    localeVal.pop()
    localeVal.pop()
    localeVal.pop()
    const res = localeVal.map((item: any) => {
        if (item === '月') {
            return '.'
        }
        if (item === ' ') {
            return
        }
        if (item === '日') {
            return
        }
        return item
    }).join('')
    return res
}
export const formatterTime = (val: any) => {
    //return YYYY-MM-DD
    return val ? moment(val).format('YYYY-MM-DD') : '';
};

export const formatterTimeToSeconds = (val: any) => {
    //YYYY-MM-DD HH:mm:ss
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
};

export const disabledDate = (current: any) => {
    return current && current > dayjs().endOf('day');
};

export const getTimes = (recentDay: number, format = 'YYYY-MM-DD') => {
    const today = dayjs();
    const recentDayAgo = today.subtract(recentDay, 'day');
    const startTime = recentDayAgo.startOf('day').format(format);
    const endTime = recentDay === 1 ? startTime : today.format(format);
    return [startTime, endTime];
};

export const getLastWeekRange = () => {
    const endDate = dayjs().subtract(1, 'day'); // 昨天的日期
    const startDate = endDate.subtract(1, 'week'); // 一周前的日期

    // 格式化日期
    const formattedStartDate = startDate.format('YYYY.MM.DD');
    const formattedEndDate = endDate.format('YYYY.MM.DD');

    return `${formattedStartDate}-${formattedEndDate}`;
}

export const formatSecond = (second: any) => {
    const duration = dayjs.duration(Number(second), 'seconds');
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    let formattedTime = '';

    if (days > 0) {
        formattedTime += `${days}天`;
    }

    if (hours > 0) {
        formattedTime += `${hours}小时`;
    }

    if (minutes > 0 || hours > 0) {
        formattedTime += `${minutes}分`;
    }

    formattedTime += `${seconds}秒`;

    return formattedTime.trim();
};
export const getCurrentDate = () => {
    // 获取当前日期
    const date = new Date();
    // 获取当前月份
    let nowMonth = date.getMonth() + 1;
    // 获取当前是几号
    let strDate = date.getDate();
    // 添加分隔符“-”
    const seperator = "-";
    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        //@ts-ignore
        nowMonth = "0" + nowMonth;
    }
    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        //@ts-ignore
        strDate = "0" + strDate;
    }
    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    const nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
    return nowDate
}
export function formatMsgTime(dateTimeStamp: any) {
    // 时间字符串转时间戳 获取毫秒数
    const timestamp = new Date(dateTimeStamp.replace(/-/g, '/')).getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // const halfamonth = day * 15;
    const month = day * 30;
    const year = day * 365;
    const now = new Date().getTime();
    const diffValue = now - timestamp;
    let result;
    if (diffValue < 0) {
        return;
    }
    const yearC = diffValue / year;
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;
    if (yearC >= 1) {
        result = "" + parseInt(yearC.toString()) + "年前";
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC.toString()) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC.toString()) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC.toString()) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC.toString()) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC.toString()) + "分钟前";
    } else
        result = "刚刚";
    return result;
}
export function timeCommon(dateString: any) {
    // 解析日期字符串为Date对象
    const futureDate = new Date(dateString);
    // 获取当前时间的时间戳
    const now = new Date().getTime();
    // 计算时间差（未来时间戳 - 当前时间戳）
    const diffValue = futureDate.getTime() - now;

    if (diffValue < 0) {
        return formatMsgTime(dateString)
        //   return '时间错误，未来日期不能小于当前时间。';
    }

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // 假设平均每月30天
    const year = day * 365.25; // 考虑闰年

    let result;
    if (diffValue > year) {
        result = Math.floor(diffValue / year) + '年后';
    } else if (diffValue > month) {
        result = Math.floor(diffValue / month) + '个月后';
    } else if (diffValue > week) {
        result = Math.floor(diffValue / week) + '周后';
    } else if (diffValue > day) {
        result = Math.floor(diffValue / day) + '天后';
    } else if (diffValue > hour) {
        result = Math.floor(diffValue / hour) + '小时后';
    } else if (diffValue > minute) {
        result = Math.floor(diffValue / minute) + '分钟后';
    } else {
        result = '刚刚';
    }
    return result;
}
export function timeUntil(dateString: any) {
    // 解析日期字符串为Date对象
    const futureDate = new Date(dateString);
    // 获取当前时间的时间戳
    const now = new Date().getTime();
    // 计算时间差（未来时间戳 - 当前时间戳）
    const diffValue = futureDate.getTime() - now;

    if (diffValue < 0) {
        // return formatMsgTime(dateString)
        return 0;
    }

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // 假设平均每月30天
    const year = day * 365.25; // 考虑闰年

    let result;
    if (diffValue > year) {
        result = Math.floor(diffValue / year) + '年后';
    } else if (diffValue > month) {
        result = Math.floor(diffValue / month) + '个月后';
    } else if (diffValue > week) {
        result = Math.floor(diffValue / week) + '周后';
    } else if (diffValue > day) {
        result = Math.floor(diffValue / day) + '天后';
    } else if (diffValue > hour) {
        result = Math.floor(diffValue / hour) + '小时后';
    } else if (diffValue > minute) {
        result = Math.floor(diffValue / minute) + '分钟后';
    } else {
        result = '0分钟后';
    }
    return result;
}

export const getNormalDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);
    return formattedDate
}
//yyyy-MM-dd HH:mm:ss 当前时间
export const getCurrentDateTime = () => {
    const date = new Date();
    const seperator = "-";
    const timeSeperator = ":";

    let month:any = date.getMonth() + 1;
    month = month >= 1 && month <= 9 ? "0" + month : month;

    let day:any = date.getDate();
    day = day >= 0 && day <= 9 ? "0" + day : day;

    let hours:any = date.getHours();
    hours = hours >= 0 && hours <= 9 ? "0" + hours : hours;

    let minutes:any = date.getMinutes();
    minutes = minutes >= 0 && minutes <= 9 ? "0" + minutes : minutes;

    let seconds:any = date.getSeconds();
    seconds = seconds >= 0 && seconds <= 9 ? "0" + seconds : seconds;

    const nowDateTime = date.getFullYear() + seperator + month + seperator + day + " " + hours + timeSeperator + minutes + timeSeperator + seconds;
    return nowDateTime;
}
//yyyy-MM-dd HH:mm:ss 指定value时间
export const getDateTime = (value: any) => {
    const date = new Date(value);
    const seperator = "-";
    const timeSeperator = ":";

    let month:any = date.getMonth() + 1;
    month = month >= 1 && month <= 9 ? "0" + month : month;

    let day:any = date.getDate();
    day = day >= 0 && day <= 9 ? "0" + day : day;

    let hours:any = date.getHours();
    hours = hours >= 0 && hours <= 9 ? "0" + hours : hours;

    let minutes:any = date.getMinutes();
    minutes = minutes >= 0 && minutes <= 9 ? "0" + minutes : minutes;

    let seconds:any = date.getSeconds();
    seconds = seconds >= 0 && seconds <= 9 ? "0" + seconds : seconds;

    const nowDateTime = date.getFullYear() + seperator + month + seperator + day + " " + hours + timeSeperator + minutes + timeSeperator + seconds;
    return nowDateTime;
}
//传入第一天，得到当月的最后一天
export function getLastDayOfMonth(firstDayOfMonth: any) {
    // 创建一个新的日期对象，设置为传入的第一天的月份加一（下一个月）
    const nextMonthFirstDay = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 1);

    // 将日期回退一天，这样就得到了当前月的最后一天
    nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - 1);

    return nextMonthFirstDay;
}

// 判读给定日期是否在当前月份
export function isDateInCurrentMonth(givenDate: any) {
    const currentDate = new Date(); // 获取当前日期
    const year = currentDate.getFullYear(); // 获取当前年份
    const month = currentDate.getMonth(); // 获取当前月份（从0开始）

    const givenYear = givenDate.getFullYear();
    const givenMonth = givenDate.getMonth();

    return givenYear === year && givenMonth === month;
}

// 获取当前月份有多少天
export function getDaysInCurrentMonth(date:Date) {
    let days = 0;
    switch (date.getMonth()) {
        case 1: // 二月
            if (((date.getFullYear() % 4 === 0) && !(date.getFullYear() % 100 === 0)) || (date.getFullYear() % 400 === 0)) {
                days = 29;
            } else {
                days = 28;
            }
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            days = 30;
            break;
        default:
            days = 31;
    }
    return days;
}