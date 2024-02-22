
<img src="./images/blaueHeaderDire.png" alt="Trennlinie">

Direktiven sind Klassen, die den Elementen in der Vorlage neues Verhalten hinzufügen 
oder das vorhandene Verhalten ändern. Grundsätzlich werden Direktiven verwendet, 
um das DOM zu manipulieren, zum Beispiel das Element aus dem DOM hinzuzufügen, zu entfernen 
oder das Erscheinungsbild der DOM-Elemente zu ändern.

- __Attributs Direktiven__ Verändert das Verhalten eines Elements, Komponente oder anderer Direktive
- __Struktur Direktiven__ Verändert das DOM Layout, indem es Elemente hinzufügt oder entfernt

<img src="./images/blaueLine.png" alt="Trennlinie">

### Attributs Direktiven ###

Die meist verwendeten Attributs Direktiven sind `ngClass` für CSS Klassen, 
`ngStyle` für HTML Styles und `ngModel` für two-way Binding.
Sind diese Texte hier nicht irgendwie schwer zu lesen? Sehr lange Zeilen, 
keine farbliche Formatierung, einfach nur Text ... Vielleicht wäre Asciidoc doch besser?

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### ngClass - Verhalten von Klassen ####
Um eine einzelne CSS Klasse hinzuzufügen oder zu entfernen ist ngClass nicht gedacht,
dafür gibt es class binding. Mit ngClass können Klassen nach einem Ausdruck oder einer
Methode gesetzt werden.

In diesem Beispiel bekommt das div-Element die Klasse _special_ wenn der Wert _isSpecial_ true ist.
```angular
<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>

<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special.</div>
```
Um eine Methode zu verwenden, muss sich diese in der Komponenten-Klasse befinden.
In diesem Beispiel wren die Objekt-Keys die namen der Klassen.
Die Werte der Keys sind boolean Eigenschaften der Komponente. Dann wäre es sinnvoll
auch eine Methode _setCurrentClasses()_ zu haben die mit ngOnInit() aufgerufen wird.
```angular
currentClasses: Record<string, boolean> = {};

setCurrentClasses() {
  this.currentClasses =  {
    saveable: this.canSave,
    modified: !this.isUnchanged,
    special:  this.isSpecial
  };
}
```
<img src="./images/blaueLine2.png" alt="Trennlinie">

#### ngStyle - Verhalten von Styles ####
Mit ngStyle können mehrere inline styles basierend auf den Zustand der Komponente gesetzt werden.
Auch hier ist es sinnvoll die Werte mit einem Setter in ngOnInit zu setzten.
Eine mögliche passende Methode für ngStyle wäre:
```angular
currentStyles: Record<string, string> = {};

setCurrentStyles() {
  this.currentStyles = {
    'font-style':  this.canSave      ? 'italic' : 'normal',
    'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
    'font-size':   this.isSpecial    ? '24px'   : '12px'
  };
}
```
<img src="./images/blaueLine2.png" alt="Trennlinie">

#### ngModel - Two-way Binding ####
NgModel kann Eigenschaften der Komponente im View darstellen und aktualisieren, 
wenn der Benutzer etwas ändert. Das nennt sich Two-way Binging, 
leicht an seinen Klammern [(ngModel)] zu erkennen.

