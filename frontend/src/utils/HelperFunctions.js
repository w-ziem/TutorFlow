export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};


export const formatLink = (link) => {
    if (!link) return '#';
    if (link.startsWith('http://') || link.startsWith('https://')) {
        return link;
    }
    return `https://${link}`;
};
