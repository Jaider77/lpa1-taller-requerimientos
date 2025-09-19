from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # Importar CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)  # Habilitar CORS para la aplicación

# Importar y registrar el blueprint de las rutas
from .routes.main import main
app.register_blueprint(main)

# Importar los modelos para que SQLAlchemy los reconozca
from app.models import hotel, habitacion, cliente, comentario, temporada, oferta
from app.models import reserva
