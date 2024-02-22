### Grundstruktur und Aufbau ###
| Tag             | Sub-Tag | Beschreibung                                                      |
| --------------- | ------- | ----------------------------------------------------------------- |
| `<article>`     |         | Umfasst einen kleinen wiederholenden Bereich wie Blogposts        |
| `<aside>`       |         | Bereich außerhalb des Hauptteils, meist seidlich                  |
| `<base href=">` |         | Gibt im <head> eine URL an für alle relativen URLs im Document    |
| `<body>`        |         | Der Dokumenten-Body Der Hauptteil der Seite                       |
| `<div>`         |         | Ein Container der über die gesamte Breite des Elternelements geht |
| `<footer>`      |         | Der unterste Bereich der Seite                                    |
| `<head>`        |         | Beinhaltet die Metadaten einer Seite                              |
| `<header>`      |         | Erster Bereich eines Containers oder der Seite                    |
| `<html>`        |         | Umfasst die gesamte HTML-Seite                                    |
| `<link>`        |         | Beschreibt Beziehungen zu anderen Resourcen wie css Dateien       |
| `<main>`        |         | Ein Container für den Hauptteil der Seite                         |
| `<meta>`        |         | Innerhalb von <head> beschreibt Metadaten                         |
| `<nav>`         |         | Ein Container der für Navigations-Links gedacht ist               |
| `<noscript>`    |         | Inhalt der gezeigt wird, wenn Javascript nicht unterstüzt wird    |
| `<section>`     |         | Container für einen thematisch zusammenhängenden Bereich          |
| `<span>`        |         | Ein eingebetteter (inline) Container für kleinere Teile           |
| `<title>`       |         | Innerhalb von <head> Wird im Browser als Tap-Name angezeigt       |


### Textformatierung ###
| Tag            | Sub-Tag     | Beschreibung                                                 |
| -------------- | ----------- | ------------------------------------------------------------ |
| `<b> <strong>` |             | Der Text wird "fett" geschrieben                             |
| `<dl>`         | `<dt> <dd>` | Beschreibungsliste                                           |
| `<del> <s>`    |             | Text wird durchgestrichen                                    |
| `<em> <i>`     |             | Der Text wird in italic geschrieben                          |
| `<h1>-<h6>`    |             | Überschriften in verschiedenen Größen                        |
| `<ins> <u>`    |             | Text wird unterstrichen                                      |
| `<mark>`       |             | Text wird mit einer Hintergundfarbe markiert                 |
| `<pre>`        |             | Der Text wird genau so dargestellt wie er im HTML Code steht |
| `<small>`      |             | Texte innerhalb werden kleiner geschrieben                   |
| `<sub>`        |             | Der Text wird klein und herabgestellt geschrieben            |
| `<sup>`        |             | Der Text wird klein und hochgestellt geschrieben             |
| `<wbr>`        |             | Markiert Stelle fals der Text einen Zeilenumbruch braucht    |

<!-- Inhalts Strukturierung

<br>	Zeilenumbruch
<caption>	Innerhalb von <table> Eine Überschrift für Tabellen
<details>	Inhalt kann per klick auf- und zugeklappt werden. Inhalt von <summary> bleibt stehn, auf ihn wird geklickt
  <summary>
<fieldset>	Zeichnet einen Rahmen um seinen Inhalt, <legend> ist die Überschrieft welche auf der Rahmenlinie steht
  <legend>
<figure>	Ein Container für ein <img> welches mit <figcaption> eine Beschreibung unterhalb des Bildes bekommt
  <figcaption>
<form>	Container eines Formulars. Es hat meist noch die Attribute action(wo wird der Inhalt hingeschickt) und method (Wie wird er geschickt)
  ...
<hr>	Eine einfache horizontale Linie
<ol>	Ordentliche Liste, sie ist Nummerriert <li> sind die einzelnen Listenelemente
  <li>
