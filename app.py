# TODO: desarrollar el sistema
from app import app, db

# Importar cada clase desde su módulo
from app.models.hotel import Hotel
from app.models.habitacion import Habitacion
from app.models.cliente import Cliente
from app.models.reserva import Reserva
from app.models.comentario import Comentario
from app.models.temporada import Temporada
from app.models.oferta import Oferta

# O una forma más concisa:
# from app.models import hotel, habitacion, cliente, reserva, ...
