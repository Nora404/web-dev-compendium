__Für wen ist dieser Text?__  
Für mich!  
Aber natürlich auch für jeden den es interessiert. Das hier ist kein Tutorial, 
sondern ein Nachschlagewerk. Es ist entstanden während ich mich in Angular eingearbeitet habe
und sollte so mein Wissen festigen und mein Verständnis durch eigene Formulierungen prüfen.

<img src="./images/blaueHeader00.png" alt="Inhaltsverzeichnis">

Angular ist der Nachfolger von AngularJS und wurde 2016 von grund auf neu geschrieben.
Es ist ein TypeScript-basiertes Front-End-Webapplikationsframework.
Ursprünglich wurde die Neuimplementierung von AngularJS „Angular 2“ genannt,
doch das führte bei Entwicklern zur Verwirrung. Hinter Angular steckt unter anderem Google,
es ist eine Open-Source-Software und hat die MIT-Lizenz.


Mit einer Annotation (In Angular wird es _Decorator_ genannt)
vor der Klassenbezeichnung, wird eine TypeScript Klasse in eine Angular-Komponente verwandelt. 
Angular manipuliert das Data Objekt Model (DOM). 
Bei normalem HTML-Code verändert sich die Seite nicht, erst wenn der Benutzer sie selbst aktualisiert.
Wird etwas im DOM verändert, aktualisiert sich die Seite sofort.

* [00 Command Line Interface](00-CLI.md)
* [01 Component](01-Component.md)
* [02 Module](02-Module.md)
* [03 Directives](03-Directives.md)
* [04 Templates](04-Templates.md)
* [05 Dependency](05-Dependency.md)
* [06 Lifecycle](06-Lifecycle.md)
* [07 Communication](07-Communication.md)
* [08 Streams und RxJS](08-Streams.md)
* [09 Routing](09-Routing.md)
* [10 Formulare](10-Forms.md)
* [11 Angular Testing](11-Testing.md)

<img src="./images/blaueLine.png" alt="Trennlinie">

