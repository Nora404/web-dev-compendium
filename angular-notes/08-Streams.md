## Streams und RxJS ##

Streams sind Datenflüsse, eine Folge von Werten über Zeit.
Es könnte zum Beispiel eine Zahl sein, die jede Sekunde um 1 steigt.
Ein zweites Beispiel währen die Koordinaten eines Maus-Klicks,
oder die Daten welche von einer Websocket-Verbindung zurückgegeben werden.

#### Reaktives Programmieren ####  
Mit RxJS im zusammenhang kommt das Wort "reaktive Programming" vor.
Dieses "Programmierungparadigma" befasst sich mit asynchronen Datenströmen.
Dabei benutzt es einen Stream von Events, die stark an Observer erinnern.

Ein _Subscriber_ abonniert einen Observer, aber normalerweise bekommt er keine
Information darüber, wenn Fehler auftreten oder keine Events kommen.
Mit dem Interface _Observable_ gibt der Subscriber die Kontrolle über den
Datenfluss ab, Events werden von ihm "gepusht".

<img src="./images/blaueLine2.png" alt="Trennlinie">

In der imperativen Programmierung werden Anweisungen, die den Zustand eines Programmes ändern,
mit Variablen und Funktionen verändert. In diesem Beispiel muss `add()` aufgerufen werden um den
Zustand von `num3` zu ändern.

```
add (num1, num2){
  return num1 + num2;
}

num3 = add(1, 2)
```

In der reaktiven Programmierung muss nicht mehr mit Variablen gearbeitet werden.
Es geht nur um Streams und wie diese Verbunden sind. Es werden keine Funktionen
ausgeführt, die Streams haben Operationen welche auf den Streams ausgeführt werden.

In dem Beispiel ist `num1` kein bestimmter Wert zu einem bestimmten Zeitpunkt.
Es ist ein Strom von Werten im Laufe der Zeit. Die `add()` Funktion wird zu einer
Operation. Der input Stream von `num1` und `num2` und zum output Stream von `num3`

```
Input 1 --(num1)--(num1)--(num1)--(num1)-->
Input 2 --(num2)--(num2)--(num2)--(num2)-->

add

Output --(num3)--(num3)--(num3)--(num3)-->
```

