# ahorrADAs
## 👍 Criterios de aceptación

Debe respetar el diseño general dado en este  [ejemplo](https://frontend-proyecto-ahorradas.adaitw.org/). Pueden modificarse a gusto colores, fondo, fuentes e íconos
- Debe respetar las interacciones y flujo de pantallas
- Debe ser responsive
- Debe cumplir con las funcionalidades principales listadas en la sección siguiente
- Debe hacer hacer uso de un framework CSS (sólo deben agregarse estilos propios si no hay forma de lograrlo con el framework)
- Debe estar deployado y ser accesible desde una dirección web
- No se debe trabajar en la rama main. En main sólo van a mergearse las demás ramas, por lo que cada commit de main debería ser el merge de una branch de una funcionalidad terminada
Cada funcionalidad que se agregue debe hacerse mediante un PR (Pull Request)
##  🎛 Funcionalidades principales
- Se debe poder agregar, editar y eliminar operaciones
- Se debe poder agregar, editar y eliminar categorías
- Cada operación debe contar con: Descripción, Monto, Tipo de operación (gasto o ganancia), Categoría a la que pertenece, Fecha de realización
- Cada categoría debe contar con un nombre
- Al eliminar una categoría, se deben eliminar todas las operaciones asociadas a ella
- Se debe poder filtrar las operaciones realizadas por: Tipo de operación (gasto, ganancia o ambas), Categoría a la que pertenece (una en específico o cualquiera),
Fecha de realización (a partir de la fecha seleccionada)
Se debe poder ordernar las operaciones realizadas por: Fecha de realización (más y menos reciente), Monto (mayor y menor), Descripción (en orden alfabético creciente y decreciente),
Se debe poder obtener los siguientes reportes. Un resumen con: Categoría con mayor ganancia, Categoría con mayor gasto, Categoría con mayor balance, Mes con mayor ganancia, Mes con mayor gasto,
Totales (gastos, ganancias y balances) por categoría, Totales (gastos, ganancias y balances) por mes
- Se deben guardar los datos en el almacenamiento local del navegador

  #### Realizado por: [Corina Talledo](https://github.com/CorinaTalledo) y [Paloma Contreras](https://github.com/P-Contreras)