<ul> <menu>	Unordentliche Liste, alle Einträge <li> haben das gleiche Symbol
  <li>
<p>	Umfasst ein Text der einen Absatz darstellt
<table>	Tabellen, wobei <tr> für die Zeilen steht und <td> für die Zellen. Es gibt mehrere Tags mitdenen Tabellen weiter strukturiert werden können, wie <thead> <tbody> <tfoot> ...
  <tr>
    <td>
<table>	Mit <th> in Tabellen kann eine visuell erkennbare "erste Zeile" beschrieben werden, um z.B. Überschriften für Spalten darzustellen. 
  <tr>
    <th>

Formulare

<button>	Erstellt einen klickbaren Button/Schaltfläche
<input type=">	Eingabefeld, wobei type Beschreibt was eingegeben werden kann
<label for=">	Text der mit einem Formularfeld über die id verknüpft werden kann
<select>	Ein Dropdown-Menü, wobei die <option> die Einträge sind. Um sie auswerten zu können braucht <option> das Attribut 'value'
  <option>
<optgroup>	Einträge aus dem <select> Menü lassen sich mit <optgroub> gruppieren. Die Gruppe bekommt mit dem Attribut 'lable' eine Überschrift
  <option>
<output for=">	Repräsentiert das Ergebnis einer Berechnung, wird mit id verknüpft
<textarea>	Eingabefeld das aus mehreren Zeilen Text bestehen kann

Eingebettete Informationen

<map>	Beschreibt einen Klickbaren bereich in einem <img> 
  <area>	Es können mehrere <area> in einer <map> erstellt werden
<audio>	Einbinden von Audiodateien. Es können mehrere <source> angegeben werden. Der Browser nimmt das erste welches er Unterstützt
  <source>
<canvas>	Eine Leinwand die mit JavaScript gefüllt werden kann
<dialog>	Ein Dialogfenster das mit dem Attribut open geöffnet wird
<iframe>	Dokumente oder HTML-Seiten in die aktuelle Seite einbinden
<img src=">	Einbinden eines Bildes, sollte das Attribut 'alt' haben
<object>	Bettet Externe Resourcen ein die mit <param> weiter definiert werden. Es ist aber besser Tags wie <img> oder <iframe> zu nutzten 
  <param>
<picture>	Bietet die Möglichkeit verschiedene Resourcen bei bestimmten bedingungen für ein Bild zu nutzten
  <source>
  <img>
<script>	Beinhaltet Javascript
<style>	Innerhalb werden css Regeln definiert
<svg>	Innerhalb eines <svg> werden Pfade (Vektorgrafiken) beschrieben  
<template>	HTML-Code der beim Laden nicht gerendert wird. Mit Javascript kann das Template beliebig oft in die Seite eingefügt werden
<video>	Bettet Videos ein, wobei mehrere Quellen angegeben werden können. Der Browser nimmt das erste welches er unterstützt
  <source>

Semantik

<bdi>	Bidirectional Isolation, umschließt Texte die andere Zeichen haben
<code> <samp>	Text der Computercode darstellt, wird in monospace geschrieben 
<kbd>	Text der Tastendrücke darstellt, wird in italic geschrieben
<abbr title="><dfn title=">	Markiert einen Text/Wort der mit title näher beschrieben wird zum Beispiel wenn es um Abkürzungen wie 'HTML' geht
<blockquote>	Markiert ein Zitat <blockquote> ist für längere Zitate während <q> für Einzeiler genutzt wird
<q>
<time>	Markiert eine bestimmte Zeit oder Datum
<var>	Text der Variabeln darstellt, wird in italic geschrieben

Restekiste

<a href="">	Hyperlink führt zu einer anderen Seite oder Stelle
<!- -->	Kommentar im Code
<meter>	Repräsentiert ein Skalarwert inform eines ausgefüllten Balkens
<progress>	Repräsentiert einen Aufgabenfortschritt inform eines Balkens
     -->
