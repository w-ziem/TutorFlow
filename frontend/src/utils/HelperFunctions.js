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


export const getGradeColor = (grade) => {
    if (grade >= 9) return 'text-green-400';
    if (grade >= 7) return 'text-yellow-400';
    if (grade >= 5) return 'text-orange-400';
    return 'text-red-400';
};