```
Input 1 --(1)--(1)--(2)--(2)-->
Input 2 --(1)--(2)--(3)--(2)-->

add

Output --(2)--(3)--(5)--(4)-->
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Was sind Observable ###

Observable sind lazy Push Sammlungen mehrerer Werte. 
Sie sind keine EventEmitter oder sowas wie ein Promise nur mit mehreren Werten.
Sie können sich wie EventEmitter verhalten, wenn sie mit RxJS Subjects multicasted werden.
Hier eine Kleine Übersicht, wo man Observables einordnen könnte.

|          | __Single__ | __Multiple__ |
|----------|------------|--------------|
| __Pull__ | Function   | Iterator     |
| __Push__ | Promise    | Observable   |

Push und Pull sind zwei verschiedene Arten wie Daten-Producer mit dem Daten-Consumer kommunizieren.

__Pull__  
Beim Pull-System bestimmt der Consumer wann er Daten vom Producer erhält. 
Der Producer selbst weiß nicht wann die Daten an den Consumer geliefert werden.
Jede JS Funktion ist ein Pull. Die Funktion selber ist der Producer. Der Code,
welcher die Funktion aufruft, ist der Verbraucher, indem er einen Rückgabewert "herauszieht"

__Push__  
Im Push_System bestimmt der Producer, wann Daten an dem Consumer gesendet werden.
Dem Consumer ist nicht bekannt, wann er diese Daten erhält. In JS ist ein Promise ein Push.
Er als Producer liefert einen Wert an die registrierten Callbacks (die Consumer).
Das Promise ist nun verantwortlich dafür, wann der Wert an die Consumer "übermittelt" wird.

|          | __Producer__                                         | __Consumer__                                        |
|----------|------------------------------------------------------|-----------------------------------------------------|
| __Pull__ | _passiv_: Erzeugt Daten, wenn sie angefordert werden | _aktiv_: Entscheidet, wann Daten angefordert werden |
| __Push__ | _aktiv_: Produziert Daten in seinem eigenen Tempo    | _passiv_: Reagiert auf empfangene Daten             |



<img src="./images/blaueLine.png" alt="Trennlinie">

### Observable erstellen ###

Ein Observable wird mit `new Observable` oder einem Erstellungs-Operator erstellt.
(Ich verstehe nun warum alle Anleitungen englisch sind. Auf Deutsch hört sich vieles falsch an!)
Ein Beispiel für einen solchen Operator wäre `from`, `of` oder `interval`



__Erstellen__  
Observables haben ein Argument, die `subscripe` Funktion. Hier ein einfaches Beispiel, 
welches jede Sekunde den String "hi" ausspuckt

```
const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
});
```
```
observable.subscribe((x) => console.log(x)); 
```

Mit `subscripe` können mehrere Observer (Das sind die mit dem Abo) vom gleichen Observable erstellt werden.
Jeder Aufruf mit `observable.subscribe` führt die Funktion `subscsripe` für den Observer aus.
Sie sind unabhängig voneinander. Im Gegensatz zu `addEventListener` wird der Observer nicht als
Listener registriert, es gibt keine Liste aller Observer.

<img src="./images/blaueLine2.png" alt="Trennlinie">

__Ausführen (Observer)__  
Der Code innerhalb `new Observable(function subscribe(subscriber) {...}` ist das, was für jeden 
Observer ausgeführt wird, der den Observable abonniert hat. Der Abonnent bekommt mehrere Werte
über Zeit, synchron oder asynchron. Dabei gibt es drei Arten von Werten:

- `next` Benachrichtigung: sendet einen Wert wie eine Zahl, eine Zeichenfolge, ein Objekt usw.
- `error` Benachrichtigung: sendet einen JavaScript-Fehler oder eine Exception.
- `complete` Meldung: sendet keine Werte mehr.

Das `next` kann immer wieder aufgerufen werden, während die anderen Beiden, entweder `error`
oder `complete` nur einmal aufgerufen werden und den Stream beenden. Danach kann kein
weiterer Wert geliefert werden.

```
const myObservable = of(1, 2, 3);

const myObserver = {
  next: (x: number) => console.log('value: ' + x),
  error: (err: Error) => console.error('error: ' + err),
  complete: () => console.log('complete'),
};

myObservable.subscribe(myObserver);
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

__Beenden__  
Ein Observable kann theoretisch unendlich streamen. Daher gibt es Methoden um den Stream zu beenden.

```
const observable = from([10, 20, 30]);
const subscription = observable.subscribe((x) => console.log(x));

// Later:
subscription.unsubscribe();
```
Auch Intervalle sollten sauber beendet werden

```
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
 
  return function unsubscribe() {
    clearInterval(intervalId);
  };
}
 
const unsubscribe = subscribe({ next: (x) => console.log(x) });
 
// Later:
unsubscribe(); 
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Operatoren ###

Es gibt viele Operatoren mit denen auf Streams gearbeitet werden kann. Es sind zwei Arten von Funktionen, 
die einen sind Pipeable Operators und die anderen Creation Operators.

__Creation Operators__  
Diese standalone Funktionen erstellen ein neues Observable mit einem vordefiniertem Verhalten. 
Zum Beispiel würde `of(1,2,3)` ein Observable erstellen, welches nacheinander die Zahlen 1,2 und 3 ausspuckt. 

```
of(1,2,3).subscribe((x)=>console.log(x));

// Output: (1) -> (2) -> (3)
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

__Pipeable Operators__  
Bei diesen Operatoren gibt ein Observable ein anderes Observable zurück. 
Das Erste Observable bleibt unverändert. Die Syntax für eine Pipe ist `observableInstance.pipe(operator())`

```
of(1,2,3)
    .pipe(map((v) => v * 2))
    .subscribe((x)=>console.log(x));

// Output: (2) -> (4) -> (6)
```

Pipeable Operators können wie einfache Funktionen verwendet werden `op()(obs)`   
aber wenn viele Pipes hintereinander benutzt werden, 
kann es unübersichtlich werden. `op4()(op3()(op2()(op1()(obs))))`  
Daher haben Observables
die Methode `pipe()` um das Ganze leichter lesbar zu machen

```
obs.pipe(op1(), op2(), op3(), op4());
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

__Observables höherer Ordnung__

Meistens liegen in den Streams einfache Werte wie Zeichnenketten oder Zahlen.
Es kann auch vorkommen, das ein Observable von einem Observable benötigt wird.
Das nennt sich "Observable höherer Ordnung" Zum Beispiel ein Observable der Strings ausgibt
welche die URLs von Daten darstellt. Der Code könnte so aussehen:

```
const fileObservable = urlObservable.pipe(map((url) => http.get(url)));
```

`http.get()` gibt ein Observable für jede URL zurück, damit ist es ein Observable vom Observable.
Um damit arbeiten zu können muss das höhere Observable "abgeflacht" werden,
indem es in ein einfaches umgewandelt wird.

```
const fileObservable = urlObservable.pipe(
  map((url) => http.get(url)),
  concatAll()
);
```

`contactAll()` abonniert jedes innere Observable das aus dem äußeren Observable kommt und kopiert
die ausgegebenen Werte, bis das Observable abgeschlossen ist. Dann geht es zum nächsten über.
So werden alle Werte miteinander verkettet. Solche Operatoren nennen sich "Join-Operator"

<img src="./images/blaueLine.png" alt="Trennlinie">

### Operatoren genauer ###

Man kann sie in verschiedene Kategorien aufteilen:

- Erstellung - (Creation)
- Aggregate - (Mathematical / Aggregate)
- Bedingungen - (Conditional / Boolean)
- Fehlerbehandlung - (Error Handling)
- Multicasting - (Multicasting)
- Filterung - (Filtering)
- Transformation - (Transformation)
- Helfer - (Utility)
- Join - (Jion)

 <a href="https://rxjs.dev/guide/operators#categories-of-operators"> Hier </a> Ein Liste auf der offiziellen Seite.
Dort gibt es richtig tolle Murmelbilder!

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Erstellung ####

__Beispiel: <a href="https://rxjs.dev/api/index/function/interval">interval</a>__

Soll zum Beispiel für einen einzelnen Stream jede Sekunde eine Zahl um 1 erhöht werden,
bietet sich der Operator `interval` an.
Er erstellt ein Observable, welcher Zahlen nacheinander basierend auf dem
angegebenen Zeitintervall ausgibt.

```
let numbers = interval(1000);       // Erstes Parameter gibt die länge des Intervalls an

// Output: (0) 1000ms (1) 1000ms (2) 1000ms (3) ...
```

Dieser Observable ist inaktiv, er gibt keine Zahlen raus, da niemand ihn abonniert hat.
Erst wenn der Observable aktiviert wird fängt er an Zahlen in den Stream zu pushen.
Mit `subscribe` wird der Stream aktiviert und kann mit dem Callback, den letzten
Wert im Stream herausgeben.

```
const numbers = interval(1000);

numbers.subscribe(value => console.log("Subscriber: " + value));

// Output: (Subscriber: 0) -> (Subscriber: 1) -> (Subscriber: 2) -> (Subscriber: 3) ->
```

__Weitere:__

| Operator                                                                            | Kurzbeschreibung                                                                |
|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| <a href="https://rxjs.dev/api/ajax/ajax">ajax</a>                                   | Ajax-Request - Request-Objekt mit URL, oder String mit URL                      |
| <a href="https://rxjs.dev/api/index/function/defer">defer</a>                       | Ein Observable das eine Observable-Fabrik aufruft, für jeden neuen Observer     |
| <a href="https://rxjs.dev/api/index/function/from">from</a>                         | Erzeugt Observable aus einem Iterablen- oder Obervable-ähnlichem Objekt         |
| <a href="https://rxjs.dev/api/index/function/fromEvent">fromEvent</a>               | Observable das Events eines Typs ausgibt das von einem angegebenen Event stammt |
| <a href="https://rxjs.dev/api/index/function/fromEventPattern">fromEventPattern</a> | Observable eines API für die Registrierung von Event-Handler                    |
| <a href="https://rxjs.dev/api/index/function/generate">generate</a>                 | Führt eine Zustandsgesteuerte Schleife aus, die Ergebnisse werden ausgegeben    |
| <a href="https://rxjs.dev/api/index/function/range">range</a>                       | Eine Folge von Zahlen innerhalb eines bestimmten Bereichs werden ausgespuckt    |
| <a href="https://rxjs.dev/api/index/function/throwError">throwError</a>             | Erstellt Error-Instanz und sendet es sofort an den Observer                     |
| <a href="https://rxjs.dev/api/index/function/timer">timer</a>                       | Wartet eine bestimmte Zeit oder Datum und sendet dann 0 aus                     |
| <a href="https://rxjs.dev/api/index/function/iif">iif</a>                           | Checkt ein Boolean und je Ergebnis sendet es den passenden Observable           |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Aggregate ####
__Beispiel: <a href="https://rxjs.dev/api/operators/count">count</a>__

Mit `count` wird ein Observable erstellt, das statt viele Werte nur einen Wert besitzt,
nämlich die Anzahl der Werte seines Quell-Observers. Wenn dieser Quell-Observer einen Fehler
sendet, gibt count diesen weiter, sollte der Quell-Observer unendlich laufen, so gibt count nichts zurück.

```
const numbers = range(1, 7);
const result = numbers.pipe(count(i => i % 2 === 1));
result.subscribe(x => console.log(x));

// Output: 4
```
In diesem Beispiel gibt count die Anzahl der odd Nummern zwischen 1 und 7 zurück 

Weitere:

| Operator                                                   | Kurzbeschreibung                                              |
|------------------------------------------------------------|---------------------------------------------------------------|
| <a href="https://rxjs.dev/api/operators/max">max</a>       | Ist der Observable beendet, gibt es den höchsten Wert zurück  |
| <a href="https://rxjs.dev/api/operators/min">min</a>       | Ist der Observable beendet, gibt es den kleinsten Wert zurück |
| <a href="https://rxjs.dev/api/operators/reduce">reduce</a> | Gibt die Summe aller Werte im Observable zurück               |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Bedingungen ####
__Beispiel: <a href="https://rxjs.dev/api/operators/every">every</a>__

Gibt ein Observable (mit booleschem Wert) zurück, das ausgibt, ob jedes Element der Quelle die angegebene 
Bedingung erfüllt oder nicht. Wenn alle Werte aus dem Quell-Observable die Bedingung erfüllen,
bevor der Observable komplett war, wird dennoch _true_ ausgegeben.
Ansonsten wird _false_ ausgegeben und `every` wird beendet.

```
of(1, 2, 3, 4, 5, 6)
  .pipe(every(x => x < 5))
  .subscribe(x => console.log(x)); 
  
  // Output: false
```
Schaut ob alle Werte kleiner als 5 sind.

Weitere:

| Operator                                                                   | Kurzbeschreibung                                                              |
|----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| <a href="https://rxjs.dev/api/operators/defaultIfEmpty">defaultIfEmpty</a> | Gibt einen Bestimmten Wert zurück, fals der Observable ohne Wert beendet wird |
| <a href="https://rxjs.dev/api/operators/find">find</a>                     | Sendet nur den ersten Wert, welcher eine angegebenen Bedingung erfüllt        |
| <a href="https://rxjs.dev/api/operators/findIndex">findIndex</a>           | Sendet nur den Index vom ersten Wert, welche die Bedingung erfüllt            |
| <a href="https://rxjs.dev/api/operators/isEmpty">isEmpty</a>               | Gibt _true_ aus wenn der Quell-Observer keine Werte sendet, ansonsten _false_ |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Fehlerbehandlung ####
__Beispiel: <a href="https://rxjs.dev/api/operators/catchError">catchError</a>__

Hiermit können Fehler eines Observables abgefangen werden. Es kann danach eine Fehlerbehandlung 
erfolgen oder es übernimmt ein neuer Observable. Alle anderen Ereignisse werden ohne weitere
Bearbeitung weiter geleitet. 

```
of(1, 2, 3, 4, 5)
  .pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError(err => of('I', 'II', 'III'))
  )
  .subscribe(x => console.log(x));
  
  // Output: (1) -> (2) -> (3) -> (I) -> (II) -> (III)
