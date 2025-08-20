export const listConfig = {
    students: {
        heading: "Twoi uczniowie",
        description: "Tutaj możesz przeglądać swoją listę uczniów.",
        addButton: "Dodaj ucznia",
        endpoint: "/students",
    },
    lessons: {
        heading: "Twoje lekcje",
        description: "Tutaj możesz zarządzać swoimi lekcjami.",
        addButton: "Dodaj lekcję",
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
