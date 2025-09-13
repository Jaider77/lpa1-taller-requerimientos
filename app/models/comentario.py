from app import db

class Comentario(db.Model):
    """
    Modelo de la clase Comentario.
    Permite a los clientes calificar y comentar su experiencia.
    Se puede asociar a un hotel o a una habitación específica.
    """
    __tablename__ = 'comentario'

    id = db.Column(db.Integer, primary_key=True)
    calificacion = db.Column(db.Integer, nullable=False) # Valor numérico, por ejemplo 1-5
    texto = db.Column(db.Text)
    
    # Relaciones con Hotel y Habitacion
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'))
    habitacion_id = db.Column(db.Integer, db.ForeignKey('habitacion.id'))

    def __repr__(self):
        """Representación del objeto Comentario."""
        return f'<Comentario de calificacion {self.calificacion}>'