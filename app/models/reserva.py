from app import db
import datetime

class Reserva(db.Model):
    """
    Modelo de la clase Reserva.
    Une a un cliente con una habitación para un período de tiempo
    determinado, registrando los detalles de la transacción.
    """
    __tablename__ = 'reserva'

    id = db.Column(db.Integer, primary_key=True)
    fecha_entrada = db.Column(db.Date, nullable=False)
    fecha_salida = db.Column(db.Date, nullable=False)
    precio_total = db.Column(db.Float, nullable=False)
    estado = db.Column(db.String(50), default='Pendiente') # Ejemplo: Pendiente, Confirmada, Cancelada
    politica_pago = db.Column(db.String(50))
    politica_cancelacion = db.Column(db.String(50))
    penalidad_cancelacion = db.Column(db.Float)

    # Relaciones con Cliente y Habitacion
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    habitacion_id = db.Column(db.Integer, db.ForeignKey('habitacion.id'), nullable=False)

    def __repr__(self):
        """Representación del objeto Reserva."""
        return f'<Reserva de habitacion {self.habitacion_id} para cliente {self.cliente_id}>'