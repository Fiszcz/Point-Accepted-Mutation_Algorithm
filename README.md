## Commands
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Algorytm

#### 1. Wprowadzenie sekwencji

- Maksymalnie 10 sekwencji
- Maksymalnie 20 znaków alfanumerycznych (uppercase)
- Wymagane żeby wszystkie sekwencje były tej samej długości - jeżeli nie będą dogeneruj znaki na końcu któtszych sekwencji (o znaki już wcześniej wprowadzone w sekwencjach)
[dowiedziec sie czy mozna przeprowadzac ten algorytm z roznymi dlugosciami sekwencji]
- Sekwencje przechowywane po prostu jako ``string``
- Możliwość losowego generowania sekwencji - generować taki zbiór sekwencji w której to tylko niektóre pozycje będą informatywne (max 5)
- Możliwość usuwania wprowadzonych sekwencji
- Możliwość edycji wprowadzonych edycji
- Na wyjściu tego kroku otrzymujemy tablicę sekwencji typu ``string``

#### 2. Generowanie drzewa filogenetycznego

- Na podstawie tablicy sekwencji sprawdzamy ktore pozycje sa informatywne (nieinformatywne wtedy gdy wszyskie znaki na danej pozycji sa takie same lub tylko w jednej sekwencji jest inaczej)
- Tworzona jest lista obiektow typu: ``{sekwencja: string, informatywne: string}``
- Przy badaniu topologii sprawdzamy tylko pozycje informatynwe
- Wyszukiwanie mozliwych topologii za pomoca algorytmu "gałęzi i granic" albo jakiegos wlasnego uproszczonego
- struktura drzewa: ``{sekwencja: string, informatywne: string, parent: object, leftChild: object, rightChild: object}``
- Zliczanie substytucji w zbadanych topologiach drzew (bez pozycji nieinformatywnych) - zeby wyznaczyc najlepsza topologie
- Przy wyswietlaniu drzewa wyswietlac na galeziach wystapione zmiany (razem z nieinformatywnymi)

#### 3. Macierz podstawien

- wyswietlnic symetryczna tablice substytucji
- zliczyc liczbe wystapien dla wszystkich znakow (i wyswietlic)
- zliczyc liczbe wszystkich znakow w sekwencjach (i wyswietlic)
- wyliczyc prawdopodobienstwo wystapienia danego znaku (i wyswietlic)
- struktura macierzy: ``{kolejnoscZnakow: string, wartosci: Array<Array<number>>}``

#### 4. Niesymetryczna Macierz podstawien

- przerobic macierz podstawien z poprzedniego kroku tak zeby uwzglednialo prawdopodbienstwo danego znaku / substytucji

#### 5. Niezlogarytmowana Macierz PAM

- wyliczyc niezlogarytmowana macierz PAM i przerobic macierz z poprzedniego kroku

#### 6. Macierz PAM

- zlogarytmowac niezlogarytmowana macierz PAM => PAM1
- pokolorowac komorki macierzy PAM ze wzgledu na wartosc

#### 7. Ekstrapolacja Macierzy PAM

- wyswietlenie macierzy PAM o wyzszych odleglosciach ewolucyjnych (klikajac strzalke do przodu, lub do tylu zeby powrocic do nizsze odleglosci ewolucyjnej)