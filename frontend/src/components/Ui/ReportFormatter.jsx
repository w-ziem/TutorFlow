import React from 'react';
import { FileText, AlertTriangle, Lightbulb, CheckSquare, User } from 'lucide-react';
import SectionCard from "./SectionCard.jsx";

const ReportFormatter = ({ reportText }) => {
    const parseReport = (text) => {
        if (!text || typeof text !== 'string') {
            return null;
        }

        const sections = {};

        // Znajdź wszystkie nagłówki sekcji w tekście
        const sectionHeaders = [
            { key: 'diagnosis', pattern: /\*\*Diagnoza problemu:\*\*/i },
            { key: 'causes', pattern: /\*\*Przyczyny:\*\*/i },
            { key: 'solutions', pattern: /\*\*Rozwiązania:\*\*/i },
            { key: 'nextSteps', pattern: /\*\*Propozycje kolejnych kroków:\*\*/i }
        ];

        // Znajdź pozycje wszystkich nagłówków
        const headerPositions = [];
        sectionHeaders.forEach(section => {
            const match = text.match(section.pattern);
            if (match) {
                headerPositions.push({
                    key: section.key,
                    start: match.index + match[0].length,
                    headerEnd: match.index + match[0].length
                });
            }
        });

        // Sortuj pozycje według kolejności w tekście
        headerPositions.sort((a, b) => a.start - b.start);

        // Wyodrębnij zawartość każdej sekcji
        headerPositions.forEach((current, index) => {
            const nextSection = headerPositions[index + 1];
            const endPos = nextSection ? nextSection.start - nextSection.headerEnd + text.indexOf('**', nextSection.start - 50) : text.length;

            let content = text.substring(current.start, endPos).trim();

            // Usuń wszystkie znaczniki markdown (**tekst**)
            content = content.replace(/\*\*(.*?)\*\*/g, '$1');

            // Usuń dodatkowe znaczniki markdown na końcu (niepełne pary)
            content = content.replace(/\*\*[^*]*$/, '').trim();

            if (content) {
                sections[current.key] = content;
            }
        });

        // Fallback dla przypadków bez markdown
        if (Object.keys(sections).length === 0) {
            const altPatterns = {
                diagnosis: /Diagnoza problemu:\s*(.*?)(?=Przyczyny:|$)/si,
                causes: /Przyczyny:\s*(.*?)(?=Rozwiązania:|$)/si,
                solutions: /Rozwiązania:\s*(.*?)(?=Propozycje kolejnych kroków:|$)/si,
                nextSteps: /Propozycje kolejnych kroków:\s*(.*?)$/si
            };

            Object.keys(altPatterns).forEach(key => {
                const match = text.match(altPatterns[key]);
                if (match) {
                    sections[key] = match[1].trim();
                }
            });
        }

        // Jeśli nadal nie znaleziono struktury, zwróć cały tekst jako diagnozę
        if (Object.keys(sections).length === 0) {
            sections.diagnosis = text;
        }

        console.log('Parsed sections:', sections);

        return sections;
    };

    const sections = parseReport(reportText);

    if (!sections) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center text-red-700">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span>Nieprawidłowy format raportu</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <SectionCard
                title="Diagnoza Problemu"
                content={sections.diagnosis}
                icon={FileText}
                bgColor="bg-blue-50"
                textColor="text-blue-800"
            />

            <SectionCard
                title="Przyczyny"
                content={sections.causes}
                icon={AlertTriangle}
                bgColor="bg-amber-50"
                textColor="text-amber-800"
            />

            <SectionCard
                title="Rozwiązania"
                content={sections.solutions}
                icon={Lightbulb}
                bgColor="bg-green-50"
                textColor="text-green-800"
            />

            <SectionCard
                title="Propozycje Kolejnych Kroków"
                content={sections.nextSteps}
                icon={CheckSquare}
                bgColor="bg-purple-50"
                textColor="text-purple-800"
            />
        </div>
    );
};

export default ReportFormatter;