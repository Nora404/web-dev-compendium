
## Templates ##
In Angular ist ein Template eine Blaupause für ein Fragment einer Benutzeroberfläche (UI).
Vorlagen werden in HTML geschrieben, und innerhalb einer Vorlage kann eine spezielle Syntax verwendet werden,
um auf vielen Funktionen von Angular zugreifen zu können. Da jedes Template nur ein Fragment des UI ist
gibt es kein `<html>`, `<body>` oder `<base>`  

Um das Risiko eines Script-Injection-Angriff zu vermeiden, unterstützt Angular `<script>` nicht, 
es wird ignoriert und gibt eine Warnung aus.

<img src="./images/blaueLine.png" alt="Trennlinie">

### HTML und Angular ###
In Template werden fast alle HTML Tags verwendet, zusätzlich mit Angular Syntax, die eine dynamische Darstellung erlaubt.
Ausdrücke werden mit doppelten {{ geschweiften }} Klammern gekennzeichnet.

```
currentCustomer = 'Maria';
```
```
<h3>Current customer: {{currentCustomer}}</h3>
```
In diesem Beispiel ist {{currentCustomer}} ein Platzhalter und wird beim Rendern mit "Maria" ausgetauscht.
Auch in der HTML Syntax kann so ein Wert dynamisch eingesetzt werden.
``` 
<div><img alt="item" src="{{itemImageUrl}}"></div>
```
<img src="./images/blaueLine.png" alt="Trennlinie">

### Statements ###
Statements sind Methoden oder Eigenschaften die im HTML benutzt werden können, zum Beispiel bei Events.
`(event)="statement"`  Die Sprache der Statements erinnert an JavaScript. Zum Beispiel sind diese Ausdrücke erlaubt.
`new` `++` `--` `+=` `-=` `|` `&` ...  

Die Statements sind Kontextbezogen, heißt sie haben nur in ihrem Kontextbereich Wirkung.
Das wäre die Komponente des Templates oder das Template selber, z.B bei Eingaben vom Benutzer.
Sie können sich nicht auf Globale Namespaces beziehen wie `window` oder `document`.
Auch solche Methoden wie `console.log()` oder `Math.max()` werden nicht funktionieren.

```angular
<button type="button" (click)="onSave($event)">Save</button>

<button type="button" *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>

<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
```
Der erste Button/Zeile hat ein click-event, dass eine Funktion auslöst und ein Event-Objekt übergibt `$event`.
In diesem Objekt sind alle Informationen des Events, zum Beispiel woher es kommt und was der value 
des herkunfts Elementes ist.  

Der zweite Button/Zeile benutzt die Direktive ngFor, welche über ein Array iteriert und für jeden Eintrag
ein Element erstellt. Hier kommt {{hero}} von `let hero of heros` selbst dann, wenn die Komponente eine
Eigenschaft hätte die auch hero lauten würde. 
- Als Erstes werden die Template-Variablen Namen ausgewertet
- Als Zweites werden Namen im zusammenhang mit Direktiven ausgewertet
- Zuletzt werden die Membervariablen der Komponente ausgewertet.

Im dritten Element/Zeile wird eine lokale Variable erstellt `#heroForm` und diese der Methode onSubmit() 
übergeben. Diese Variable hält den Inhalt des Elements und hat auch nur in diesem Element seine Gültigkeit.

<img src="./images/blaueLine.png" alt="Trennlinie">

### Data-Binding ###
Data-Binding ist eine Verbindung der Benutzeroberfläche und einem Model. Mit dieser Verbindung
kann die Ansicht(View) synchronisiert werden oder das Model benachrichtigen, wenn ein Ereignis oder Aktion
stattgefunden hat. Oder beides.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Interpolation binding ####    
``{{value}}``  

Hierbei kann eine String-Eigenschaft aus der Komponente an das Template gebunden werden.  
<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Property binding ####  
``[property] ="value"``  

Von der Komponente aus wird eine Eigenschaft, im Template verändert. 
Angular erkennt das nach den [ ] ein dynamischer Ausdruck kommt.
Dieser Ausdruck sollte nur eine Eigenschaft der Komponente oder eine Methode sein.
Um Fehler zu vermeiden, sollte immer der Variablentyp zurückgegeben werden, den das Template erwartet.

