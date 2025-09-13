from app import db
import datetime

class Temporada(db.Model):
    """
    Modelo de la clase Temporada.
    Define los períodos de tiempo que afectan los precios de las habitaciones.
    """
    __tablename__ = 'temporada'

    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(50), nullable=False) # Ejemplo: 'Alta', 'Baja'
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)

    # Relación con Hotel (opcional, si es una temporada específica de un hotel)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'))

    def __repr__(self):
        """Representación del objeto Temporada."""
        return f'<Temporada {self.tipo}>'