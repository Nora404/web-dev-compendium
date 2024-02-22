__Für wen ist dieser Text?__  

Das Buch Design Pattern ist ja sehr schön aufgebaut und hat viele Beispiele. Aber es ist für Menschen geschrieben, die diese Pattern bereits kennen und nur ihre Erinnerung auffrischen wollen. Ich möchte mir die Pattern ansehen und diese so beschreiben, das auch Anfänger sie verstehen und verwenden können.  

Das hier wird mein eigenes Design Pattern Nachschlagewerk

## Erzeugungsmuster

### 01 Abstract Factory (Abstrakte Fabrik):
 **Was:** Eine Art Fabrik, die Fabriken erstellt. Jede dieser Fabriken kann Objekte ohne spezifische Details erzeugen.  
 **Wozu:** Verwenden, wenn mehrere Objektfamilien erstellt werden sollen und es wichtig ist, die Erzeugung dieser Familien konsistent zu halten.  
 **Beispiel:** Verwendung in einem UI-Framework, das unterschiedliche Stile von UI-Elementen für verschiedene Betriebssysteme erstellt.

### 02 [Die Factory (Fabrik)](02-factory/02-factory.md):
**Was:** Funktioniert wie eine echte Fabrik, die verschiedene Dinge herstellt, ohne dass die Details des Herstellungsprozesses bekannt sein müssen.  
**Wozu:** Einsetzen, wenn der Erzeugungsprozess von Objekten von deren Klassen getrennt werden soll oder wenn es viele Objekttypen gibt.  
**Beispiel:** Ein Spieleentwickler, der verschiedene Arten von Gegnern oder Spielobjekten erstellt, je nach Spielumgebung.

### 03 Builder (Erzeuger):
**Was:** Ermöglicht die schrittweise Erstellung komplexer Objekte, ohne dass der Aufbau im Detail bekannt sein muss.  
**Wozu:** Anwenden, wenn die Konstruktion eines komplexen Objekts schrittweise erfolgen soll und der Prozess unabhängig vom Endprodukt gestaltet werden muss.  
**Beispiel:** Ein Spiel, das einen Level-Builder verwendet, um komplexe Level schrittweise zusammenzusetzen.

### 04 Singleton (Einzelstück):
**Was:** Stellt sicher, dass von einer Klasse nur ein einziges Objekt existiert, das dann von allen genutzt wird.  
**Wozu:** Geeignet, wenn genau eine Instanz einer Klasse benötigt wird und diese global zugänglich sein muss.  
**Beispiel:** Eine Datenbankverbindung in einer Anwendung, die überall in der Anwendung dieselbe Instanz nutzt.

### 05 Prototype (Prototyp):
**Was:** Ermöglicht die Erstellung eines neuen Objekts als Kopie eines existierenden, ohne es komplett neu aufbauen zu müssen.  
**Wozu:** Anwenden, wenn Objekte geklont statt von Grund auf neu erstellt werden sollen, besonders wenn die Erzeugung kostenintensiv ist.  
**Beispiel:** Ein Grafikeditor, der Objekte kopiert und modifiziert, statt sie jedes Mal neu zu erstellen.

***
***

## Strukturmuster

### 06 Adapter (Adapter):
**Was:** Funktioniert wie ein Übersetzer zwischen zwei Systemen mit inkompatiblen Schnittstellen, um Kommunikation zu ermöglichen.  
**Wozu:** Nützlich, um inkompatible Schnittstellen zu überbrücken, sodass unterschiedliche Klassen zusammenarbeiten können.  
**Beispiel:** Ein Dateikonverter, der unterschiedliche Dateiformate in ein einheitliches Format umwandelt.

### 07 Composite (Kompositum):
**Was:** Ermöglicht die Behandlung einzelner Objekte und Gruppen von Objekten in einer einheitlichen Weise.  
**Wozu:** Einsatz, wenn individuelle Objekte und ihre Zusammensetzungen auf die gleiche Weise behandelt werden sollen.  
**Beispiel:** Ein Grafikprogramm, das Einzelobjekte und Gruppen von Objekten (z.B. Zeichnungen) gleich behandelt.

### 08 Facade (Fassade)
**Was:** Stellt eine einfache Schnittstelle zur Verfügung, um den Zugriff auf ein komplexeres System zu vereinfachen.  
**Wozu:** Anwenden, um komplexe Systeme zu vereinfachen und eine einheitliche Schnittstelle für eine Reihe von Subsystemen zu bieten.  
**Beispiel:** Ein einfaches Interface für ein komplexes Video-Rendering-System.

### 09 Proxy (Stellvertreter):
**Was:** Dient als Stellvertreter für ein anderes Objekt und kann den Zugang oder die Funktionalität kontrollieren.  
**Wozu:** Verwenden, um die Kontrolle über den Zugriff auf ein Objekt zu steuern, etwa bei kostenintensiven Operationen oder Sicherheitsbedenken.  
**Beispiel:** Ein Bildlade-Proxy in einer Webanwendung, der erst das reale Bild lädt, wenn es wirklich angezeigt werden soll.

