// normalize the json date
const getDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1; // date starts at 0 and ends at 11
    let day = newDate.getDate();
    return `${day}-${month}-${year}`;
};

export default getDate;
