# Sistema de Agencia de Viajes

![commits](https://badgen.net/github/commits/UR-CC/lp2-taller1?icon=github) 
![last_commit](https://img.shields.io/github/last-commit/UR-CC/lp2-taller1)

- ver [badgen](https://badgen.net/) o [shields](https://shields.io/) para otros tipos de _badges_

## Autor
  Jaider francisco Asprilla Reyes 
- [@estudiante](https://github.com/Jaider77)
## estructura del proyecto 
.
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── hotel.py
│   │   ├── habitacion.py
│   │   ├── cliente.py
│   │   ├── reserva.py
│   │   ├── comentario.py
│   │   ├── temporada.py
│   │   ├── oferta.py
│   ├── routes/
│   │   ├── main.py
│   │   └── __init__.py
│   ├── templates/
│   │   └── ...
│   └── static/
│       └── ...
└── run.py

## Descripción del Proyecto

# siatema de agencias de viaje 
El Sistema de Reservas Hoteleras es una aplicación que permite a los usuarios buscar, comparar y reservar habitaciones en un hotel. El sistema gestiona el registro del hotel, habitaciones, ofertas, calendarios de disponibilidad, políticas de pago y cancelación, así como la calificación y comentarios de los clientes. Facilita la administración del hotel y mejora la experiencia de los huéspedes al ofrecer información detallada y procesos de reserva eficientes.

## Documentación

Revisar la documentación en [`./docs`](./docs)

### Requerimientos

### Módulo de Hoteles y Habitaciones

- **R1:** El sistema debe permitir **registrar un nuevo hotel** con su nombre, dirección, teléfono, correo electrónico, ubicación geográfica, descripción de servicios y fotos.
- **R2:** El sistema debe permitir **definir y aplicar ofertas especiales** para hoteles, como promociones por temporada o paquetes.
- **R3:** El sistema debe permitir **registrar cada habitación** de un hotel, incluyendo su tipo, descripción, precio base, servicios incluidos, capacidad y fotos.
- **R4:** El sistema debe permitir **establecer el estado** de un hotel o habitación como "activo" o "inactivo" (por mantenimiento, limpieza, o reformas). Solo los activos podrán ser reservados.
- **R5:** El sistema debe permitir **ajustar el precio** de una habitación según la cantidad de personas (sin exceder la capacidad) y la temporada.

---

### Módulo de Clientes y Reservas

- **R6:** El sistema debe permitir **registrar a un cliente** con su nombre completo, número de teléfono, correo electrónico y dirección.
- **R7:** El sistema debe permitir a los clientes **buscar habitaciones** por fecha, ubicación, calificación y precio, incluso combinando varios criterios.
- **R8:** El sistema debe permitir al cliente **ver una descripción detallada** de la habitación, sus servicios, fotos y, muy importante, las calificaciones y comentarios de otros huéspedes.
- **R9:** El sistema debe permitir **formalizar una reserva** una vez que el pago sea confirmado, asignando esa habitación a un cliente en fechas específicas.
- **R10:** El sistema debe permitir **gestionar las diferentes políticas de pago** (pago por adelantado o al llegar) y de cancelación (con o sin penalidad).

---

### Módulo de Calificaciones y Comentarios

- **R11:** El sistema debe permitir que los clientes **dejen comentarios y una calificación** sobre su experiencia después de su estancia.
- **R12:** El sistema debe permitir **calcular una calificación promedio** para cada habitación a partir de los comentarios.
- **R13:** El sistema debe permitir **calcular una calificación promedio general** para el hotel a partir de todas las calificaciones de sus habitaciones.

---

### Requerimientos Transversales

- **R14:** El sistema debe permitir tener un **calendario detallado** para cada habitación que muestre su disponibilidad y las fechas de ocupación.
- **R15:** El sistema debe permitir **establecer calendarios de temporada** (alta, baja) a nivel regional y para cada hotel, lo cual afectará los precios automáticamente.
- **R16:** El sistema debe permitir operar con una **interfaz de usuario intuitiva y segura** para proteger la información de los clientes y las transacciones.


 Crear el diagrama de clases:

![Diagrama de Clases](./docs/diagramas.png)


### Tárifas

|destino|pasajes|silver|gold|platinum|
|:---|---:|---:|---:|---:|
|Aruba|418|134|167|191|
|Bahamas|423|112|183|202|
|Cancún|350|105|142|187|
|Hawaii|858|210|247|291|
|Jamaica|380|115|134|161|
|Madrid|496|190|230|270|
|Miami|334|122|151|183|
|Moscu|634|131|153|167|
|NewYork|495|104|112|210|
|Panamá|315|119|138|175|
|Paris|512|210|260|290|
|Rome|478|184|220|250|
|Seul|967|205|245|265|
|Sidney|1045|170|199|230|
|Taipei|912|220|245|298|
|Tokio|989|189|231|255|

# Activacion del entorno 
.venv/Scripts/activate

## Instalación

TODO: Corregir la explicación de la instalación - Morbi quam lectus, tempus sit amet mi non, facilisis dignissim erat. Aenean tortor libero, rhoncus eu eleifend ut, volutpat id nisi. Ut porta eros at ante rutrum pharetra. Integer nec nulla dictum, vestibulum ligula id, hendrerit ex. Morbi eget tortor metus.

1. Clonar el proyecto
```bash
git clone https://github.com/UR-CC/lpa1-taller-requerimientos.git
```

2. Crear y activar entorno virtual
```bash
cd lpa1-taller-requerimientos
python -m venv venv
venv/bin/activate
```

3. Instalar librerías y dependencias
```bash
pip install -r requirements.txt
```
    
## Ejecución

TODO: Corregir la explicación de la ejecución - Maecenas sed lorem at arcu varius mollis. Sed eleifend nulla ut blandit interdum. Donec sollicitudin nunc at orci facilisis dignissim. Donec at arcu luctus, commodo magna eget, blandit leo.

1. Ejecutar el proyecto
```bash
cd lpa1-taller-requerimientos
python app.py
```