### 10 Bridge (Brücke):
**Was:** Ermöglicht die Trennung von Abstraktion und Implementierung, sodass beide unabhängig voneinander geändert werden können.  
**Wozu:** Geeignet, wenn Abstraktion und Implementierung unabhängig voneinander variieren sollen.  
**Beispiel:** Eine Anwendung mit plattformunabhängiger Oberfläche, die unterschiedliche Zeichenroutinen für verschiedene Betriebssysteme verwendet.

### 11 Decorator (Dekorierer):
**Was:** Fügt einem Objekt zusätzliche Funktionen hinzu, ähnlich wie das Hinzufügen von Dekorationen, ohne die Grundstruktur zu ändern.  
**Wozu:** Einsetzbar, um Objekten dynamisch zusätzliche Funktionen hinzuzufügen, ohne ihre Klassen zu ändern.  
**Beispiel:** Erweiterung der Funktionalität eines Fensters in einer GUI-Bibliothek durch Hinzufügen von Scrollbalken oder Rahmen.

***
***

## Verhaltensmuster

### 12 Command (Befehl):
**Was:** Wie eine Reihe von Befehlen, die ausgeführt werden können, ähnlich den Tasten auf einer Fernbedienung.  
**Wozu:** Anwenden, wenn Befehle gekapselt und variabel gehandhabt werden sollen, etwa für Rückgängig-Machen, Warteschlangen oder Protokollierung.  
**Beispiel:** Eine Anwendung mit Undo-Redo-Funktionalität, die jede Aktion als Befehl speichert.

### 13 Mediator (Vermittler):
**Was:** Fungiert als zentraler Kommunikationspunkt zwischen verschiedenen Objekten, um die Komplexität zu verringern.  
**Wozu:** Nützlich, um die Kommunikation zwischen Klassen zu vereinfachen und deren direkte Abhängigkeiten zu reduzieren.  
**Beispiel:** Ein Chat-Server, der als zentraler Kommunikationspunkt zwischen verschiedenen Clients fungiert.

### 14 Observer (Beobachter):
 **Was:** Informiert automatisch über Änderungen in einem Objekt, ähnlich einem Nachrichtenticker.  
 **Wozu:** Einsatz, wenn Änderungen in einem Objekt automatisch eine Reihe von abhängigen Objekten beeinflussen sollen.  
 **Beispiel:** Ein Nachrichten-Feed-System, in dem sich Abonnenten über neue Nachrichten informieren lassen.

### 15 State (Zustand):
**Was:** Erlaubt es einem Objekt, sein Verhalten zu ändern, wenn sich sein interner Zustand ändert.  
**Wozu:** Verwenden, wenn das Verhalten eines Objekts sich ändern soll, abhängig von seinem Zustand.  
**Beispiel:** Ein Texteditor, der sein Verhalten ändert, je nachdem, ob er sich im Eingabe-, Auswahl- oder Lese-Modus befindet.

### 16 Iterator (Iterator):
**Was:** Ermöglicht sequenziellen Zugriff auf Elemente einer Sammlung, ähnlich dem Durchgehen einer Playlist.  
**Wozu:** Geeignet, um sequenziellen Zugriff auf Elemente in einer Sammlung zu ermöglichen, ohne deren innere Struktur offenzulegen.  
**Beispiel:** Eine Fotogalerie-App, die es ermöglicht, durch eine Sammlung von Bildern zu blättern.

### 17 Strategy (Strategie):
**Was:** Bietet verschiedene Methoden zur Lösung eines Problems, aus denen je nach Situation gewählt werden kann.  
**Wozu:** Anwenden, wenn verschiedene Varianten eines Algorithmus existieren und austauschbar sein sollen.  
**Beispiel:** Ein Navigationsprogramm, das verschiedene Routenberechnungsalgorithmen je nach Verkehrslage verwendet.

### 18 Visitor:
**Was:** Ermöglicht das Durchführen von Operationen auf einer Gruppe von Objekten, ohne ihre Struktur zu verändern.  
**Wozu:** Einsatz, wenn Operationen auf einer Gruppe von Objekten durchgeführt werden sollen, ohne ihre Klassen zu ändern.  
**Beispiel:** Ein Kompilierungs-Tool, das unterschiedliche Operationen auf einem AST (Abstract Syntax Tree) ausführt.

### 19 Template Method (Vorlagenmethode):
**Was:** Definiert das Grundgerüst eines Ablaufs, der in speziellen Fällen angepasst werden kann.  
**Wozu:** Anwenden, wenn der grundlegende Rahmen eines Algorithmus festgelegt und bestimmte Schritte in Unterklassen spezialisiert werden sollen.  
**Beispiel:** Eine Software-Bibliothek, die eine allgemeine Methode zum Ausführen von Algorithmen mit bestimmten Schritten bereitstellt, die in Unterklassen angepasst werden können.

### 20 Chain of Responsibility (Verantwortungskette):
**Was:** Lässt eine Anfrage entlang einer Kette von Bearbeitern wandern, bis sie verarbeitet wird.  
**Wozu:** Geeignet, wenn eine Anfrage durch eine Kette von Bearbeitern gehen soll, wobei jeder Bearbeiter die Möglichkeit hat, die Anfrage zu verarbeiten oder weiterzugeben.  
**Beispiel:** Ein Support-Ticket-System, das Anfragen durch verschiedene Bearbeitungsstufen leitet.
