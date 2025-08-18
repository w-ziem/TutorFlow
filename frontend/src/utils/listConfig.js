export const listConfig = {
    students: {
        heading: "Twoi uczniowie",
        description: "Tutaj możesz przeglądać swoją listę uczniów.",
        addButton: "Dodaj ucznia",
        columns: [
            { key: "studentName", label: "Imię i nazwisko" },
            { key: "email", label: "Email" },
            { key: "communicationLink", label: "Komunikacja" },
            { key: "educationLevel", label: "Poziom nauczania" },
            { key: "hourRate", label: "Stawka godzinowa" },
        ],
        endpoint: "/students",
    },
    lessons: {
        heading: "Twoje lekcje",
        description: "Tutaj możesz zarządzać swoimi lekcjami.",
        addButton: "Dodaj lekcję",
        columns: [
            { key: "id", label: "ID" },
            { key: "topic", label: "Temat" },
            { key: "date", label: "Data" },
        ],
        endpoint: "/lessons",
    },
    materials: {
        heading: "Twoje materiały",
        description: "Tutaj możesz przechowywać swoje materiały.",
        addButton: "Dodaj materiał",
        columns: [
            { key: "id", label: "ID" },
            { key: "title", label: "Tytuł" },
            { key: "type", label: "Typ" },
        ],
        endpoint: "/materials",
    },
};