```
In diesem Beispiel wird ein Fehler geworfen, sobald ein Wert gleich 4 ist.
Dann greift `catchError` ein und gibt einen anderen Observable zum weiter machen an.
Es wäre auch möglich den gleichen Observer sich wiederholen zu lassen.
Dafür müssten die Zeilen nur wenig verändert werden:

```
  catchError((err, caught) => caught),
  take(30)
  )
  .subscribe(x => console.log(x));
  
  // Output: (1) -> (2) -> (3) -> (1) -> (2) -> (3) ->
```

Weitere:

| Operator                                                          | Kurzbeschreibung                                                              |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------|
| <a href="https://rxjs.dev/api/operators/retry">retry</a>          | Wiederholt den Quell-Observer, gibt aber zusätzlich eine Fehlermeldung zurück |
| <a href="https://rxjs.dev/api/operators/retryWhen">retryWhen</a>  | Wiederholt den Quell-Observer, aufgrund benutzerdefinierten Kriterien         |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Multicasting ####
__Beispiel: share__  

Gibt einen Observable zurück, welches den Quell-Observable spiegelt und dieses "teilt".
Solange es mindestens einen Abonnenten gibt, wird diese Observable abonniert und sendet Daten. 
Wenn alle Abonnenten sich abgemeldet haben, wird es sich von der Observable-Quelle abmelden. 
Da der Observable Multicasting betreibt, wird der Stream heiß.

In diesem Beispiel wird `tap` benutzt. Es ist sowas wie ein Log und hat außer dem
Schreiben in der Console, keine weiteren Auswirkungen für den Observable.
Er hilft sehr gut zu verstehen was genau `share` macht.

```
const source = interval(1000).pipe(
  tap(x => console.log('Processing: ', x)),
  map(x => x * x),
  take(3),
  share()
);

