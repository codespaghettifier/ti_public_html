import "./Documentation.css"

function Documentation(props)
{
    return (
        <div className='documentation'>
            <h2>Dokumentacja</h2>
            <h3>Opis projektu</h3>
            <p>Projekt jest systemem do zbierania danych ankietowych. Aplikacja obsługuje ankiety w postaci plików xml napisanych zgodnie z przykładem umieszczonym w /polls/template.xml. Tak skonstruowana ankieta powinna zostać umieszczona w katalogu /polls. Następnie należy dodać wpis do /src/components/PollMenu/PollMenu.js oraz /src/components/Poll/Poll.js (savePollData()). W ten sposób dodana ankieta jest już dostępna w systemie i można ją wypełniać.</p>
            <p>Ankieta może się składać z dowolnej liczby pytań trzech rodzajów: wielokrotnego wyboru, jednokrotnego wyboru i otwartych. Ankiety mogą być wypełniane przez wszystkich zalogowanych użytkowników. Po wypełnieniu, dane są zapisywane lokalnie i można je przeglądać w zakładce "Podgląd danych". W tej zakładce można również przesłać dane na serwer.</p>
            <h3>HTML i CSS</h3>
            Większość elementów HTML na stronie jest generowana z użyciem frameworka React. Ankiety są generowane poprzez transformacje XSLT po stronie serwera i przesyłane na żądanie. Arkusze stylów są podzielone na wiele plików. Większość z nich odpowiada pojedynczym komponentom strony. Kolory są zapisane w głównym arkuszu App.css jako zmienne, dzięki czemu w jednym miejscu można zmienić paletę kolorów użytych na stronie.
            <h3>JavaScript</h3>
            <p>Do obsługi aplikacji po stronie klienta został użyty JavaScript z biblioteką JQuery oraz frameworkiem React. Do przechowywania danych po stronie klienta jest używana baza IndexedDB.</p>
            <h3>REST</h3>
            <p>Zapytania do serwera oraz jego odpowiedzi spełniają założenia REST.</p>
            <h3>Serwer</h3>
            <p>Do implementacji części serwerowej został użyty Python. Dane są przechowywane w dwóch bazach SQLite3, jedna przechowuje dane ankietowe, natomiast druga dane użytkowników i sesje. System sesji został zaimplementowany własnoręcznie.</p>
            <h3>XSLT</h3>
            <p>Po stronie serwera są używane szablony XML i transformacja XSLT. Służą one do tworzenia i konwertowania ankiet, które są wysyłane do części klienckiej.</p>
        </div>
    )
}

export default Documentation;