```angular 
<label for="example-ngModel">[(ngModel)]:</label>
<input [(ngModel)]="currentItem.name" id="example-ngModel">
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Attribut Direktive erstellen ###
Diese Direktive soll einen Text mit gelbem Hintergrund hervorheben.
Sie sollte automatisch im app.module eingebunden worden sein.  
Die Directive will auf ein Element zugreifen, daher muss ``ElementRef`` dem Constructor übergeben werden.

```typescript jsx
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {
  constructor(private el: ElementRef) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

Im Template wird es dann so eingebunden wie ein Attribut

````typescript jsx
<div>
    <label appHighlight>This is label element</label>
</div>
````
<img src="./images/blaueLine.png" alt="Trennlinie">

### Attribut Direktive mit User-Events ###
Nun ein Beispiel wie die Hintergrundfarbe mit einem Mausevent verändert werden kann.
Dafür muss der _HostListener_ importiert werden. Dann braucht es zwei Event Handler
beide mit dem Decorator @HostListener.

```typescript jsx
@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

}
```
<img src="./images/blaueLine.png" alt="Trennlinie">

### Attribut Direktive mit Values ###
Bei einem Mausevent soll es möglich sein vorher die Farbe einzustellen.
Die Direktive muss also einen Wert übergeben bekommen. Dafür wird in der Direktive ein @Input verwendet
und es braucht in der Komponente eine Eigenschaft, welche die zu übergebene Farbe speichert.

``` angular
@Input() appHighlight = '';
```
``` angular
export class AppComponent {
  color = 'yellow';
  / ... /
}
```
Nun wird diese Eigenschaft mithilfe von Data Binding an die Direktive übergeben.
Um die _color_ Eigenschaft zu setzten werden in diesem Beispiel Radiobuttons eingesetzt.
Ein Klick weist die gewünschte Farbe der Eigenschaft zu.
Das wäre dann der Code im Template:
``` angular
<h2>Pick a highlight color</h2>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
<p [appHighlight]="color">Highlight me!</p>
```
Die passende Methode in der Direktive bekommt noch einen Default-Wert, da zu Beginn _color_ undefined ist.
Die Anzahl der Values ist beliebig, so könnte der Default-Wert auch eine Variable sein.
``` angular
@HostListener('mouseenter') onMouseEnter() {
  this.highlight(this.appHighlight || 'red');
}
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Struktur Direktiven ###
Diese Direktiven fügen dem Template Elemente hinzu oder entfernen sie,
auf einem Element darf jedoch immer nur eine Struktur Direktive verwendet werden.
Wenn zwei Direktiven auf dasselbe Element zugreifen, weiß der Compiler nicht welche
Direktive er ausführen soll und schmeißt einen Fehler.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### ngIf - Bedingte Subviews ####
Wenn NgIf false (oder einen flasy Wert hat), entfernt Angular ein Element und seine Nachfahren aus dem DOM. 
Angular entsorgt dann deren Komponenten, was Speicher und Ressourcen freisetzt.

``` angular
<app-item-detail *ngIf="isActive" [item]="item"></app-item-detail>
```

``` angular
false (Boolean) // false
0 (Number)      // false
"" (String)     // false
undefined       // false
null            // false 
```

Es gibt auch eine _else_ Abfrage `*ngIf="condition; else templateA"`

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### ngFor - Elemente per Liste ####
Mit ngFor lassen sich Listen erstellen. Es funktioniert wie die For-Schleife.
Diese Listen können Einträge von Arrays auslesen oder ganze Komponenten sein.

``` angular
<div *ngFor="let item of items">{{item.name}}</div>
```
``` angular
<app-item-detail *ngFor="let item of items" [item]="item"></app-item-detail>
```

ngFor hat einen Index, der mit null beginnt. Um auf ihn zugreifen zu können wird im *ngFor
getrennt von einem Semikolon eine Variable erstellt, die den Index aufnehmen kann.
``` angular
<div *ngFor="let item of items; let i=index">{{i + 1}} - {{item.name}}</div>
```

Immer die ganze Liste neu zu rendern ist meist nicht sinnvoll.
Um das zu verhindern, kann der Komponente eine Methode hinzugefügt werden, 
die einen Wert zurückgibt, welcher verfolgt werden soll. Zum Beispiel eine ID.
Wenn der Browser die ID bereits gerendert hat, verfolgt Angular diese und fragt den
Server nicht erneut nach dieser ID ab.

Methode in der Komponente:
```angular
trackByItems(index: number, item: Item): number { return item.id; }
```
Aufruf im Template:
```angular
<div *ngFor="let item of items; trackBy: trackByItems">
  ({{item.id}}) {{item.name}}
</div>}
```
<img src="./images/blaueLine2.png" alt="Trennlinie">

#### ngSwitch - Alternative Views ####
Wie bei JavaScript zeigt ngSwitch ein Element aus mehreren Möglichkeiten. 
Wird die Bedingung erfüllt, so fügt Angular nur das ausgewählte Element ein.
* __ngSwitch__ Es ist eine Attribut Direktive, auf den Container angewendet, indem die möglichen Elemente liegen.
* __ngSwitchCase__ Eine Struktur Direktive, welche die möglichen Elemente markiert
* __ngSwitchDefault__ Eine Struktur Direktive, die ihr Element hinzufügt, wenn _ngSwitchCase_ nichts rendert.

``` angular
<div [ngSwitch]="currentItem.feature">
  <app-stout-item    *ngSwitchCase="'stout'"    [item]="currentItem"></app-stout-item>
  <app-device-item   *ngSwitchCase="'slim'"     [item]="currentItem"></app-device-item>
  <app-lost-item     *ngSwitchCase="'vintage'"  [item]="currentItem"></app-lost-item>
  <app-best-item     *ngSwitchCase="'bright'"   [item]="currentItem"></app-best-item>

  <app-unknown-item  *ngSwitchDefault           [item]="currentItem"></app-unknown-item>
