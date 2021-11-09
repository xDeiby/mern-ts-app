export const parseTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
};

export const parseInverse = (parse_time: string) => {
    const times = parse_time.split(':');
    return parseInt(times[0]) * 60 + parseInt(times[1]);
};

export const parseDate = (parse_date: Date): string => {
    const day =
        parse_date.getDate() >= 10
            ? parse_date.getDate()
            : `0${parse_date.getDate()}`;
    const mounth =
        parse_date.getMonth() + 1 >= 10
            ? parse_date.getMonth()
            : `0${parse_date.getMonth() + 1}`;
    const year = parse_date.getFullYear();

    return `${year}-${mounth}-${day}`;
};
