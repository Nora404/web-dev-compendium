## Routing ##

In einer Single-Page-App werden die verschiedenen Views ein- oder ausgeblendet,
statt die gesamte Seite neu zu laden. Für die Navigation der Views wird der Angular-Router
verwendet. Definierten URL-Adressen werden Komponenten zugewiesen und im Ziel-Element geladen.

### Schnellstart ###

Erstellung einer Angular-App mit Routing:
```
ng new appName --routing --defaults
```

---

Definition der Routen im automatisch erstelltem `app-routing.module` 
```
const routes: Routes = [
  {path: '', component: DefaultComponent},
  {path: 'seite1', component: Seite1Component},
  {path: 'seite2', component: Seite2Component},
];
```

---

Darstellung der verschiedenen Inhalte in der HTML-Datei mittels `<router-outlet>` Tag:
```
<div>
  <a routerLink='/seite1' class="link">Seite 1</a>
  <a routerLink='/seite2' class="link">Seite 2</a>
</div>

<div>
  <router-outlet></router-outlet>
</div>
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Route definieren ###

Angular nimmt einem einiges an Arbeit ab, wenn CLI verwendet wird. 
Es ist sehr einfach neue Routen hinzuzufügen. Dabei ist die Reihenfolge der Routen wichtig.
Beim Abgleichen der Routen gilt: Der erste Treffer gewinnt!
Es sollten spezifische Routen über weniger spezifische Routen platziert werden. 

1. Importieren der RouterModule und Routen im `app-routing.module` 
```
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = []; 
```
2. Definieren der Routen im Array
```
const routes: Routes = [
  {path: 'seite1', component: Seite1Component},
  {path: 'seite2', component: Seite2Component},
];
```
3. Die Routen in die App einbinden
```
<nav>
  <ul>
    <li><a routerLink="/seite1" routerLinkActive="active" ariaCurrentWhenActive="page">Seite 1</a></li>
    <li><a routerLink="/seite2" routerLinkActive="active" ariaCurrentWhenActive="page">Seite 2</a></li>
  </ul>
</nav>

<!-- The routed views render in the <router-outlet>-->
<router-outlet></router-outlet>
```
`routerLink` HTML-Element wird zu einem Link, der die Route initiiert   
`routerLinkActiv` Verfolgt ob die Route aktiv ist, so können CSS-Elemente hinzugefügt werden  
`ariaCurrentWhenActive` Zeigt das der Link aktiv ist, dient der Barrierefreiheit

<img src="./images/blaueLine.png" alt="Trennlinie">

### Basis-Pfad ###

Angular benutzt die mit HTML5 eingeführte History-API, die es erlaubt aus JavaScript
die Browser-URL zu verändern. Dafür wird ein Basis-Pfad benötigt. Dieser muss im 
index.html und im AppModule eingerichtet werden.

Das wird zum Beispiel gebraucht, wenn auf dem Server mehrere Anwendungen laufen,
und nur eine bestimmte Anwendung erreicht werden soll. Alle URLs in dieser 
Anwendung müssen wissen auf welcher Basis relative Pfade definiert werden.

> http:// server.de/app1

```
<head>
  <title>Die Erste Anwendung</title>
  <base href="/app1/">
  ...
</head>
```

Auch der Router muss wissen welcher Pfad der Base-Pfad ist. Das wird in dem AppModule gemacht

```
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  providers: [
    ...
    {provide: APP_BASE_HREF, useValue: '/app1/'}
  ]
})
export class AppModule { }
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Verschachtelte Routen ###

Routen können verschachtelt und gruppiert werden. 

> http:// server.de/app1/seite1  
> http:// server.de/app1/seite2

Die Unterseiten (seite1 und seite2) sollen von _app1_ aus erreichbar sein.
Im Template von _app1_ befindet sich dafür auch ein `router-outlet`  
Unterhalb der Komponente App1Component werden die Pfade zu den Unterseiten beschrieben, als exportierbare const. 

