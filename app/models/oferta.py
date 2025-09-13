from app import db
import datetime

class Oferta(db.Model):
    """
    Modelo de la clase Oferta.
    Representa las promociones especiales que pueden ser aplicadas.
    """
    __tablename__ = 'oferta'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text)
    descuento = db.Column(db.Float, nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)

    # Relación con Hotel
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'))

    def __repr__(self):
        """Representación del objeto Oferta."""
        return f'<Oferta {self.nombre}>'