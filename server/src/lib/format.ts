export const processDate = (date: string) => {
    if (!date) {
        return undefined;
    }
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
    if (month === 0 && day === 0) {
        return undefined;
    }
    if (day === 0) {
        return new Date(year, month - 1, 28);
    }
    return new Date(year, month - 1, day);
};