source.subscribe(x => console.log('subscription 1: ', x));
source.subscribe(x => console.log('subscription 2: ', x));
```

Dieser Observer bekommt jede Sekunde einen aufsteigenden Wert (++1). 
Dieser wird mit sich selbst multipliziert, das ganze drei mal wegen `take(3)`.
Zudem wird bei jeder Runde die Anzahl der Runden mit `tap` angegeben.
Das Ergebnis sieht dann so aus:

```
// Processing: 0
// subscription 1: 0
// subscription 2: 0
// Processing: 1
// subscription 1: 1
// subscription 2: 1
// Processing: 2
// subscription 1: 4
// subscription 2: 4
```

Ohne `share` würde das Ergebnis leicht anders aussehen. Jeder Observer startet seine
eigene Runde, sie werden nicht mehr zusammen in einer Runde ausgegeben:

```
// Processing: 0
// subscription 1: 0
// Processing: 0
// subscription 2: 0
// Processing: 1
// subscription 1: 1
// Processing: 1
// subscription 2: 1
// Processing: 2
// subscription 1: 4
// Processing: 2
// subscription 2: 4
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Filterung ####
__Beispiel: <a href="https://rxjs.dev/api/operators/distinctUntilChanged">distinctUnitChange</a>__   

Mit diesem Filter werden die Elemente eines Quell-Observable nacheinander miteinander verglichen. 
Wird bei dieser Prüfung festgestellt, dass der von der Quelle gesendete Wert ungleich ist, 
wird dieser Wert gesendet und intern zum neuen "zuvor gesendeten Wert".

