Unsere Datenbank enthält über **8000 Flughäfen** und ist [Open-Source](https://ourairports.com/data/). Anhand der Längen- und Breitengrade der Flughäfen berechnen wir mithilfe der [Haversine Formel](https://en.wikipedia.org/wiki/Haversine_formula) die Distanz.

Unsere Heuristik zur **Emissionsberechnung** basiert auf den [Emissionsfaktoren](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2017) des britischen Department for Environment, Food & Rural Affairs ("Defra").

Folgende Faktoren berücksichtigen wir unter anderem:

- **Uplift**: 8% Aufschlag auf Entfernung, da Flugzeuge nie die direkte Strecke fliegen. Oft ist es so, dass sie vor der Landung noch Warteschleifen drehen müssen, bis sie eine Landeerlaubnis bekommen. So entstehen zusätzliche Emissionen.
- **Radiative Forcing**: 90% Aufschlag, weil beim Fliegen Emissionen in einer höheren Atmosphärenschicht ausgestoßen werden, wo sie einen stärkeren Effekt auf die Umwelt haben.
- **Well-to-tank**: 10% Aufschlag für Produktion und Transport von Treibstoff von der Quelle über die Raffinerie in den Tank.

Auch die **Sitzklasse** hat indirekt Einfluss auf die individuellen Emissionen. Es würden mehr Menschen in ein Flugzeug passen, wenn alle Economy Class fliegen würden. Somit würde die persönliche Emission sinken.

Die Defra-Faktoren beziehen sich auf ein ein typisches Flugzeug mit jeweils durchschnittlicher Passagierbesatzung.
