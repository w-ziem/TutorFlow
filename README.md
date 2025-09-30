# 📚 TutorFlow

**TutorFlow** to aplikacja webowa wspierająca korepetytorów i uczniów w organizacji procesu nauczania.  
Umożliwia zarządzanie uczniami, materiałami dydaktycznymi i lekcjami, śledzenie płatności (integracja ze Stripe), a także generowanie raportów przy użyciu AI.  

Aplikacja została zaprojektowana jako **fullstack** w oparciu o nowoczesny stack technologiczny:  
- **Backend:** Spring Boot (Java), Spring Security, JPA/Hibernate, PostgreSQL  
- **Frontend:** React, React router, Vite, TailwindCSS, lucide, Axios  
- **Inne:** Stripe API (płatności), OpenAI API (raporty AI)  

---

## ✨ Funkcjonalności

### 👨‍🏫 Dla korepetytora:
- Dodawanie i edycja **uczniów** (imię, email, poziom edukacji, stawka godzinowa, link komunikacyjny).  
- Zarządzanie **lekcjami**: planowanie, oznaczanie jako zakończone, wystawianie ocen i notatek.  
- **Generowanie raportów AI** (np. podsumowania postępów ucznia).  
- **Podgląd płatności** – śledzenie statusu i historii wpłat uczniów.  
- Dashboard z kluczowymi metrykami (liczba lekcji, aktywni uczniowie, nieopłacone zajęcia).  

### 👩‍🎓 Dla ucznia:
- Dostęp do listy swoich lekcji, materiałów i ocen.  
- Możliwość płatności za zajęcia przez **Stripe Checkout**.  
- Wgląd w historię płatności i lekcji.  
- Automatycznie generowane raporty z postępów.  

---

## 🛠️ Stack technologiczny

### Backend (Spring Boot)
- **Spring Boot 3+** – serce backendu  
- **Spring Security + JWT** – autentykacja i autoryzacja  
- **Spring Data JPA + Hibernate** – ORM i komunikacja z bazą danych  
- **PostgreSQL** – baza danych 
- **Stripe Java SDK** – integracja płatności  
- **OpenAI API** – generowanie raportów AI  
- Architektura oparta o **RESTful API**  

### Frontend (React)
- **React 18 + Vite** – szybki bundling i HMR  
- **TailwindCSS** – stylizacja i responsywność  
- **faicons + lucide-react** – komponenty UI i ikony  
- **Axios** – komunikacja z backendem  
- **React Router** – routing między stronami  
- Kontekst do obsługi modali i formularzy  

---

## ⚙️ Deployment

w trakcie budowy
