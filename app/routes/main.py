# app/routes/main.py

from flask import Blueprint, request, jsonify
from app import db
from app.models import cliente
from app.models.hotel import Hotel
from app.models.habitacion import Habitacion
from app.models.cliente import Cliente
from app.models.reserva import Reserva
from app.models.comentario import Comentario

main = Blueprint('main', __name__)
# --- OPERACIONES CRUD PARA HOTELES ---

# Crear un hotel (CREATE)
@main.route('/hotel', methods=['POST'])
def crear_hotel():
    data = request.json
    nuevo_hotel = Hotel(
        nombre=data['nombre'],
        direccion=data['direccion'],
        telefono=data['telefono'],
        correo=data['correo'],
        ubicacion_geografica=data.get('ubicacion_geografica'),
        descripcion_servicios=data.get('descripcion_servicios')
    )
    db.session.add(nuevo_hotel)
    db.session.commit()
    return jsonify({'mensaje': 'Hotel creado con éxito'}), 201

# Obtener todos los hoteles (READ ALL)
# filepath: c:\Users\jaspr\OneDrive\Desktop\proyectos\lpa1-taller-requerimientos\app\routes\main.py
# ...existing code...
# In app/routes/main.py
@main.route('/test')
def test_route():
    return 'Test route is working!', 200

@main.route('/', methods=['GET'])
def home():
    return "API de Sistema de Reservas Hoteleras funcionando", 200
# ...existing code...
@main.route('/hoteles', methods=['GET'])
def obtener_hoteles():
    hoteles = Hotel.query.all()
    lista_hoteles = []
    for hotel in hoteles:
        lista_hoteles.append({
            'id': hotel.id,
            'nombre': hotel.nombre,
            'direccion': hotel.direccion,
            'calificacion': hotel.calificacion_promedio
        })
    return jsonify(lista_hoteles), 200

# Obtener un hotel por ID (READ ONE)
@main.route('/hotel/<int:hotel_id>', methods=['GET'])
def obtener_hotel(hotel_id):
    hotel = Hotel.query.get_or_404(hotel_id)
    return jsonify({
        'id': hotel.id,
        'nombre': hotel.nombre,
        'direccion': hotel.direccion,
        'descripcion_servicios': hotel.descripcion_servicios,
        'calificacion': hotel.calificacion_promedio
    }), 200

# --- OPERACIONES CRUD PARA RESERVAS --- 
# Crear una reserva (CREATE)
@main.route('/reserva', methods=['POST'])
def crear_reserva():
    data = request.json
    required_fields = ['cliente_id', 'habitacion_id', 'fecha_entrada', 'fecha_salida', 'precio_total']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Faltan datos obligatorios'}), 400
    cliente = Cliente.query.get_or_404(data['cliente_id'])
    habitacion = Habitacion.query.get_or_404(data['habitacion_id'])
    # Primero, se buscan el cliente y la habitación
    cliente = Cliente.query.get_or_404(data['cliente_id'])
    habitacion = Habitacion.query.get_or_404(data['habitacion_id'])

    # Luego, se crea la instancia de la reserva
    nueva_reserva = Reserva(
    cliente_id=cliente.id,
    habitacion_id=habitacion.id,
    fecha_entrada=data['fecha_entrada'],
    fecha_salida=data['fecha_salida'],
    precio_total=data['precio_total']
    )
    db.session.add(nueva_reserva)
    db.session.commit()
    return jsonify({'mensaje': 'Reserva creada con éxito'}), 201


@main.route('/cliente', methods=['POST'])
def crear_cliente():
    data = request.json
    nuevo_cliente = Cliente(
        nombre_completo=data['nombre_completo'],
        telefono=data.get('telefono'),
        correo=data['correo'],
        direccion=data.get('direccion')
    )

    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify({'mensaje': 'Cliente creado con éxito', 'id': nuevo_cliente.id}), 201

@main.route('/clientes', methods=['GET'])
def obtener_clientes():
    clientes = Cliente.query.all()
    lista_clientes = []
    for cliente in clientes:
        lista_clientes.append({
            'id': cliente.id,
            'nombre_completo': cliente.nombre_completo,
            'correo': cliente.correo,
            'telefono': cliente.telefono,
            'direccion': cliente.direccion
        })
    return jsonify(lista_clientes), 200
# --- OPERACIONES CRUD PARA COMENTARIOS ---

# Crear un comentario (CREATE)
@main.route('/comentario', methods=['POST'])
def crear_comentario():
    data = request.json
    nuevo_comentario = Comentario(
        calificacion=data['calificacion'],
        texto=data.get('texto'),
        hotel_id=data.get('hotel_id'),
        habitacion_id=data.get('habitacion_id')
    )
    db.session.add(nuevo_comentario)
    db.session.commit()
    return jsonify({'mensaje': 'Comentario registrado con éxito'}), 201