```
of(1, 1, 1, 2, 2, 2, 1, 1, 3, 3)
  .pipe(distinctUntilChanged())
  .subscribe(console.log);

// Output: 1, 2, 1, 3
```

Es kann auch ein eigener Vergleich erstellt werden, ein Komparator der _true_ oder _false_ ausgeben kann.
In diesem Beispiel werden die Änderungen nur in eine Richtung überprüft, nämlich ob die Werte größer werden.
Sind die Werte kleiner oder gleich, hat sich der Datensatz laut diesem Filter nicht geändert.

```
const temps = of(30, 31, 20, 34, 33, 29, 35, 20);
 
const recordHighs = temps.pipe(
  distinctUntilChanged((prevHigh, temp) => {
    return temp <= prevHigh;
  })
);
 
recordHighs.subscribe(console.log);

// Output: 30, 31, 34, 35
``` 

Der zweite Parameter ist der "keySelector", er wird auf alle Werte, auch dem ersten Wert angewendet.
Da der erste Wert immer der Start zum Vergleichen ist, wird er auch immer gesendet.
Für alle weiteren Werte wird der aktuelle "Schlüssel" mit dem vorherigen "Schlüssel" verglichen.
Sind die Schlüssel ungleich, wird der Wert (nicht die Schlüssel) gesendet und der aktuelle
Schlüssel wird für zukünftige Vergleiche gespeichert.

Eine weitere Variante ist `distinctUntilKeyChanged` mit dem die Werte von Objekteigenschaften 
verglichen werden können. Im Parameter wird der Key der gewünschten Eigenschaft angegeben.
Mit dem zweiten Parameter können wieder genauerer Filterangaben gesetzt werden.

Weitere:

| Operator                                                                   | Kurzbeschreibung                                                                              |
|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| <a href="https://rxjs.dev/api/operators/audit">audit</a>                   | Gibt den letzten gesendeten Wert einer Quelle die von einem anderen Observable pausiert wurde |
| <a href="https://rxjs.dev/api/operators/auditTime">auditTime</a>           | Ignoriert zusätzlich die Werte für die Dauer der angegeben Millisekunden                      |
| <a href="https://rxjs.dev/api/operators/distinct">distinct</a>             | Gibt alle Elemente aus, die sich von den vorherigen Elementen unterscheiden                   |
| <a href="https://rxjs.dev/api/operators/elementAt">elementAt</a>           | Gibt einen Wert, den in elementAt angegebenen Index, zurück                                   |
| <a href="https://rxjs.dev/api/operators/filter">filter</a>                 | Gibt nur die Werte zurück die eine angegebene Bedingung erfüllen                              |
| <a href="https://rxjs.dev/api/operators/first">first</a>                   | Gibt das erste Element zurück, oder das erste nach angegebener Bedingung                      |
| <a href="https://rxjs.dev/api/operators/ignoreElements">ignoreElements</a> | Ignoriert alle Elemente und lässt nur `complete` und `error` zu                               |
| <a href="https://rxjs.dev/api/operators/last">last</a>                     | Gibt das letzte Element zurück, oder das letzte Element nach einer angegebenen Bedingung      |
| <a href="https://rxjs.dev/api/operators/sample">sample</a>                 | Senden vom Quell-Observable, wenn auch ein anderer Observer sendet                            |
| <a href="https://rxjs.dev/api/operators/sampleTime">sampleTime</a>         | Sendet den letzten Wert des Quell-Observers in periodischen Zeitabständen                     |
| <a href="https://rxjs.dev/api/operators/skip">skip</a>                     | Sein Parameter gibt an, wie viele Werte zu beginn übersprungen werden                         |
| <a href="https://rxjs.dev/api/operators/skipLast">skipLast</a>             | Sein Parameter gibt an, wie viele Werte am Ende des Streams weg gelassen werden               |
| <a href="https://rxjs.dev/api/operators/skipUntil">skipUntil</a>           | Die Werte werden solange übersprungen bis ein zweiter Observable sendet                       |
| <a href="https://rxjs.dev/api/operators/skipWhile">skipWhile</a>           | Solange die Bedingung erfüllt ist, werden die Werte übersprungen, danach werden alle gesendet |
| <a href="https://rxjs.dev/api/operators/take">take</a>                     | Der Parameter gibt an, wie viele der von Beginn an gesendeten Elemente, gesendet werden       |
| <a href="https://rxjs.dev/api/operators/takeLast">takeLast</a>             | Wartet bis der Observable komplett ist und sendet die angegebenen letzten Elemente            |
| <a href="https://rxjs.dev/api/operators/takeUntil">takeUntil</a>           | Sendet solange bis der zweite Observable sendet                                               |
| <a href="https://rxjs.dev/api/operators/takeWhile">takeWhile</a>           | Sendet solange die angegebene Bedingung erfüllt ist, danach endet der Stream                  |
| <a href="https://rxjs.dev/api/operators/throttle">throttle</a>             | Gibt den ersten gesendeten Wert einer Quelle die von einem anderen Observable pausiert wurde  |
| <a href="https://rxjs.dev/api/operators/throttleTime">throttleTime</a>     | Gibt Werte aus und ignoriert dann alle Werte nach Millisekunden, wiederholt diesen Vorgang    |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Transformation ####
__Beispiel: <a href="https://rxjs.dev/api/operators/map">map</a>__

