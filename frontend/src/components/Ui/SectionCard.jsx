import react from 'react';

const SectionCard = ({ title, content, icon: Icon, bgColor, textColor }) => {
    if (!content) return null;

    const formatListItems = (text) => {
        if (!text) return [];

        // Podziel tekst na elementy listy (numerowane lub punktowane)
        const items = text
            .split(/(?:\d+\.\s|\*\s|-\s|•\s)/)
            .filter(item => item.trim().length > 0)
            .map(item => item.trim());

        return items.length > 1 ? items : [text];
    };

    const items = formatListItems(content);

    return (
        <div className={`${bgColor} border-l-4 border-l-blue-500 rounded-lg p-6 shadow-xl hover:translate-x-1 transition duration-300`}>
            <div className={`flex items-center mb-4 ${textColor}`}>
                <Icon className="w-6 h-6 mr-3" />
                <h3 className="text-2xl font-semibold">{title}</h3>
            </div>
            <div className="space-y-3">
                {items.length > 1 ? (
                    <ol className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-gray-700 leading-relaxed text-lg">{item}</span>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-gray-700 leading-relaxed">{items[0]}</p>
                )}
            </div>
        </div>
    );
};


export default SectionCard;