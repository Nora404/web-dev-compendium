
<img src="./images/blaueHeaderModu.png" alt="Trennlinie">

Ein Modul ist ein Mechanismus zum Gruppieren von Komponenten, Direktiven,
Pipes und Services, die verwandt sind, so dass sie mit anderen Modulen kombiniert werden können. Mit Angular 15 verlieren Module jedoch an Bedeutung, sie sind nicht mehr notwendig und werden in Zukunft aussterben.

### Root-Module ###

Jede Angular-Anwendung hat mindestens ein Modul, das Root-Modul welches die Anwendung startet.
Wenn ein neues Projekt erstellt wird, wird auch dieses Modul erstellt, mit den Namen _AppModule_

```typescript jsx
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
```

Nach den Importen kommt der _Decorator_ @NgModule, er gibt an das es sich bei dieser Klasse
um ein NgModule handelt. Es hält ein Metadatenobjekt mit vier Array Eigenschaften.

- __declarations__ (Liste aller Komponenten)
- __imports__ (Liste aller Module)
- __providers__ (Liste von benötigten Services)
- __bootstrap__ (Erste Komponente im Baum)

_"Bootstrap ist ein kleines Programm, das ein größeres Programm nachlädt"_

<img src="./images/blaueLine.png" alt="Trennlinie">

### Optionen ###

__declarations__  
In diesem Array werden die Komponenten, Direktiven und Pipes aufgelistet (declarables).
Declarables können nur zu genau einem Modul gehören.
Wird dieselbe Klasse in mehreren Modulen deklariert, gibt der Compiler einen Fehler aus.

__imports__  
Eine Liste von Modulen die importiert werden und so alle deren Declarables für das Root-Modul verfügbar machen.

__exports__  
Liste von Komponenten, Direktiven und Pipes die in diesem Modul deklariert wurden und in jedem
Template der Komponenten, die dieses Modul importiert, verwendet werden können.
Wenn ModuleA eine UserComponent hat und diese nicht exportiert, können nur Komponenten innerhalb
ModuleA die UserComponent verwenden.

Module können auch Module exportieren, dann werden alle pubic Deklarationen des Modules exportiert.
Deklarationen sind standardmäßig private. ModuleA kann ModuleB importieren und exportieren,
wodurch Exporte von ModuleB allen anderen Modulen zur verfügung steht, die ModuleA importiert haben.

__providers__  
Alle Services, die hier aufgelistet werden, sind für alle untergeordneten Komponenten,
Pipes, Directives und andere Services verfügbar.
Ein verzögert geladenes Modul (lazy-loaded) hat seinen eigenen Injektor.
Lazy-loaded Services sind auf den Injektor des lazy-loaded-Moduls beschränkt.

__bootstrap__  
Hier stehen die Komponenten, die beim booten des Modules, gebootet werden sollen.
Sie sind meist der Beginn eines Komponenten-Baumes. Mit Routing können mehrere Bäume
"angepflanzt" werden. Die hier aufgelisteten Komponenten werden automatisch zur
entryComponents Liste hinzugefügt.

__entryComponents__  
Komponenten in dieser Liste können dynamisch in den View geladen werden. Für jede hier aufgelistete
Komponente erstellt Angular eine _ComponentFactory_ und speichert sie in den _ComponentFactoryResolver_.

__schemas__  
Schemata sind Elemente und Eigenschaften die weder Angular-Komponenten noch Direktiven sind.
Sie müssen als Schema deklariert und in dieser Liste aufgezählt werden, damit das Modul sie nutzen kann.

__id__  
Ein einzigartiger Name oder Pfad für das Modul. Die ID kann mit _getNgModuleById_ abgerufen werden.

<img src="./images/blaueLine.png" alt="Trennlinie">

### Verfügbare Module ###

__BrowserModule__  
Dieses Modul ist notwendig, wenn die Anwendung in einem Browser laufen soll.
Es wird standardmäßig beim Erstellen mit CLI direkt eingebunden.
Es exportiert das Application- und CommonModule, und macht diese für die gesamte Anwendung verfügbar.
Die Methode des Modules wird beim serverseitigem Rendern verwendet.

```typescript jsx
class BrowserModule {
  static withServerTransition(params: { appId: string; }): ModuleWithProviders<BrowserModule>
}
```

__CommonModule__  
Exportiert alle basic Angular Direktiven und Pipes, sowas wie Ngif, NgForOf oder DecimalPipe.
Es wird automatisch mit BrowserModule exportiert und gilt für das Root-Module.
Eine Liste dieser Direktiven und Pipes ist <a href="https://angular.io/api/common/CommonModule">hier</a>

__FormsModule__  
Dieses Module beinhaltet einige Direktiven für Formulare in Templates (Template Driven). 
Es sind Eventlisener und Validatoren dabei oder die Möglichkeit Formularfelder zu gruppieren.
Eine Liste dieser Direktiven findet sich <a href="https://angular.io/api/forms/FormsModule">hier</a>

__ReactiveFormsModule__  
Exportiert die erforderliche Infrastruktur und Direktiven für reaktive Formulare, 
Zum Beispiel können Elemente zur Laufzeit hinzugefügt oder entfernt werden.

_Unterschied zwischen Template Driven und Reactive Forms_  

| Template              | Reactive                         |
|-----------------------|----------------------------------|
| Einfache Umsetzung    | Flexibler aber braucht Erfahrung |
| Für simple Formulare  | Für komplexe Formulare           |
| Two-way Data Binding  | Kein Data Binding                |
| Unit Test aufwendiger | Unit Test einfacher              |


__RouterModule__  
Fügt Direktiven und Providers für die Navigation zwischen Views zu. 
Dafür wird ein Router Service verwendet.

__HttpClientModule__  
Ermöglicht die Verwendung und Auswertung von HTTP requests und responses.

<img src="./images/blaueLine.png" alt="Trennlinie">

### Standalone Components ###

Mit Angular 15 gibt es die Standalone Komponenten/Direktiven/Pipes, welche nicht dem ngModel bekannt gemacht werden müssen. Sie importieren ihre Abhängigkeiten selbst. Sie werden mit `standalone:true` im Decorator markiert.

``` typescript
@Component({
  standalone: true,
  selector: 'photo-gallery',
  imports: [ImageGridComponent],
  template: `
    ... <image-grid [images]="imageList"></image-grid>
  `,
})
```
Diese Komponenten können mit existierenden Modulen zusammen arbeiten.
Sie können nicht nur selbst Komponenten oder Module importieren, sie
können auch in ngModule eingebunden werden

``` typescript
@NgModule({
  declarations: [AlbumComponent],
  exports: [AlbumComponent], 
  imports: [PhotoGalleryComponent],
})
```
<img src="./images/blaueLine2.png" alt="Trennlinie">

### Bootstrap with Standalone ###
Eine Standalone Komponente kann auch als Bootstrap benutzt werden.

``` typescript
// in the main.ts file
import {bootstrapApplication} from '@angular/platform-browser';
import {PhotoAppComponent} from './app/photo.app.component';

bootstrapApplication(PhotoAppComponent);
```