</div>
```


<img src="./images/blaueLine.png" alt="Trennlinie">

### Stern Syntax ###

Die Sternsyntax ist eine abkürzende Schreibweise in Angular. 
Die zwei folgende Programmcodes zeigen die Kurz- und die Langform.

Kurzform
```
<div *ngIf="person" class="name">{{person.name}}</div>
```

Langform
```
<ng-template [ngIf]="person">
  <div class="name">{{person.name}}</div>
</ng-template>
```

Das <ng-template>-Element wird von Angular als ein Template definiert, das standardmäßig 
nichts rendert. Wenn Elemente einfach zwischen den <ng-template> stehen, 
ohne eine Struktur Direktive zu benutzen, werden diese Elemente nicht gerendert.

<img src="./images/blaueLine.png" alt="Trennlinie">

### ng-container ###

Dieses Element kann Struktur Direktiven halten, ohne neue Elemente dem DOM hinzuzufügen.
Dadurch werden nur die DOM-Änderungen angewendet die von einer Direktive aus kommen.
Das verhindert überflüssig gerenderte Elemente. 

Ein Beispiel ohne ng-container:

``` angular
// without ng-container             | // with ng-container
                                    |
<div *ngIf="todos">                 | <ng-container *ngIf="todos">
  <div *ngFor="let todo of todos">  |   <div *ngFor="let todo of todos">
    {{ todo.content }}              |     {{ todo.content }}
  </div>                            |   </div>
</div>                              | </ng-container>
```

``` angular
<div>                               | <div>
  <div>                             |   Todo Content 1
    Todo Content 1                  | </div>
  </div>                            | <div>
  <div>                             |   Todo Content 2
    Todo Content 2                  | </div>
  </div>                            | <div>
  <div>                             |   Todo Content 3
    Todo Content 3                  | </div>
  </div>                            | 
</div>                              | 
```


Ein weiteres Beispiel, einmal würde der Code nicht funktionieren, 
da ein li Element immer direkt unter einem ul Element sein muss. 
Wird der div Container gegen das ng-container getauscht, funktioniert der Code.
Schließlich wurde kein zusätzliches Element zwischen ul und li gerendert.
``` angular
// Invalid Example                          | // Valid Example
                                            | 
<ul>                                        | <ul>
  <div *ngFor="let todo of todos">          |   <ng-container *ngFor="let todo of todos">
    <li *ngIf="todo.content !== 'Done'">    |     <li *ngIf="todo.content !== 'Done'">
      {{ todo.content }}                    |       {{ todo.content }}
    </li>                                   |     </li>
  </div>                                    |   </ng-container>
</ul>                                       | </ul>
```
<img src="./images/blaueLine.png" alt="Trennlinie">

### ng-template ###

Hiermit lassen sich Template-Inhalte definieren, die erst dann gerendert werden, wenn
sie direkt oder indirekt eine Anweisung dazu bekommen. Alles, was von diesem Tag
eingeschlossen ist, wird erstmal demnach nicht angezeigt.
Häufig wird es mit strukturellen Direktiven verwendet, wie `ngIf` oder `ngFor`

```
<!-- dosen't render! -->

<ng-template>
  <div>Hip! Hip! Hooray!</div>
</ng-template>
```

`<ng-template>` Elemente repräsentieren eine Instanz der TemplateRef-Klasse. 
Um Kopien dessen dem DOM hinzuzufügen, wird das Objekt an die ViewContainerRef-Methode _createEmbeddedView()_ übergeben.
Eine andere Möglichkeit das ng-template rendern zu lassen ist die ngTemplateOutlet-Direktive.

__ngTemplateOutlet__  
Der Inhalt des ng-templates wird im ng-container gerendert.
Dafür wird eine Template Variable im ng-template genutzt.
Sollte sich etwas im ng-container befinden, wird es überschrieben.
Auf diese Art kann das ng-template auch an mehreren Stellen eingebaut werden. 

```
<ng-template #renderMe>
  <div>Hip! Hip! Hooray!</div>