```
export class App1Component {
    ...
}

export const subRouts: Routes =[{
  path: "app1", component: App1Component,
  children: [
    {path: '', component: Seite1Component},
    {path: 'seite1', component: Seite1Component},
    {path: 'seite2', component: Seite2Component},
  ]
}];
```
Da es ein Array ist, kann es ganz einfach in der AppRoutingModule eingebunden werden.
```
import {App1Component, subRouts} from "./app1/app1.component";

export const routes: Routes = [
  {path: '', component: App1Component},
  {path: 'app1', component: App1Component},
  {path: 'app2', component: App2Component},
  ...subRouts
];
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Zwei \<router-outlets\> ####

Hier eine weitere Variante, das Template von _app1_, geladen im ersten router-outlet:

```
<h2>App 1</h2>

<nav>
  <ul>
    <li><a routerLink="child-a">Child A</a></li>
    <li><a routerLink="child-b">Child B</a></li>
  </ul>
</nav>

<router-outlet></router-outlet> // Das ist der zweite router-outlet
```

```
  {
    path: 'first-component',
    component: FirstComponent,
    children: [
      {
        path: 'child-a', // child route path
        component: ChildAComponent
      },
      {
        path: 'child-b',
        component: ChildBComponent
      },
    ],
  }
```


<img src="./images/blaueLine.png" alt="Trennlinie">

### Routing-Parameter ###

| Parameterart        | Beispiel URL           | Einsatzzweck                                         |
|---------------------|------------------------|------------------------------------------------------|
| Pfad-Parameter      | ${baseURL}/task/edit/1 | Übergabe von Pflicht-Parametern                      |
| Matrix-Parameter    | ${baseURL}/task;q=Test | Übergabe von segmentabhängigen optionalen Parametern |
| Query-Parameter     | ${baseURL}/task?q=Test | Übergabe von globalen optionalen Parametern          |
| Fragmentbezeichner  | ${baseURL}/task#Test   | Adressierung von Punkten innerhalb des Dokuments     |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Pfad-Parameter ####
Mit einem Pfad-Parameter kann zum Beispiel eine ID der neu geladenen Komponente übergeben werden.
Dies wird mit einem : Doppelpunkt in der Routen-Definition angegeben 

```
  children: [
    {path: '', component: Seite1Component},
    {path: 'seite1/:id', component: Seite1Component},
    {path: 'seite2', component: Seite2Component},
  ]
```
Im Template wird dem `routerLink` ein Array übergeben, indem sind die Abschnitte der URL. 
Der zu übergebene Wert kann eine Variable oder ein fester Wert sein
```
<a [routerLink]="['./seite1', seite.id]"> {{seite.titel}} </a>
```
In der geladenen Seite muss der Wert nun abgeholt werden. Dafür wird `ActivateRoute`
verwendet. Es wird in den Konstruktor injiziert. Diese Klasse bietet einige Informationen
über die aktuelle Route. 
```
constructor(private route: ActivatedRoute) {
  this.id = this.route.snapshot.paramMap.get('id');
}
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### ActivatedRoute gibt Streams aus ####

Jetzt wird es richtig cool! Die Parameter befinden sich in einem Stream und können
auch so behandelt werden, zum Beispiel nach bestimmten Parametern filtern.
```
ngOnInit(): void {
  this.route.params.pipe(
      filter(params => params['text'])
    )
    .subscribe(params => this.text = params['text']);
  );
}
```
Das ist nützlich, wenn zum Beispiel eine Seite von verschiedenen Orten angesteuert werden
kann, und je nachdem von wo sie kommt, unterschiedliche Werte in den Parametern hat.

<img src="./images/blaueLine.png" alt="Trennlinie">


### Setting Route ###


#### Wildcard Routen  404 ####

```
{ path: '**', component: <component-name> }
```

#### Weiterleitung ####

```
{ path: '',   redirectTo: '/first-component', pathMatch: 'full' },
```

#### Page title ####

```
{ path: 'first-component', title: 'First component', component: FirstComponent },
```

<img src="./images/blaueLine.png" alt="Trennlinie">

### Lazy loading ###

https://www.youtube.com/watch?v=VzYRFLnnzkE 