```
<img alt="item" [src]="itemImageUrl">

<button type="button" [disabled]="isUnchanged">
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Event binding ####  
``(click)="method($event)"``  

Event Binding hört auf Benutzeraktionen, sowas wie Tastendrücke, Mausbewegungen oder Touches.
Der Name des Events wird in runden Klammern geschrieben, nach dem Gleichheitszeichen kommt ein
Template Statement, zum Beispiel eine Funktion.

Mit eigenen Direktiven ist es auch möglich eigene Events zu schreiben. 
Eine weitere Möglichkeit ist das Binding mit Tastaturevents.
Dabei kann der `key` oder `code` verwendet werden, default wird der key erwartet.
Es können auch nach Tastenkombinationen beobachtet werden.

```
<input (keydown.enter)="onKeydown($event)" /> 

<input (keydown.shift.t)="onKeydown($event)" />
```

`key` macht keinen Unterschied, ob die linke oder rechte Shift-Taste gedrückt wurde.
`code` hingegen ist da genauer.

```
<input (keydown.code.shiftleft.altleft.keyt)="onKeydown($event)" />
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Two-way binding ####  
``[(value)]``  

Mit diesem Binding können Eltern- und Kind-Komponente miteinander Kommunizieren.
Es ist so möglich auf Events zu hören oder Werte simultan auszutauschen,
dazu benutzt es das Property und Event Binding.

```
<app-sizer [(size)]="fontSizePx"></app-sizer>
```
Eine weitere Zutat sind `@Output()` und `@Input()` Die Vergabe der Namen ist besonders wichtig.
Input hält den Wert der Eigenschaft, und Output ist das Event, welches den Wert ändert.
- __@Input()__:  Benenne nach Name der Eigenschaft
- __@Output()__: Benenne nach Name der Eigenschaft plus dem Wort "Change"

```
  @Input()  size!: number | string;
  @Output() sizeChange = new EventEmitter<number>();
```
Eine Funktion welche _size_ ändert, wird durch ein Event im Template ausgelöst.
Der neue Wert wird mit _.emit_ übergeben.

```
this.sizeChange.emit(this.size);
```

<img src="./images/blaueLine2.png" alt="Trennlinie">


#### Attribut binding ####  
``<td [attr.rowspan]={{value}}>`` 

Werte von Attributen können dynamisch gestaltet werden. In den eckigen Klammern steht der
erst das Präfix _attr_, ein Punkt und danach der Name des Attributs. der Attributwert
wird mit den {{Klammern}} zugewiesen. 
Sollte der Wert `null` oder `undefined` sein, wird das Attribut komplett entfernt.
<img src="./images/blaueLine2.png" alt="Trennlinie">


#### Class binding ####  
Singelclass ``[class.sale]="expression"``     
Multiclass ``[class]="classExpression"``  

Mit diesem Binding können dynamisch CSS Klassenattribute entfernt oder hinzugefügt werden. 
Die Singelclass wird dann hinzugefügt. wenn der Ausdruck true ergibt. Ist der Ausdruck ein
falsy Wert, so wird die Klasse entfernt.
Bei Multiclass ist der Ausdruck eine der folgenden Listen:
- Ein String dessen Klassennamen mit einem Leerzeichen getrennt sind
- Ein Objekt dessen Klassennamen die Keys sind und deren Werte true oder falsy Ausdrücke sind
- Ein Array mit Klassennamen

Wir eine Objektähnliche Liste verwendet (Array, Map, Set) muss die Objektidentität geändert werden,
ansonsten haben Änderungen in der Liste keinen Effekt. Das heißt, es muss ein neues Objekt erstellt werden.

<img src="./images/blaueLine2.png" alt="Trennlinie">


#### Style binding ####    
Singelstyle ``[style.width]="expression"``  
mit Einheiten ``[style.width.px]="expression"``    
Multistyle ``[style]="styleExpression"``  

Dieses Binding erlaubt das dynamische Aktivieren von CSS Styles. Es hat immer den Präfix `style` 
nachfolgend den Namen des Styles. Optional kann eine Einheit, wie `px` oder `%` angehangen werden.
- __dash-case__ <nav [style.background-color]="expression"></nav>
- __camelCase__ <nav [style.backgroundColor]="expression"></nav>