</ng-template>

<ng-container *ngTemplateOutlet="renderMe"> </ng-container>
```

__TemplateRef__  
Das ist eine Klasse, die es ermöglicht auf das `ng-template` von einer Komponente oder
Direktive aus zuzugreifen. Es ist ein Verweis zum Inhalt des ng-templates.
Auch hier ist eine Template Variable im ng-template Tag nötig.
Mit `ViewChild` kann die Komponente auf die Variable, die Referenz zum Template, zugreifen. 

```
@ViewChild('renderMe', { read: TemplateRef }) renderMe:TemplateRef<any>;
```
Jetzt muss Angular noch mitgeteilt werden, wo es gerendert werden soll. Dafür wird
`ViewContainerRef` verwendet. Es ist ähnlich wie TemplateRef, beide halten einen Verweis
auf einen Teil des Templates. ViewContainerRef als Dependency injection 
 referenziert auf das Host-Element,
das die Komponente oder Direktive hostet.

`ViewContainerRef` bringt eine Methode mt _createEmbeddedView()_ um das Template der
Komponente hinzuzufügen. Diese muss, wegen des Lifecycles in der Methode 
_ngAfterViewInit()_ stehen (Vorher existiert das Template nicht)

```
constructor(private vref:ViewContainerRef) {
  }
 
  ngAfterViewInit() {
    this.vref.createEmbeddedView(this.renderMe);
  }
```
Das Template wird unten angehangen

__Ng-template mit ngIf__  
```
<label>
  <input [(ngModel)]="selected" type="checkbox">Select Me
</label>
```
```
<!-- only ngIf -->              <!-- with ng-template -->

                                <ng-template [ngIf]="selected">
<div *ngIf="selected">            <div>
  <p>You are selected</p>           <p>You are selected</p>    
</div>                            </div>
                                </ng-template>
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Struktur Direktive erstellen ###

Ein Beispiel: Mit ngIf werden Elemente angezeigt, wenn der Ausdruck _true_ ist.
Nun sollen die Elemente gerendert werden, wenn der Ausdruck false ist.
Mit der Sternsyntax wird im Template ein neuer CSS selector eingefügt, 
der eine boolesche Eigenschaft von der Komponente übergibt.

``` angular
<p *appUnless="condition">Show this sentence unless the condition is true.</p>
```

Nun eine Direktive erstellen: `ng g directive unless` 
Angular erkennt den CSS selector und verbindet die neue Direktive mit dem Template.
Nun bekommt die Direktive ein paar Importe und in ihrem Constructor zwei Dependencies.

```angular
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]'})

export class UnlessDirective {

    constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef) { }
}
```
_TemplateRef_ hilft, zum Inhalt von <ng-template> zu gelangen, 
und _ViewContainerRef_ greift auf den View-Container zu.
Da ein Wert übergeben werden soll, der true oder false ist, muss ein _@Input()_ den Wert auffangen
und es braucht einen Setter, welcher dann auf jede Änderung des Wertes reagiert. 

```
@Input() set appUnless(condition: boolean) {
  if (!condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  } else if (condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
```
__falsy__:  
Wenn das View noch nicht erstellt ist, wird das embedded(eingebettet) view, aus dem Template erstellt.

__true__:  
Ist der Wert true und es ist ein View vorhanden, wird dieses vom Container gelöscht.

<img src="./images/blaueLine.png" alt="Trennlinie">

### Struktur Direktiven Syntax ###

``` angular
*:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )*"
```
 * __prefix__ -     HTML attribute key
 * __key__ -        HTML attribute key
 * __local__ -      Locale Variable die im Template benutzt wird
 * __export__ -     Namentlicher Wert, der von der Direktive exportiert wird
 * __expression__ - Standard Angular Ausdruck


 * __as__ = `:export "as" :local ";"?`
 * __let__ = `"let" :local "=" :export ";"?`
 * __keyExp__ = `:key ":"? :expression ("as" :local)? ";"?`

Beispiele:

``` angular
// Abkürzung                    | // Ausgeschrieben
                                |  
*ngFor="let item of [1,2,3]"    | <ng-template ngFor
                                |              let-item
                                |              [ngForOf]="[1,2,3]">
                                |
*ngIf="exp"                     | <ng-template [ngIf]="exp">
                                |
*ngIf="exp as value"            | <ng-template [ngIf]="exp"
                                |              let-value="ngIf">    
```