Mit Angular 16 gibt standalone Komponenten und Modules sind nicht mehr nötig. Das wirkt sich auf das Lazy Loading aus. Zuvor wurden die Komponenten in Module gesammelt und diese wurden lazy geladen. Nun können Komponenten oder Kinder direkt beschrieben werden, ohne sie vorher in eigene Module zu packen.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### Umzug nach bootstrap ####

Da es keine Module mehr gibt, müssen die Angaben der Routen nach main.ts umziehen.

```
bootstrapApplication(AppComponent, {
  providers: [
    ...
    provideRouter([
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: WelcomeComponent, pathMatch: 'full'},
      {path: '**', redirectTo: WelcomeComponent, pathMatch: 'full'},
    ])
  ]
})
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### loadChildren ####

Die Datei mit den Kindern, besteht aus einem Array, welches importiert werden kann.
Erst in dieser Datei werden auch die dafür benötigten Komponenten importiert, also geladen.

```
import {Routes} from ...
import {Seite1Component} from ...
import {Seite1ItemComponent} from ...

export const SEITE_1: Routes = [
  {path: '', component: Seite1Component},
  {path: ':id', component: Seite1ItemComponent},
]
```
Beim `path` muss nicht "seite1" stehen, denn das steht bereits in der Beschreibung
des Pfades im main.ts   
Dieser sieht nun so aus:

```
{
  path: 'seite1',
  loadChildren: () => import('./app/seite1/seite1.routes')
    .then(r => r.SEITE_1)
}
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### loadComponent ####

Ist die Komponente eine standalone, kann sie wie in diesem Beispiel lazy geladen werden.

```
{
  path: 'seite2',
  loadComponent: () => import('./app/seite2/seite2.component')
    .then(c => c.Seite2Component)
}
```


<img src="./images/blaueLine.png" alt="Trennlinie">

### Guards ###

Mit Guards können User nur dann zu einer Route hin oder weg navigieren, wenn sie dazu autorisiert sind. Guards sind Klassen und Funktionen die ein Boolean zurück geben. 
Sie werden in der Beschreibung des Pfades mit angegeben. 

```
{
  path: 'seite2',
  component: Seite2Component,
  canActivate: [myGuardFunction],
}
```

| Guards           | Beschreibung |
|------------------|--------------|
| canActivate      | Überprüft, ob ein Benutzer eine Route besuchen kann. |
| canActivateChild | Überprüft, ob ein Benutzer die untergeordneten Routen besuchen kann. |
| canDeactivate    | Überprüft, ob ein Benutzer eine Route verlassen kann. |
| canMatch         | Überprüft, ob eine Route mit der aktuellen URL übereinstimmt |
| resolve          | Führt den Abruf der Routendaten vor der Routenaktivierung durch. |

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### canActivate ####

Darf der User zu einer bestimmten Route navigieren, Ja(true) oder nein(false)?
Es ist eine ganz einfache Frage, zum Beispiel dürfte nur ein Admin die `AdminPageComponent` besuchen. 

In einem Service wird die Logik dafür beschrieben. Das sähe nicht so wie hier aus, denn in diesem beispiel wird einfach ein Boolean zurück geschickt. Es dient nur um den Aufbau zu zeigen

```
@Injectable({ providedIn: 'root' })

export class PermissionsService {
  isAdmin(isAdmin: boolean) {
    return isAdmin;
  }
}
```
Der Guard wird als Funktion beschrieben indem der Service injiziert wird.
Der erste Parameter _isAdmin_ wäre der zu überprüfende User, der zweite
Parameter ist der oben erstellte Service.
```
export const canActivate = 
  (isAdmin: boolean, permissionService = inject(PermissionsService)) => {
  permissionService.isAdmin(isAdmin)
  };
```
Und so würde der Guard eingebunden werden. Hier wird nur _true_ übergeben.
In einem echten Fall könnte das die ID des Benutzers sein
```
{
  path: 'dashboard',
  canActivate: [() => canActivate(true)],
  loadComponent: () => import('./dashboard/admin.component'),
 }
```

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### canActivateChild ####