Eines der einfachsten Transformationen ist der Operator `map` Er wendet an jedem Wert aus seinem Quell-Observable
eine Funktion an. Die Ergebnisse gibt er als Observable wieder zurück. So würde `map(x => 10 * x)` alle Werte
im Observable mit 10 Multiplizieren. 
In diesem Beispiel werden die Y und X Koordinaten eines Mausklicks in die Console geschrieben.

```
  clicks = fromEvent<PointerEvent>(document, 'click')
          .pipe(map(ev => ev.clientX + " " + ev.clientY));
          
  clicks.subscribe(x => console.log(x));
  
  // Output: 267 425
```

__Beispiel: <a href="https://rxjs.dev/api/operators/mergeMap">mergeMap</a>__

Hier werden die Werte des Quell-Observables in einer Funktion mit einem weiteren Observable transformiert.
`mergeMap` erlaubt, dass mehrere innere Abonnements gleichzeitig aktiv sein können.
Einer der häufigsten Anwendungsfälle für `mergeMap` sind daher Anfragen, die nicht abgebrochen werden sollen, 
z. B. Schreibvorgänge anstelle von Lesevorgängen. Wenn die Reihenfolge beibehalten werden muss, 
ist `concatMap` die bessere Wahl.

```
const letters = of('a', 'b', 'c');
const result = letters.pipe(
  mergeMap(x => interval(1000).pipe(map(i => x + i)))
);
 
result.subscribe(x => console.log(x));

// Output: (a0) -> (b0) -> (c0) -> (a1) -> (b1) -> (c1) ->
```
Im ersten Observable _letters_ stehen die Zeichen a, b, c. Auf diesem Observable wird der `mergeMap` Operator
verwendet, in ihm ist der innere zweite Observable _interval_ der jede Sekunde seinen Wert zusammen mit
dem Wert aus dem ersten _letters_ Observable ausgibt.

Da `mergeMap` mehrere aktive innere Abonnements gleichzeitig verwalten kann, ist es möglich, 
dass durch langlebige innere Abonnements ein Speicherleck entsteht. 
Ein einfaches Beispiel wäre, wenn auf eine Observable mit einem inneren Timer oder ein Stream 
von Dom-Ereignissen gesendet würde. Mit einem Operator wie `take` ließe sich das eingrenzen 

Weitere:

