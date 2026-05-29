# 🌐 Matemáticas que resuelven problemas reales

**Fibonacci y Números Primos aplicados a la vida cotidiana**

* **Estudiante:** Meybol Yara Gutierrez Calle
* **Proyecto:** Desafío Web - Ciencias Exactas y Desarrollo de Software

---

##  Descripción del proyecto

Este proyecto contiene tres herramientas interactivas que resuelven problemas reales del contexto de Bolivia y el mundo utilizando la **serie de Fibonacci** y los **números primos**. El sitio web está diseñado de forma modular, responsiva y organizada para ofrecer una experiencia intuitiva a través de formularios dinámicos y procesamiento de datos en tiempo real mediante JavaScript puro.

---

##  Ejercicios y Soluciones Incluidos

### 1. 💧 Control Inteligente de Agua
* **Problema:** Escasez crónica y desperdicio de agua potable en La Paz y las regiones del Altiplano boliviano.
* **Solución:** Proyecta estimaciones de consumo hídrico diario basándose en el crecimiento progresivo de la **serie de Fibonacci** y emite una alerta si el total resultante equivale a un **número primo** (utilizado como patrón indicador de posibles fugas ocultas o derroches desmedidos).
* **Ruta de Archivos:** `html/agua.html` | `css/agua.css` | `js/agua.js`

### 2. 📡 Optimización de Redes WiFi
* **Problema:** Alta interferencia, saturación del espectro radioeléctrico y lentitud en conexiones de red inalámbricas domésticas y comerciales.
* **Solución:** Analiza y recomienda automáticamente los canales de transmisión basados exclusivamente en **números primos** ($2, 3, 5, 7, 11, 13$) para la banda de 2.4 GHz, ya que reducen drásticamente el solapamiento y la colisión de paquetes de datos con redes vecinas.
* **Ruta de Archivos:** `html/wifi.html` | `css/wifi.css` | `js/wifi.js`

### 3. 🌆 Crecimiento Poblacional Urbano
* **Problema:** Crecimiento desordenado y exponencial de las manchas urbanas, lo que colapsa el tráfico vehicular, el acceso a viviendas dignas y los servicios básicos.
* **Solución:** Simula y proyecta el aumento demográfico de habitantes año tras año utilizando los términos de la **serie de Fibonacci** como factor multiplicador o modelo predictivo de expansión orgánica vegetal/humana.
* **Ruta de Archivos:** `html/poblacion.html` | `css/poblacion.css` | `js/poblacion.js`

---

##  Modelado Matemático Aplicado

| Concepto | Aplicación Práctica en el Proyecto |
| :--- | :--- |
| **Fibonacci** | Modela matemáticamente el crecimiento exponencial o progresivo de variables (consumo acumulado de agua y tasas de población histórica). Permite proyectar escenarios a corto y mediano plazo sin necesidad de funciones complejas. |
| **Números Primos** | Actúan como filtros lógicos de seguridad y distribución de frecuencias. Identifican anomalías puntuales en sistemas lineales (alertas de fugas de agua) y optimizan la asignación de canales inalámbricos limpios de solapamiento técnico. |

---

##  Estructura del Repositorio

De acuerdo al árbol de directorios de Visual Studio Code, el proyecto se encuentra estructurado de la siguiente manera:

```text
desafio-fibonacci-primos/
│
├── index.html               # Portal principal de bienvenida y selector de módulos
├── README.md                # Documentación del proyecto (este archivo)
│
├── html/                    # Estructuras de las páginas interactivas
│   ├── agua.html
│   ├── poblacion.html
│   └── wifi.html
│
├── css/                     # Hojas de estilo y diseño responsivo para cada módulo
│   ├── agua.css
│   ├── estilo.css           # Estilos generales o del index principal
│   ├── poblacion.css
│   └── wifi.css
│
└── js/                      # Lógica de programación matemática en JavaScript puro
    ├── agua.js
    ├── poblacion.js
    └── wifi.js