### <ins>[00 Command Line Interface](00-CLI.md)</ins> ### 
Hier werden die verschiedenen "Bausteine" von Angular vorgestellt. Jeder Baustein hat seine Aufgabe und Eigenschaften.
- [ng generate ...](00-CLI.md)  
  - [Komponente](00-CLI.md#komponente)
  - [Directive](00-CLI.md#directive)
  - [Pipe](00-CLI.md#pipes)
  - [Services](00-CLI.md#service)
  - [Class](00-CLI.md#class)
  - [Guard](00-CLI.md#guard)
  - [Interface](00-CLI.md#interface)
  - [Enum](00-CLI.md#enum)
  - [Module](00-CLI.md#module)

### <ins>[01 Component](01-Component.md)</ins> ###
Eine Komponente steuert einen Teil des Bildschirms, den View.
Es besteht aus einer TypeScript-Klasse, einem HTML-Template und einem CSS-Stylesheet.
Die TypeScript-Klasse definiert das Zusammenspiel der HTML-Vorlage und der gerenderten DOM-Struktur,
während das Stylesheet ihr Aussehen beschreibt.
- [Metadaten](01-Component.md#metadaten)
  - [Selector](01-Component.md#selector)
- [Komponenten einer Component](01-Component.md#komponenten-einer-component)
  - [Template (View)](01-Component.md#template--view-)
  - [Class (Logik)](01-Component.md#class--logik-)
  - [CSS (Style)](01-Component.md#css--style-)
  - [Spec (Tests)](01-Component.md#spec--tests-)
- [Einbinden einer Komponente](01-Component.md#einbinden-einer-komponente)

### <ins>[02 Module](02-Module.md)</ins> ###
NgModule sind Container für einen zusammenhängenden Codeblock, der einer Anwendungsdomäne, 
einem Workflow oder einem eng verwandten Satz von Funktionen zugeordnet ist. 
Sie können Komponenten, Dienstanbieter und andere Codedateien enthalten, 
deren Umfang durch das enthaltende NgModule definiert wird.
- [Root-Modul](02-Module.md#root-module)
- [Optionen](02-Module.md#optionen)
- [Verfügbare Module](02-Module.md#verfügbare-module)
- [Standalone Components](02-Module.md)
  - [Bootstrap mit Standalone](02-Module.md)

### <ins>[03 Directives](03-Directives.md)</ins> ###
Direktiven sind Klassen, die den Elementen in der Vorlage neues Verhalten hinzufügen oder das vorhandene Verhalten ändern.
Grundsätzlich werden Direktiven verwendet, um das DOM zu manipulieren, 
zum Beispiel das Element aus dem DOM hinzuzufügen/zu entfernen oder das Erscheinungsbild der DOM-Elemente zu ändern.
- [Attributs Direktiven](03-Directives.md#attributs-direktiven)
  - [ngClass](03-Directives.md#ngclass---verhalten-von-klassen)
  - [ngStyle](03-Directives.md#ngstyle---verhalten-von-styles)
  - [ngClass](03-Directives.md#ngmodel---two-way-binding)
- [Attribut Direktive erstellen](03-Directives.md#attribut-direktive-erstellen)
- [Attribut Direktive User-Events](03-Directives.md#attribut-direktive-mit-user-events)
- [Attribut Direktive mit Values](03-Directives.md#attribut-direktive-mit-values)
- [Struktur Direktiven](03-Directives.md#struktur-direktiven)
  - [ngIf](03-Directives.md#ngif---bedingte-subviews)
  - [ngFor](03-Directives.md#ngfor---elemente-per-liste)
  - [ngSwitch](03-Directives.md#ngswitch---alternative-views)
- [Stern Syntax](03-Directives.md#stern-syntax)
- [ng-container](03-Directives.md#ng-container)
- [ng-template](03-Directives.md#ng-template)
- [Struktur Direktive erstellen](03-Directives.md#struktur-direktive-erstellen)
- [Struktur Direktive syntax](03-Directives.md#struktur-direktiven-syntax)


### <ins>[04 Templates](04-Templates.md)</ins> ###
In Angular ist ein Template eine Blaupause für ein Fragment einer Benutzeroberfläche (UI). 
Vorlagen werden in HTML geschrieben, und innerhalb einer Vorlage kann eine spezielle Syntax verwendet werden, 
um auf vielen Funktionen von Angular zugreifen zu können. 
- [HTML und Angular](04-Templates.md#html-und-angular)
- [Statements](04-Templates.md#statements)
- [Data-Binding](04-Templates.md#data-binding)
  - [Interpolation binding](04-Templates.md#interpolation-binding)
  - [Property binding](04-Templates.md#property-binding)
  - [Event binding](04-Templates.md#event-binding)
  - [Two-way binding](04-Templates.md#two-way-binding)
  - [Attribut binding](04-Templates.md#attribut-binding)
  - [Class binding](04-Templates.md#class-binding)
  - [Style binding](04-Templates.md#style-binding)
- [Pipes](04-Templates.md#pipes)
  - [Date Pipe](04-Templates.md#date-pipe)
  - [String Pipes](04-Templates.md#pipes-für-strings)
  - [Number Pipes](04-Templates.md#pipes-für-numbers)
  - [Object Pipes](04-Templates.md#pipes-für-objekte)
  - [Pipes erstellen](04-Templates.md#pipes-erstellen)
- [Template Variablen](04-Templates.md#template-variablen)
- [ViewEncapsulation](04-Templates.md#viewencapsulation)
  - [ViewEncapsulation.Emulated](04-Templates.md#view-encapsulationemulated)
  - [ViewEncapsulation.None](04-Templates.md#view-encapsulationnone)
  - [ViewEncapsulation.ShadowDom](04-Templates.md#view-encapsulationshadowdom)

<img src="./images/blaueLine.png" alt="Trennlinie">

### <ins>[05 Dependency](05-Dependency.md)</ins> ###
In Angular sind Dependencys typischerweise Dienste, aber sie können auch Werte wie Strings oder Funktionen sein. 
Ein Injektor für eine Anwendung (automatisch während des Bootstrap erstellt) 
instanziiert bei Bedarf Abhängigkeiten unter Verwendung eines konfigurierten Anbieters des Dienstes oder Werts.
- [Aufgabe des Services](05-Dependency.md#aufgabe-des-services)
- [Injector](05-Dependency.md#injector)
  - [Injektor-Baum](05-Dependency.md#hierarchische-injector-baum)
  - [Globale Services](05-Dependency.md#globale-services)
  - [Komponenten-bezogene Services](05-Dependency.md#komponenten-bezogene-services)
  - [Lookup](05-Dependency.md#lookup)
- [Provider](05-Dependency.md#provider)
  - [Token](05-Dependency.md#token)
  - [useClass](05-Dependency.md#useclass)
  - [useExisting](05-Dependency.md#useexisting)
  - [useFactory](05-Dependency.md#usefactory)
  - [useValue](05-Dependency.md#usevalue)
  - [useValue vs useFactory](05-Dependency.md#usevalue-vs-usefactory)
- [Dependency bereitstellen](05-Dependency.md#dependency-bereit-stellten)
  - [Treeshakable](05-Dependency.md#treeshakable-providers)
- [Dependency injizieren](05-Dependency.md#dependency-injizieren)
  - [Member-Injection](05-Dependency.md#member-injection)
- [Sichtbarkeit](05-Dependency.md#sichtbarkeit-von-provider-beschränken)


### <ins>[06 Lifecycle](06-Lifecycle.md)</ins> ###
Eine Komponenteninstanz hat einen Lebenszyklus, der beginnt,
wenn Angular die Komponentenklasse instanziiert und die Komponentenansicht zusammen
mit ihren untergeordneten Ansichten rendert.
Angular erkennt danach, wenn sich datengebundene Eigenschaften ändern und
aktualisiert bei Bedarf die Ansicht oder Instanz.
Der Lebenszyklus endet, wenn die Komponenteninstanz zerstört und die gerenderte Vorlage
aus dem DOM entfernt wurde.
- [Lifecycle](06-Lifecycle.md#lifecycle)
- [Constructor](06-Lifecycle.md#constructor)
- [Lifecycle Events (Hooks)](06-Lifecycle.md#lifecycle-events)
  - [OnChanges](06-Lifecycle.md#onchanges)
  - [OnInit](06-Lifecycle.md#oninit)
  - [DoCheck](06-Lifecycle.md#docheck)
  - [AfterContentInit / AfterContentChecked](06-Lifecycle.md#aftercontentinit--aftercontentchecked)
  - [AfterViewInit / AfterViewChecked](06-Lifecycle.md#afterviewinit--afterviewchecked)
  - [OnDestroy](06-Lifecycle.md#ondestroy)

### <ins>[07 Communication](07-Communication.md)</ins> ###
Für Verwandte Komponenten gibt es Methoden die einen austausch von Informationen ermöglichen.
Zum Beispiel mit Data-Binding oder Observer. 
Komponenten die keine Verwandtschaft zueinander haben, können ihre Daten mithilfe von Services tauschen. 
Sollen die Daten synchron sein, bietet sich die Bibliothek RxJS sehr an. 
- [Eltern zum Kind](07-Communication.md#eltern-zum-kind)
  - [Input Binding](07-Communication.md#input-binding)
  - [Input mit Parameter](07-Communication.md#input-mit-parameter)
  - [Input abfangen mit Setter](07-Communication.md#input-abfangen-mit-setter)
- [Kind zu Eltern](07-Communication.md#kind-zu-eltern)
  - [Output Binding](07-Communication.md#output-binding)
  - [Zugriff mit Template Variablen](07-Communication.md#zugriff-mit-template-variablen)
  - [ViewChild](07-Communication.md#viewchild)
  - [ViewChild mit Template Variablen](07-Communication.md#viewchild-mit-template-variablen)
- [Two-way](07-Communication.md#tow-way)
  - [Kombination Input und Output](07-Communication.md#kombination-von-in--und-output)
  - [In Formularen [(ngModule)]](07-Communication.md#two-way-in-formularen-ngmodule)
- [Unter Geschwistern](07-Communication.md#unter-geschwistern)
- [Mit Service](07-Communication.md#mit-service)

### <ins>[08 Streams und RxJS](08-Streams.md)</ins> ###
Streams sind Datenflüsse, eine Folge von Werten über Zeit.
Es könnte zum Beispiel eine Zahl sein, die jede Sekunde um 1 steigt.
Ein zweites Beispiel währen die Koordinaten eines Maus-Klicks,
oder die Daten welche von einer Websocket-Verbindung zurückgegeben werden.
- [Reaktives Programmieren](08-Streams.md#reaktives-programmieren)
- [Was sind Observable](08-Streams.md#was-sind-observable)
- [Observable Erstellen](08-Streams.md#observable-erstellen)
- [Operatoren](08-Streams.md#operatoren)
  - [Erstellung](08-Streams.md#erstellung)
  - [Aggregate](08-Streams.md#aggregate)
  - [Bedingungen](08-Streams.md#bedingungen)
  - [Fehlerbehandlung](08-Streams.md#fehlerbehandlung)
  - [Multicasting](08-Streams.md#multicasting)
  - [Filterung](08-Streams.md#filterung)
  - [Transformation](08-Streams.md#transformation)
  - [Helfer](08-Streams.md#helfer)
  - [Join](08-Streams.md#join)
- [Subjekt](08-Streams.md)

### <ins>[09 Routing](09-Routing.md)</ins> ###
In einer Single-Page-App werden die verschiedenen Views ein- oder ausgeblendet, 
statt die gesamte Seite neu zu laden. Für die Navigation der Views wird der Angular-Router
verwendet. Definierten URL-Adressen werden Komponenten zugewiesen und im Ziel-Element geladen. 
- [Schnellstart](09-Routing.md)
- [Route definieren](09-Routing.md#route-definieren)
- [Basispfad](09-Routing.md#basis-pfad)
- [Verschachtelte Routen](09-Routing.md#verschachtelte-routen)
- [Routing-Parameter](09-Routing.md#routing-parameter)
- [Lazy Loading](09-Routing.md#lazy-loading)
  - [Umzug nach bootstrap](09-Routing.md#)
  - [loadChildren](09-Routing.md#)
  - [loadComponent](09-Routing.md#)
- [Guards](09-Routing.md#guards)
  - [canActivate](09-Routing.md#canActivate)
  - [canActivateChild](09-Routing.md#canActivateChild)
  - [canDeactivate](09-Routing.md#)
  - [canMatch](09-Routing.md#)
  - [resolve](09-Routing.md#)

<img src="./images/blaueLine.png" alt="Trennlinie">

### <ins>[10 Formulare](10-Forms.md)</ins> ###
Angular bietet zwei verschiedene Ansätze zur Verarbeitung von Benutzereingaben über Formulare: 
reaktiv und Vorlagen gesteuert. Beide erfassen Benutzereingaben aus dem View, 
validieren die Benutzereingabe, erstellen ein zu aktualisierendes Formular- und Datenmodell 
und bieten eine Möglichkeit, Änderungen nachzuverfolgen.
- [Bausteine des FormModule](10-Forms.md)
  - [FormControl](10-Forms.md#formcontrol)
  - [FormGroup](10-Forms.md#formgroup)
  - [FormArray](10-Forms.md#formarray)
- [Reactive oder Template](10-Forms.md#reactive-oder-template)
- [Reactive Forms](10-Forms.md#reactive-forms)
  - [Reactive Formulare Validierung](10-Forms.md#reactive-formular-validierung)
- [Template-Driven Forms](10-Forms.md#template-driven-forms)
  - [Template Formulare Validierung](10-Forms.md#template-formular-validierung)
  - [Mit CSS den Status darstellen](10-Forms.md#mit-css-den-status-darstellen)
  - [Mit Submit versenden](10-Forms.md#formular-mit-ngsubmit-versenden)
- [Eigene Validierungsregeln definieren](10-Forms.md#eigene-validierungsregeln-definieren)
- [Asynchrone Validatoren](10-Forms.md#asynchrone-validatoren)
- [Multi-Feld Validatoren](10-Forms.md#multi-feld-validatoren)

### <ins>[11 Angular Testing](11-Testing.md)</ins> ###
Niemand mag es, kaum einer tut es und Mansche haben "noch nie" davon gehört: Das Testen  
Angular bringt ein paar Tools mit, die das Testen erleichtern sollen. Um Fehler zu vermeiden
oder zu finden, sind Tests leider zwingend erforderlich.
- [Welche Tests gibt es?](11-Testing.md)
- [Installations der Testing-Tools](11-Testing.md#installation-der-testing-tools)
- [Jasmine, Karma und Protractor](11-Testing.md#jasmine-karma-und-protractor)
  - [Jasmine](11-Testing.md#jasmine)
  - [Karma](11-Testing.md#karma)
  - [Protractor](11-Testing.md#protractor)
- [Unit Tests](11-Testing.md#unit-tests)
  - [Testaufbau](11-Testing.md)
  - [AAA-Test Pattern](11-Testing.md)
  - [expect()](11-Testing.md)
  - [Ausführen oder ausschließen](11-Testing.md)
- [Isolierte Unit-Tests](11-Testing.md)
  - [Schemas](11-Testing.md)
- [Integrierte Unit-Tests (TestBed)](11-Testing.md)
  - [Change Detection](11-Testing.md)
  - [Benutzer Aktionen Simulieren](11-Testing.md)
- [Mocks und Spies](11-Testing.md)
  - [Eigenen Stub erstellen](11-Testing.md)
  - [Abhängigkeiten Injizieren](11-Testing.md)
  - [Eigene Mocks (Spione)](11-Testing.md)
- [Wie testet man ...](11-Testing.md)
  - [Formulare](11-Testing.md)
  - [Http-Requests](11-Testing.md)
  - [Routen](11-Testing.md)
  - [Asynchronen Code](11-Testing.md)



<!-- 
Um einen Anchor-Link auf eine andere Datei zu schreiben, muss folgendes beachtet werden:
Der Link zur Datei ohne Anker muss einmal vorhanden sein [link](target/file.md)
Dann kann zu einem Header verlinkt werden [link](target/file.md#headerid)
Jeder Markdown-Header hat eine id, sie muss nicht extra vergeben werden
Die id beginnt mit #, hat den gleichen Namen wie der header,
alles Kleingeschrieben und statt Leerzeichen einen - Bindestrich

Test 2
-->