| Operator                                                                | Kurzbeschreibung                                                                                |
|-------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| <a href="https://rxjs.dev/api/operators/buffer">buffer</a>              | Sammelt die Werte des Quell-Observers, gibt alle Werte aus sobald ein zweiter Observable sendet |
| <a href="https://rxjs.dev/api/operators/bufferCount">bufferCount</a>    | Sammelt die Werte bis zu angegebenen Maximalmenge und spuckt diese dann aus                     |
| <a href="https://rxjs.dev/api/operators/bufferTime">bufferTime</a>      | Sammelt die Werte über eine angegebene Zeitperiode und spuckt diese dann aus                    |
| <a href="https://rxjs.dev/api/operators/bufferToggle">bufferToggle</a>  | Ein Observable startet das Sammeln, während ein anderer Observable den Buffer wieder schließt   |
| <a href="https://rxjs.dev/api/operators/bufferWhen">bufferWhen</a>      | Eine angegebene Funktion startet und schließt den Buffer oder setzt ihn wieder zurück           |
| <a href="https://rxjs.dev/api/operators/concatMap">concatMap</a>        | Inneres und äußeres Observable werden der Reihe nach zusammengefügt                             |
| <a href="https://rxjs.dev/api/operators/exhaustMap">exhaustMap</a>      | Inneres und äußeres werden nur zusammengefügt wenn das vorherige Observable abgeschlossen ist   |
| <a href="https://rxjs.dev/api/operators/expand">expand</a>              | Inneres und äußeres werden rekursiv (wiederholend) zusammengefügt                               |
| <a href="https://rxjs.dev/api/operators/groupBy">groupBy</a>            | Werte eines Observables werden nach einem Schlüssel in mehrere Observables aufgeteilt           |
| <a href="https://rxjs.dev/api/operators/mergeScan">mergeScan</a>        | Akkumulieren von Werten über die Zeit durch zusammengefügte Observables                         |
| <a href="https://rxjs.dev/api/operators/pairwise">pairwise</a>          | Aktuelle und Vorheriger Werte werden als Paar in einem Array zusammengefügt und gesendet        |
| <a href="https://rxjs.dev/api/operators/scan">scan</a>                  | Wendet einen Akkumulator oder Reduction auf jeden Wert an                                       |
| <a href="https://rxjs.dev/api/operators/switchScan">switchScan</a>      | Wie der scan, gibt aber nur den letzten Wert als Observable zurück                              |
| <a href="https://rxjs.dev/api/operators/switchMap">switchMap</a>        | Inneres und äußeres werden zusammengefügt, nur ein innerer, sonst wie mergeMap                  |
| <a href="https://rxjs.dev/api/operators/window">window</a>              | Verzweigt/Verschachtelt Quell-Observable wenn ein zweites Observable sendet                     |
| <a href="https://rxjs.dev/api/operators/windowCount">windowCount</a>    | Verzweigt/Verschachtelt Quell-Observable mit angegebener Menge an Werten                        |
| <a href="https://rxjs.dev/api/operators/windowTime">windowTime</a>      | Verzweigt/Verschachtelt Quell-Observable nach angegebener Zeit                                  |
| <a href="https://rxjs.dev/api/operators/windowToggle">windoofToggle</a> | Verzweigt/Verschachtelt Quell-Observable nach weiteren Start/End Observables                    |
| <a href="https://rxjs.dev/api/operators/windowWhen">windowWhen</a>      | Verzweigt/Verschachtelt Quell-Observable nach einer Fabrikfunktion                              |


<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Helfer ####
__Beispiel: <a href="https://rxjs.dev/api/operators/tap">tap</a>__

Dieser Operator kann Aktionen oder Nebeneffekte ausführen, während der Quell-Observable 
nicht beeinflusst wird. Die häufigste Verwendung von `tap` ist für das Debugging.
In der `pipe()` kann an beliebiger Stelle ein `tap(console.log)` platziert werden,
und die Benachrichtigung des vorherigen Operators ausgeben, sowas wie ein Log.

```
const source = of(1, 2, 3, 4, 5);

const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
  );

const subscribe = example.subscribe(val => console.log(val));

// Output: (BEFORE MAP: 1) -> (AFTER MAP: 10) -> (BEFORE MAP: 2) -> (AFTER MAP: 20) -> (BEFORE MAP: 3) ->
```

Weitere:

| Operator                                                                 | Kurzbeschreibung                                                              |
|--------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| <a href="https://rxjs.dev/api/operators/delay">delay</a>                 | Verzögert das Senden der Werte um eine bestimmte Zeit oder ein Datum          |
| <a href="https://rxjs.dev/api/operators/delayWhen">delayWhen</a>         | Verzögert das Senden der Werte abhängig vom Senden anderer Observables        |
| <a href="https://rxjs.dev/api/operators/dematerialize">dematerialize</a> | Konvertiert Objekte des Quell-Observers indem sie entpackt werden             |
| <a href="https://rxjs.dev/api/operators/materialize">materialize</a>     | Von `dematerialize` entpackte Werte werden wieder in Objekte zurück gepackt   |
| <a href="https://rxjs.dev/api/operators/observeOn">observeOn</a>         | Sendet die gleichen Werte, aber mit einem angegebenen Scheduler               |
| <a href="https://rxjs.dev/api/operators/subscribeOn">subscribeOn</a>     | Asynchrone Abonnenten des Quell-Observers mit angegebenen Scheduler           |
| <a href="https://rxjs.dev/api/operators/timeInterval">timeInterval</a>   | Sendet den Zeitunterschied zwischen vorherigem und Aktuellem Element          |
| <a href="https://rxjs.dev/api/operators/timestamp">timestamp</a>         | Hängt an jedem Element ein Zeitstempel, wann es gesendet wurde                |
| <a href="https://rxjs.dev/api/operators/timeout">timeout</a>             | Fehler wenn das Quell-Observable in einer angegebenen Zeitspanne nicht sendet |
| <a href="https://rxjs.dev/api/operators/timeoutWith">timeoutWith</a>     | Abo wird beendet wenn ein bestimmter Wert nicht zur angegebenen Zeitspanne    |
| <a href="https://rxjs.dev/api/operators/toArray">toArray</a>             | Sammelt alle Werte und gibt diese nach complete in einem Array aus            |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Join ####
__Beispiel: <a href="https://rxjs.dev/api/operators/withLastestForm">withLastestFrom</a>__

