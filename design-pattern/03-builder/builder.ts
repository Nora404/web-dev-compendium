// Produktklasse
class Product {
    private teil1: string;
    private teil2: string;

    constructor(teil1: string, teil2: string) {
        this.teil1 = teil1;
        this.teil2 = teil2;
    }

    getTeil1(): string {
        return this.teil1;
    }

    getTeil2(): string {
        return this.teil2;
    }
}

// Builder-Klasse
abstract class Builder {
    protected teil1: string = "";
    protected teil2: string = "";

    setTeil1(teil1: string): this {
        this.teil1 = teil1;
        return this;
    }

    setTeil2(teil2: string): this {
        this.teil2 = teil2;
        return this;
    }

    abstract build(): Product;
}

// Konkreter Builder
// Der Konkrete Builder ist eine Implementierung des Builder-Interfaces. 
// Er definiert die spezifische Art und Weise, wie die Teile eines Produkts erstellt und zusammengefügt werden.
// Er besitzt Methoden zum Setzen der einzelnen Teile des Produkts und eine build-Methode, die das endgültige Produkt zusammenbaut und zurückgibt.
class KonkreterBuilder extends Builder {
    build(): Product {
        return new Product(this.teil1, this.teil2);
    }
}

// Director-Klasse
// Der Director steuert den Bauprozess. Er kennt die Reihenfolge, in der die Bauteile zu einem vollständigen Produkt zusammengesetzt werden sollen.
// Der Director verwendet den Builder, um die notwendigen Bauteile des Produkts zu erstellen und zusammenzusetzen. 
// Er gibt dem Builder Anweisungen, was und wie etwas gebaut werden soll, kennt aber die Details der Konstruktion nicht.
class Director1 {
    buildProdukt(builder: Builder): Product {
        return builder.setTeil1("Teil 1").setTeil2("Teil 2").build();
    }
}

// Diese Klasse erlaubt das Übergeben von Parametern
class Director2 {
    buildProdukt(builder: Builder, teil1: string, teil2: string): Product {
        return builder.setTeil1(teil1).setTeil2(teil2).build();
    }
}

// Beispielverwendung
const director1 = new Director1();
const product1 = director1.buildProdukt(new KonkreterBuilder());

// Beispiel mit eingenen Parametern
const builder = new KonkreterBuilder();
const director2 = new Director2();
const product2 = director2.buildProdukt(builder, "Benutzerdefiniertes Teil 1", "Benutzerdefiniertes Teil 2");

// Es wird eine Instanz des Konkreten Builders und des Directors erstellt. 
// Der Builder kennt alle notwendigen Details, um die Teile des Produkts zu erstellen und zusammenzusetzen.
// Diese Builder-Instanz wird dann dem Director übergeben. 

// Der Client ruft den Director auf
// Der Director ruft die Methoden des Builders in einer bestimmten Reihenfolge auf, um das Produkt Schritt für Schritt zu erstellen.
// Der Director nutzt also die Schnittstelle des Builders, um das Produkt zu erstellen, ohne die Komplexität der Produktzusammensetzung zu kennen.
// Nachdem der Director den Bauprozess abgeschlossen hat, ruft er die build-Methode des Builders auf, um das fertige Produkt zu erhalten.

