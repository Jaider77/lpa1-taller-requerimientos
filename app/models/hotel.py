from app import db
from .oferta import Oferta
from .temporada import Temporada

class Hotel(db.Model):
    """
    Modelo de la clase Hotel.
    Representa a un hotel en la base de datos con sus atributos básicos,
    servicios, ubicación y relaciones con otras entidades.
    """
    __tablename__ = 'hotel'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(255), nullable=False)
    telefono = db.Column(db.String(20))
    correo = db.Column(db.String(120))
    ubicacion_geografica = db.Column(db.String(255))
    descripcion_servicios = db.Column(db.Text)
    fotos = db.Column(db.String(255)) # Asumimos una URL o una lista serializada
    activo = db.Column(db.Boolean, default=True)
    calificacion_promedio = db.Column(db.Float, default=0.0)

    # Relaciones
    habitaciones = db.relationship('Habitacion', backref='hotel', lazy=True)
    comentarios = db.relationship('Comentario', backref='hotel', lazy=True)
    temporadas = db.relationship('Temporada', backref='hotel', lazy=True)
    ofertas_especiales = db.relationship('Oferta', backref='hotel', lazy=True)

    def __repr__(self):
        """Representación del objeto Hotel."""
        return f'<Hotel {self.nombre}>'