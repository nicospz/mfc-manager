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
    let processedDate;
    if (day === 0) {
        processedDate = new Date(Date.UTC(year, month - 1, 28));
    } else {
        processedDate = new Date(Date.UTC(year, month - 1, day));
    }
    return processedDate;
};
