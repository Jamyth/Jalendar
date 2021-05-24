const THIS_YEAR = new Date().getFullYear();
const THIS_MONTH = new Date().getMonth() + 1;
const CALENDAR_WEEK = 6;
const CALENDAR_MONTHS = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'Jun',
    July: 'Jul',
    August: 'Aug',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec',
};
const WEEK_DAYS = {
    Sunday: 'Sun',
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
};

function zeroPad(value: number, length: number) {
    return `${value}`.padStart(length, '0');
}

function getMonthDays(month = THIS_MONTH, year = THIS_YEAR) {
    const monthWith30Days = [4, 6, 9, 11];
    const isLeapYear = year % 4 === 0;

    return month === 2 ? (isLeapYear ? 29 : 28) : monthWith30Days.includes(month) ? 30 : 31;
}

function getMonthFirstDay(month = THIS_MONTH, year = THIS_YEAR) {
    return new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
}

function isSameMonth(date: Date, baseDate = new Date()) {
    const baseDateMonth = baseDate.getMonth() + 1;
    const baseDateYear = baseDate.getFullYear();

    const dateMonth = date.getMonth() + 1;
    const dateYear = date.getFullYear();

    return baseDateMonth === dateMonth && baseDateYear === dateYear;
}

function isSameDay(date: Date, baseDate = new Date()) {
    const baseDateDate = baseDate.getDate();
    const dateDate = date.getDate();

    return isSameMonth(date, baseDate) && baseDateDate === dateDate;
}

function getDateArray(date = new Date()) {
    return [`${date.getFullYear()}`, zeroPad(date.getMonth() + 1, 2), zeroPad(date.getDate(), 2)];
}

function getDateISO(date = new Date()) {
    return getDateArray(date).join('-');
}

function getPreviousMonth(month: number, year: number) {
    const prevMonth = month > 1 ? month - 1 : 12;
    const prevMonthYear = month > 1 ? year : year - 1;

    return {
        prevMonth,
        prevMonthYear,
    };
}

function getNextMonth(month: number, year: number) {
    const nextMonth = month < 12 ? month + 1 : 1;
    const nextMonthYear = month < 12 ? year : year + 1;

    return {
        nextMonth,
        nextMonthYear,
    };
}

function getCalendar(month = THIS_MONTH, year = THIS_YEAR): string[][] {
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth = CALENDAR_WEEK * 7 - (daysFromPrevMonth + monthDays);

    const { prevMonth, prevMonthYear } = getPreviousMonth(month, year);
    const { nextMonth, nextMonthYear } = getNextMonth(month, year);

    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((_, i) => {
        const day = i + 1 + (prevMonthDays - daysFromPrevMonth);
        return [`${prevMonthYear}`, zeroPad(prevMonth, 2), zeroPad(day, 2)];
    });

    const thisMonthDates = [...new Array(monthDays)].map((_, i) => {
        const day = i + 1;
        return [`${year}`, zeroPad(month, 2), zeroPad(day, 2)];
    });

    const nextMonthDates = [...new Array(daysFromNextMonth)].map((_, i) => {
        const day = i + 1;
        return [`${nextMonthYear}`, zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });

    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
}

function getMonthYearFromDate(date = new Date()) {
    return [date.getMonth() + 1, date.getFullYear()];
}

function getHourMinutes(date = new Date()) {
    return [date.getHours(), date.getMinutes()];
}

function isDate(date: any): boolean {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());

    return isDate && isValidDate;
}

function getDateFromHourMinutes(date: Date, hour: number, minutes: number) {
    date.setHours(hour, minutes);
    return new Date(date);
}

export const CalendarUtil = Object.freeze({
    zeroPad,
    getMonthDays,
    getMonthFirstDay,
    isSameMonth,
    isSameDay,
    getDateArray,
    getDateISO,
    getPreviousMonth,
    getNextMonth,
    getCalendar,
    getMonthYearFromDate,
    getHourMinutes,
    getDateFromHourMinutes,
    THIS_MONTH,
    THIS_YEAR,
    CALENDAR_MONTHS,
    CALENDAR_WEEK,
    WEEK_DAYS,
});
