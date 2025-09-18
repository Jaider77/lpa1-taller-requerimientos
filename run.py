from app import app, db

# Importamos los modelos para que SQLAlchemy los reconozca
from app.models import hotel, habitacion, cliente, reserva, comentario, temporada, oferta

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("¡Tablas de la base de datos creadas!")