from app import db

class Cliente(db.Model):
    """
    Modelo de la clase Cliente.
    Almacena los datos personales del cliente que realiza las reservas.
    """
    __tablename__ = 'cliente'

    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20))
    correo = db.Column(db.String(120), unique=True, nullable=False)
    direccion = db.Column(db.String(255))

    # Relación con la tabla Reserva
    reservas = db.relationship('Reserva', backref='cliente', lazy=True)

    def __repr__(self):
        """Representación del objeto Cliente."""
        return f'<Cliente {self.nombre_completo}>'