```
  {
    path: 'app1',
    canActivate: [() => true],
    canActivateChild: [() => true],
    loadComponent: () => import('./app1/start.component')
      .then((c) => c.StartComponent),
    loadChildren: () => import('./app1.routes')
      .then((r) => r.CHILDREN_ROUTE),
  }
```
Was ist der Unterschied von `canActivate` und `canActivateChild`?
```
export const CHILDREN_ROUTE = [
  {
    path: 'seite1',
    loadComponent: () => import('./app1/seite1.component')
      .then((c) => c.Seite1Component),,
  },
  {
    path: 'seite2',
    loadComponent: () => import('./app1/seite2.component')
      .then((c) => c.Seite2Component),,
  }, 
```
- Wenn von `url/` nach `url/app1/seite1` navigiert wird, werden beide Guards
  `canActivate` und `canActivateChild` ausgeführt und müssen beide _true_ ergeben.
Wenn zwischen den Kindern, also seite1 und seite2 navigiert wird, dann wird auch nur
der `canActivateChild` ausgeführt.  
- Wenn nur nach `url/app1` navigiert wird, wird nur `canActivate` ausgeführt.
- Wenn zu einem Kind navigiert wird und der Guard eines der Kinder ist _false_
  wird die ganze Route abgebrochen und auch das Elternteil wird nicht geladen
- `canActivate` wird vor `canActivateChild` ausgeführt. Ist es _false_ wird
  `canActivateChild` erst gar nicht ausgeführt
- `canActivate` könnte auch stattdessen auf jedes Kind angewand werden.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### canDeactivate ####

Dieser Guard verhindert nicht die Navigation zu einer Route hin, sondern verhindert das die aktuelle Route verlassen wird. Das ist besonders bei Formularen nützlich, fals der Benutzer seine Eingaben nicht abgeschickt/gesichert hat. 
Beim verlassen der Route würden seine Eingaben verloren gehen. 
Dieser Guard wird nicht mit lazy loading kombiniert, da die Komponente bereits geladen ist.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### canMatch ####

Angular geht im Array mit den Routen alle Einträge von Oben nach Unten durch. 
Es ist möglich, dass ein Pfad zu unterschiedlichen Orten führen kann. 
Das kann wunderbar mit lazy loading verknüpft werden.  

In Diesem Beispiel gibt die Funktion _random100()_ eine beliebige Zahl zwischen 1 und 100 aus. Der Pfad ist immer der gleiche, nur das Match bestimmt was genau geladen wird.
Diese werden von Oben nach Unten ausgewertet, der erste "Treffer" gewinnt.   
Ist der Wert unter 50 soll `Seite1Component` geladen werden.   
Ist der Wert über 50 soll `Seite2Component` geladen werden.  
Trifft keines davon zu, wird `Seite3Component` geladen.

```
const random100 = (): number => Math.floor(Math.random() * 99) + 1;

export const abcTestingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app/seite1.component')
      .then((c) => c.Seite1Component),
    canMatch: [() => random100() < 50],
  },
  {
    path: '',
    loadComponent: () => import('./app/seite2.component')
      .then((c) => c.Seite2Component),
    canMatch: [() => random100() > 50],
  },
  {
    path: '',
    loadComponent: () => import('./app/seite3.component')
      .then((c) => c.Seite3Component),
  },
];
```
Das kann zum Beispiel genutzt werden um unter einem Pfad dem Admin, dem User und dem Gast je verschiedene Komponenten zu zeigen/laden.

<img src="./images/blaueLine2.png" alt="Trennlinie">

#### resolve ####

Dieser Guard kann benutzt werden um zu prüfen, ob die Daten vorhanden sind, bevor zur Route hin navigiert wird. Sind sie nicht da, macht es keinen Sinn der Route zu folgen.

```
export const itemResolver =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ItemService).getItem(route.paramMap.get('id')!);
    };
```

```
{
  path: 'detail/:id',
  component: ItemDetailComponent,
  resolve: {item: itemResolver},
}
```