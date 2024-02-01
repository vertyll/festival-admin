## Założenia projektu 

Aplikacja internetowa wymyślonego festiwalu muzycznego - Sunset Festival. Jest to dedykowany panel administracyjny dla odpowiadającej mu strony internetowej wymyślonego festiwalu muzycznego. W panelu administracyjnym możemy zarządzać informacjami związanymi z festiwalem, dodawać, edytować i usuwać produkty, kategorie, atrybuty dla produktów, zarządzać stanami magazynowmi i ustawieniami konfiguracyjnymi dla strony i wiele więcej.

## Stos technologiczny

### Frontend:
- Next.js
- React
- Tailwind CSS do szybkiego stylowania komponentów
- Sweetalert2 do wyświetlania interaktywnych komunikatów
- date-fns do manipulacji datami

### Backend:
- MongoDB jako baza danych NoSQL
- Next-auth do uwierzytelniania użytkowników
- Axios do wykonywania żądań HTTP do serwera
- aws-sdk/client-s3 do integracji z usługą Amazon S3

### Inne:
- ESLint do statycznej analizy kodu i utrzymania jednolitej jakości kodu
- Sortable.js do obsługi sortowania elementów interfejsu użytkownika
- Lodash do efektywnego zarządzania danymi i manipulacji nimi
- Lottie-web do renderowania animacji wektorowych w formacie JSON
- mime-types do obsługi typów MIME

### Dodatkowe narzędzia:
- Next-reveal do efektownego wyświetlania treści podczas przewijania strony

## Usługi chmurowe użyte w projekcie

### Amazon AWS S3 Service:

Do przechowywania zdjęć wrzucanych za pomocą panelu administracyjnego został użyty Amazon AWS S3 Service. Jest to chmurowa usługa firmy Amazon służąca do przechowywania danych i zarządzania nimi. Usługa została wybrana w projekcie, ponieważ jest niezawodna. AWS oferuje wysoką dostępność centrów danych rozmieszczonych po całym świecie. Usługa jest również bardzo elastyczna, umożliwiając wybór różnych systemów i języków, a także oferuje dużą skalowalność. Dane są zaszyfrowane i można kontrolować dostęp do danych. AWS S3 Service jest bardzo pojemny, może przechowywać nielimitowaną ilość danych. S3 oferuje bogate API i zestawy SDK w wielu językach programowania, umożliwiając łatwą integrację z aplikacjami.

### Google Cloud Platform:

Kolejną usługą chmurową wykorzystaną w projekcie jest Google Cloud Platform. W kontekście autoryzacji została użyta usługa Google Cloud Console, umożliwiająca zarządzanie tożsamościami i uprawnieniami. Usługa jest bardzo bezpieczna, zapewniając zaawansowane funkcje bezpieczeństwa. Google Cloud Console umożliwia monitorowanie i logowanie, dzięki czemu możemy śledzić kto i kiedy uzyskał dostęp do zasobów. Umożliwia generowanie kluczy API, które możemy wykorzystywać w projektach, dlatego usługa ta idealnie wpasowała się w ramy projektowe. Tutaj logowanie zostało rozdzielone na dwa projekty, panel administracyjny i stronę festiwalu ze sklepem wykorzystując identyfikatory klienta OAuth 2.0.

Dzięki wykorzystaniu tych usług chmurowych projekt zyskał skalowalność, niezawodność oraz zaawansowane funkcje bezpieczeństwa, co znacznie zwiększyło jego funkcjonalność i atrakcyjność dla użytkowników.

## Zdjęcia poglądowe

![Widok projektu w Amazon S3 Service](https://nextjs-festival.s3.eu-north-1.amazonaws.com/Zrzut+ekranu+2024-02-1+o+19.56.44.png)
![Widok projektu w Amazon S3 Service](https://nextjs-festival.s3.eu-north-1.amazonaws.com/Zrzut+ekranu+2024-02-1+o+19.57.01.png)
![Widok projektu w Amazon S3 Service](https://nextjs-festival.s3.eu-north-1.amazonaws.com/Zrzut+ekranu+2024-02-1+o+19.57.10.png)
![Widok projektu w Amazon S3 Service](https://nextjs-festival.s3.eu-north-1.amazonaws.com/Zrzut+ekranu+2024-02-1+o+19.57.34.png)
![Widok projektu w Amazon S3 Service](https://nextjs-festival.s3.eu-north-1.amazonaws.com/Zrzut+ekranu+2024-02-1+o+19.57.45.png)

## Informacje dodatkowe

Aplikacja łączy się z stroną internetową festiwalu, która również jest dostępna w repozytrium GitHub.


## Instrukcja instalacji projektu

Pobieramy projekt na lokalne środowisko
Tworzymy plik .env i kopiujemy do niego zawartość .env.example, po czym definiujemy swoje własne klucze API i dane konfiguracyjne

Instalujemy npm za pomocą komendy:

```bash
npm install
```

Uruchamiamy aplikacje na lokalnym środowisku:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Domyśnie, jeżeli użyjemy jednej z powyższej komendy, aplikacja powinna być dostępna na adresie [http://localhost:3000](http://localhost:3000). Adres wklejamy do przeglądarki internetowej.
