from app import db

class Habitacion(db.Model):
    """
    Modelo de la clase Habitacion.
    Contiene la información detallada de cada habitación, su estado y
    relación con un hotel.
    """
    __tablename__ = 'habitacion'

    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.Text)
    precio_base = db.Column(db.Float, nullable=False)
    capacidad = db.Column(db.Integer, nullable=False)
    fotos = db.Column(db.String(255))
    activo = db.Column(db.Boolean, default=True)
    calificacion_promedio = db.Column(db.Float, default=0.0)
    
    # Relación con Hotel
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'), nullable=False)
    
    # Relación con otras tablas
    reservas = db.relationship('Reserva', backref='habitacion', lazy=True)
    comentarios = db.relationship('Comentario', backref='habitacion', lazy=True)

    def __repr__(self):
        """Representación del objeto Habitacion."""
        return f'<Habitacion {self.tipo} en Hotel {self.hotel.nombre}>'