withLatestFrom kombiniert jeden Wert aus dem Quell-Observable (der Instanz) mit den neuesten Werten aus 
einem anderen Observables nur dann, wenn die Quelle einen Wert sendet. 
Optional kann eine Funktion in `withLastestFrom()` verwendet werden, um den Wert zu bestimmen, 
der an das Output-Observable gesendet werden soll. 
Alle Input-Observablen müssen mindestens einen Wert ausgeben, bevor die Output-Observable einen Wert ausgeben kann.

```
const clicks = fromEvent(document, 'click');
const timer = interval(1000);

const result = clicks.pipe(withLatestFrom(timer));
result.subscribe(x => console.log(x));

// Output: Array [ click, 11 ]
```

In diesem Beispiel ist der Auslöser ein Klick-Event vom ersten Observable _clicks_.
Dieser Klick wird mit dem zweiten Observable _timer_ kombiniert.
Das Ergebnis ist ein Array:
- 0: click { target: html, clientX: 655, clientY: 616, … }
- 1: 11

Hier noch ein Beispiel bei dem eine Funktion die Werte überarbeitet. Das Quell-Observable sendet alle 5 Sekunden
einen Wert, während das zweite Observable jede Sekunde sendet. Erst nach 5 Sekunden werden die neusten Werte
beider Observables genommen und per Funktion in einen String gesteckt. 

```
const source = interval(5000);
const secondSource = interval(1000);

const example = source.pipe(
  withLatestFrom(secondSource),
  map(([first, second]) => {
    return `First Source (5s): ${first} Second Source (1s): ${second}`;
  })
 );
example.subscribe(val => console.log(val));

// First Source (5s): 0 Second Source (1s): 3 
// First Source (5s): 1 Second Source (1s): 8 
// First Source (5s): 2 Second Source (1s): 13 
// First Source (5s): 3 Second Source (1s): 18 
```

Weitere:

| Operator                                                                        | Kurzbeschreibung                                                                                        |
|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| <a href="https://rxjs.dev/api/index/function/combineLatest">combineLastest</a>  | Wenn ein Observable sendet werden die letzten Werte aller Observables gesendet                          |
| <a href="https://rxjs.dev/api/index/function/concat">concat</a>                 | Sendet nacheinander die Werte des ersten, zweiten ... Observables                                       |
| <a href="https://rxjs.dev/api/index/function/forkJoin">forkJoin</a>             | Wenn alle Observables complete sind, werden die letzten Werte gesendet                                  |
| <a href="https://rxjs.dev/api/index/function/merge">merge</a>                   | Mehrere Observables werden zu einem Observable                                                          |
| <a href="https://rxjs.dev/api/index/function/partition">partition</a>           | Macht aus einem Observable mehrere Observables nach einer bestimmten Angabe                             |
| <a href="https://rxjs.dev/api/index/function/race">race</a>                     | Wer zu erst kommt, malt zu erst!                                                                        |
| <a href="https://rxjs.dev/api/index/function/zip">zip</a>                       | Nachdem alle Observables gesendet haben, werden ihre Werte als Array gesendet                           |
|                                                                                 |                                                                                                         |
| <a href="https://rxjs.dev/api/operators/combineLatestAll">combineLastestAll</a> | Wenn ein äußeres Observable compete ist, werden alle letzten Werte, auch innere gesendet                |
| <a href="https://rxjs.dev/api/operators/concatAll">concatAll</a>                | Alle inneren Observable werden in einem "normalen" Observable gesendet                                  |
| <a href="https://rxjs.dev/api/operators/exhaustAll">exhaustAll</a>              | Innere Observable werden als normales gesendet, erst wenn eines complete ist, wird das nächste gesendet |
| <a href="https://rxjs.dev/api/operators/mergeAll">mergeAll</a>                  | Alle Werte von inneren Observables werden als normales Observable gesendet                              |
| <a href="https://rxjs.dev/api/operators/switchAll">switchAll</a>                | Innere Observables werden als normales gesendet, wobei immer der neuste Wert gesendet wird              |
| <a href="https://rxjs.dev/api/operators/startWith">startWith</a>                | Gibt dem Stream einen Startwert (veraltet)                                                              |