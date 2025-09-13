´´´
mermaid

classDiagram
    direction LR

    class Hotel {
        +String nombre
        +String direccion
        +String telefono
        +String correo
        +String ubicacionGeografica
        +String descripcionServicios
        +List<String> fotos
        +Boolean activo
        +double calificacionPromedio
        +List<Oferta> ofertasEspeciales
    }

    class Habitacion {
        +String tipo
        +String descripcion
        +double precioBase
        +int capacidad
        +List<String> fotos
        +Boolean activo
        +double calificacionPromedio
        +Map<Date, Boolean> calendarioDisponibilidad
    }

    class Cliente {
        +String nombreCompleto
        +String telefono
        +String correo
        +String direccion
    }

    class Reserva {
        +Date fechaEntrada
        +Date fechaSalida
        +double precioTotal
        +String estado
        +String politicaPago
        +String politicaCancelacion
        +double penalidadCancelacion
    }

    class Comentario {
        +int calificacion
        +String texto
    }

    class Temporada {
        +Date fechaInicio
        +Date fechaFin
        +String tipo
    }

    class Oferta {
        +String nombre
        +String descripcion
        +double descuento
        +Date fechaInicio
        +Date fechaFin
    }

    Hotel "1" -- "0..*" Habitacion : tiene >
    Hotel "1" -- "0..*" Comentario : recibeComentariosDe >
    Hotel "1" -- "0..*" Temporada : tiene >
    
    Habitacion "1" -- "0..*" Comentario : recibeComentariosDe >
    
    Cliente "1" -- "0..*" Reserva : realiza >
    Reserva "1" -- "1" Habitacion : esDe >
    Reserva "1" -- "1" Cliente : esPara >


´´´
