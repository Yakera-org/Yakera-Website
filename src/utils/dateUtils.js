const getHumanReadableDate = date => 
    `${new Date(date).toLocaleDateString()}`;

export default getHumanReadableDate;