Für mehrere Styles wird eine Liste verwendet, entweder ein String oder ein Objekt.
Auch hier muss bei einer Änderung der Listeneinträge ein neues Objekt erstellt werden,
da sonst die Änderungen nicht übernommen werden.
- `"width: 100px; height: 100px; background-color: cornflowerblue;"`
- `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`

<img src="./images/blaueLine.png" alt="Trennlinie">

### Pipes ###

Mit Pipes kann ein String, ein Datum oder andere Daten in der Anzeige transformiert werden.
Es sind einfache Funktionen in einem Template Ausdruck.
Die Pipe bekommt einen Wert und gibt den überarbeiten Wert zurück. 
Sie können in der gesamten Anwendung benutzt werden.

Schon existierende Pipes können Datums formatieren, Buchstaben können groß oder kleingeschrieben werden.
Nummern werden in Strings verwandelt oder Objekte in ein lesbares JSON-Format.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Date Pipe ####  
`{{ value_expression | date [ :format [ :timezone [ :locale ] ] ] }}`  

Es formatiert ein Datum nach den locale Regeln. Angular kennt default nur die en-US.
Um andere Sprachen zu nutzen, müssen sie erst importiert werden.
Des Weiteren wird die DatePipe nur bei Änderungen ausgeführt. 
Um es neu zu rendern braucht es ein neues Date-Objekt.

`{{timeObj | date}}`  // Ausgabe: Oct 10, 2022  
`{{timeObj | date: 'd/M/yy'}}`  // Ausgabe: 10/10/22  
`{{timeObj | date: 'mm:ss'}}`  // Ausgabe: 17:39  
`{{timeObj | date: 'short'}}`  // Ausgabe: 10/10/22, 2:17 PM  
`{{timeObj | date: 'longDate'}}`  // Ausgabe: October 10, 2022  

Es gibt vordefinierte formate, short, medium, long und full. Diese können mit Date und Time kombiniert werden.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Pipes für Strings ####  
Mit UpperCase und LowerCase wird der String komplett in Großbuchstaben oder in Kleinbuchstaben 
transformiert. Es gibt auch eine Pipe die den ersten Buchstaben großschreibt und alle 
anderen klein.

`{{ value_expression | uppercase }}` // HALLO  
`{{ value_expression | lowercase }}` // hallo  
`{{ value_expression | titlecase }}` // Hallo

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Pipes für Numbers ####

Die Decimal Pipe formatiert Zahlen, nach bestimmten Regeln um.  
`{{ value_expression | number [ :digitsInfo [ :locale ] ] }}`

__digitsInfo__: `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`
- _minIntegerDigits:_ Minimale anzahl an Integer vor dem Komma. Default = 1
- _minFractionDigits_ Minimale anzahl an Zahlen nach dem Komma. Default = 0
- _maxFractionDigits_ Maximale anzahl an Zahlen nach dem Komma. Default = 0

Die Locale Regeln (z.B. en-US) bestimmen das Trennzeichen oder Gruppengröße.
Wenn der formatierte Wert abgeschnitten wird, wird er mit der "to-nearest"-Methode gerundet:


`{{3.6 | number: '1.0-0'}}`   // Ergebnis: 4  
`{{-3.6 | number: '1.0-0'}}`  // Ergebnis: -4  

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Pipes für Objekte ####

Würde man versuchen ein Objekt ins Template einzubinden käme nur "[object Object]" heraus.
Mit der JSON Pipe wird das Objekt lesbar:  
`{{ value_expression | json }}`  // { "foo": "bar", "baz": "qux" }

Ein Objekt oder eine Map kann in ein Array mit key/value Paaren umgewandelt werden. 
Der Parameter compareFn ist optional und für komplexe Typen gedacht.  
`{{ input_expression | keyvalue [ : compareFn ] }}`
```
    <div *ngFor="let item of object | keyvalue">
      {{item.key}}:{{item.value}}
    </div>
```

Pipes können auch verkettet werden.  
`{{time | date | uppercase}}` // OCT 10, 2022

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Pipes erstellen ####

Es ist auch möglich seine eigenen Pipes zu erstellen. 
Werden sie von Angular erstellt sieht die neue Pipe so aus:

```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demo'
})
export class DemoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
```

Jetzt kann die Methode _transform()_ nach Belieben angepasst werden. 

```
  transform(n: number): string {
    return (n *1000).toFixed(2) + 'Kg';
  }
```

number = 12.6535 -> `{{number | demo}}` -> "12653.50Kg"

<img src="./images/blaueLine.png" alt="Trennlinie">

### Template Variablen ###

Mit Template Variablen (auch locale Variablen) können Teile des Templates, Daten eines
anderen Teil-Template nutzen. Sie werden erstellt mit dem # symbol vor ihrem Namen.
`#phone` deklariert die Variable `phone` mit dem Wert, dessen wo es sich befindet.

```
<input #phone placeholder="phone number" />

<button type="button" (click)="callPhone(phone.value)">Call</button>
```

- Deklariert in einer Komponente verweist es auf die Komponenten-Instanz
- Deklariert in einem HTML-Tag verweist es auf dieses Element (als HTML-Objekt)
- Deklariert in einem `<ng-template` verweist es auf TemplateRef, die Instanz des Templates

__Gültigkeitsbereich__  
Die Template Variable ist nur innerhalb ihres Templates gültig.
Wenn eine strukturelle Direktive benutzt wird, `<ng-template>` oder `<ng-container>` 
ist die Template Variable nur in diesem untergeordneten Bereich gültig.
Ein inneres Template kann auf Template Variablen des übergeordneten Templates zugreifen.

In diesem Beispiel erstellt `ngIf` im `<span>` Element einen neuen Scope.
Er enthält die Variable ref1. Wird etwas im `<input>` verändert, ändert sich auch
der Inhalt von `<span>`, weil Angular sofort ref1 aktualisiert.

```
<!-- will work -->

<input #ref1 type="text" [(ngModel)]="firstExample" />
    
<span *ngIf="true">Value: {{ ref1.value }}</span>
```

Im nächsten Beispiel wird es nicht funktionieren. Die Variable ref2 wurde im 
untergeordneten Scope, des `ngIf` erstellt und ist daher nicht für sein übergeordnetes
Template erreichbar.

```
<!-- doesn't work -->

<input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />

<span>Value: {{ ref2?.value }}</span> 
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### ViewEncapsulation ###

View-Encapsulation sind Strategien zur Kapselung von Styles.
Css.Regeln sollen dur für eine Komponente wirksam sein, nicht für die gesamte Anwendung.
Es gibt drei Strategien die im @Component-Decorator festgelegt werden:
- `View-Encapsulation.Emulated` Defaulteinstellung, Style-Kapselung wird emuliert
- `View-Encapsulation.None` Keine Kapselung des Styles
- `View-Encapsulation.ShadowDom` Kapselung über den nativen Shadow-DOM-Mechanismus

```
@Component({
...
encapsulation: ViewEncapsulation.ShadowDom
})
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### View-Encapsulation.Emulated ####

Wird nichts im Decorator der Komponente angegeben ist das der Standardfall.
Angular fügt den HTML-Tags den CSS-Style der Komponente hinzu:

```
div[_ngcontent-lou-14] {
...
}
```

Das Styling der Komponente kann nicht von außen verändert werden.
Wenn dies aber doch gewünscht ist, gibt es den Pseudo-Selektor `ng-deep`
Damit lässt sich der Style überschreiben

```
::ng-deep div {
background-color: forestgreen !important;
}
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### View-Encapsulation.None ####

Diese Einstellung ist sinnvoll, wenn der Benutzer zum Beispiel selber den Style einrichten können soll.
Diese Strategie hat auch Auswirkungen auf andere Elemente der Anwendung. Sollte ein `div` einen grünen
Hintergrund bekommen, werden nun alle Div-Container grün eingefärbt.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### View-Encapsulation.ShadowDom ####

Die _Shadow-DOM-Technik_ will bestimmte Teile des DOM-Baumes vor der restlichen Anwendung verstecken.
Das bedeutet auch, das diese Elemente nicht mit einem `querySelector` erreichbar sind.
Zudem haben CSS-Regeln, die außerhalb definiert wurden, hier keine Wirkung mehr.
Das betrifft auch ein globales CSS.