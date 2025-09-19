# app/routes/main.py
from flask import request, jsonify
import datetime
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

# --- OPERACIONES CRUD PARA HABITACIONES ---
@main.route('/habitacion', methods=['POST'])
def crear_habitacion():
    data = request.json
    hotel_id = data.get('hotel_id')
    if hotel_id is None:
        return jsonify({'error': 'hotel_id es requerido'}), 400

    hotel = Hotel.query.get_or_404(hotel_id)
    nueva_habitacion = Habitacion(
        tipo=data['tipo'],
        precio_base=data['precio_base'],
        capacidad=data['capacidad'],
        hotel=hotel
    )
    db.session.add(nueva_habitacion)
    db.session.commit()
    return jsonify({'mensaje': 'Habitacion creada con exito', 'id': nueva_habitacion.id}), 201

@main.route('/habitaciones', methods=['GET'])
def obtener_habitaciones():
    habitaciones = Habitacion.query.all()
    lista_habitaciones = []
    for habitacion in habitaciones:
        lista_habitaciones.append({
            'id': habitacion.id,
            'tipo': habitacion.tipo,
            'precio_base': habitacion.precio_base,
            'capacidad': habitacion.capacidad,
            'hotel_id': habitacion.hotel_id
        })
    return jsonify(lista_habitaciones), 200


# --- OPERACIONES CRUD PARA RESERVAS --- 
@main.route('/reserva', methods=['POST'])
def crear_reserva():
    data = request.json
    
    # Valida los campos obligatorios
    required_fields = ['cliente_id', 'habitacion_id', 'fecha_entrada', 'fecha_salida', 'precio_total']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    # Convierte las fechas de string a objetos date de Python
    try:
        fecha_entrada_obj = datetime.datetime.strptime(data['fecha_entrada'], '%Y-%m-%d').date()
        fecha_salida_obj = datetime.datetime.strptime(data['fecha_salida'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Formato de fecha incorrecto. Use YYYY-MM-DD.'}), 400
    
    # Busca el cliente y la habitación
    cliente = Cliente.query.get_or_404(data['cliente_id'])
    habitacion = Habitacion.query.get_or_404(data['habitacion_id'])

    # Crea la instancia de la reserva con los objetos de fecha
    nueva_reserva = Reserva(
        cliente_id=cliente.id,
        habitacion_id=habitacion.id,
        fecha_entrada=fecha_entrada_obj,
        fecha_salida=fecha_salida_obj,
        precio_total=data['precio_total']
    )

    db.session.add(nueva_reserva)
    db.session.commit()
    
    return jsonify({'mensaje': 'Reserva creada con éxito'}), 201

# Obtener todas las reservas (READ ALL)
@main.route('/reservas', methods=['GET'])
def obtener_reservas():
    reservas = Reserva.query.all()
    lista_reservas = []
    for reserva in reservas:
        lista_reservas.append({
            'id': reserva.id,
            'cliente_id': reserva.cliente_id,
            'habitacion_id': reserva.habitacion_id,
            'fecha_entrada': reserva.fecha_entrada.strftime('%Y-%m-%d'),
            'fecha_salida': reserva.fecha_salida.strftime('%Y-%m-%d'),
            'precio_total': reserva.precio_total
        })
    return jsonify(lista_reservas), 200

@main.route('/reserva/<int:reserva_id>', methods=['GET'])
def obtener_reserva_por_id(reserva_id):
    reserva = Reserva.query.get_or_404(reserva_id)
    return jsonify({
        'id': reserva.id,
        'cliente_id': reserva.cliente_id,
        'habitacion_id': reserva.habitacion_id,
        'fecha_entrada': reserva.fecha_entrada,
        'fecha_salida': reserva.fecha_salida,
        'precio_total': reserva.precio_total
    }), 200

@main.route('/reserva/<int:reserva_id>', methods=['PUT'])
def actualizar_reserva(reserva_id):
    reserva = Reserva.query.get_or_404(reserva_id)
    datos = request.json
    reserva.cliente_id = datos.get('cliente_id', reserva.cliente_id)
    reserva.habitacion_id = datos.get('habitacion_id', reserva.habitacion_id)
    reserva.fecha_entrada = datos.get('fecha_entrada', reserva.fecha_entrada)
    reserva.fecha_salida = datos.get('fecha_salida', reserva.fecha_salida)
    reserva.precio_total = datos.get('precio_total', reserva.precio_total)
    db.session.commit()
    return jsonify({'mensaje': 'Reserva actualizada con éxito'}), 200

@main.route('/reserva/<int:reserva_id>', methods=['DELETE'])
def eliminar_reserva(reserva_id):
    reserva = Reserva.query.get_or_404(reserva_id)
    db.session.delete(reserva)
    db.session.commit()
    return jsonify({'mensaje': 'Reserva eliminada con éxito'}), 200

# --- OPERACIONES CRUD PARA CLIENTES ---

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

# Obtener un cliente por ID
@main.route('/cliente/<int:cliente_id>', methods=['GET'])
def obtener_cliente_por_id(cliente_id):
    cliente = Cliente.query.get_or_404(cliente_id)
    return jsonify({
        'id': cliente.id,
        'nombre_completo': cliente.nombre_completo,
        'telefono': cliente.telefono,
        'correo': cliente.correo,
        'direccion': cliente.direccion
    }), 200

# Actualizar un cliente por ID
@main.route('/cliente/<int:cliente_id>', methods=['PUT'])
def actualizar_cliente(cliente_id):
    cliente = Cliente.query.get_or_404(cliente_id)
    datos = request.json
    cliente.nombre_completo = datos.get('nombre_completo', cliente.nombre_completo)
    cliente.telefono = datos.get('telefono', cliente.telefono)
    cliente.correo = datos.get('correo', cliente.correo)
    cliente.direccion = datos.get('direccion', cliente.direccion)
    db.session.commit()
    return jsonify({'mensaje': 'Cliente actualizado con éxito'}), 200

# Eliminar un cliente por ID
@main.route('/cliente/<int:cliente_id>', methods=['DELETE'])
def eliminar_cliente(cliente_id):
    cliente = Cliente.query.get_or_404(cliente_id)
    db.session.delete(cliente)
    db.session.commit()
    return jsonify({'mensaje': 'Cliente eliminado con éxito'}), 200
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



# Obtener un hotel por ID (READ ONE)
@main.route('/hotel/<int:hotel_id>', methods=['GET'])
def obtener_hotel_por_id(hotel_id):
    hotel = Hotel.query.get_or_404(hotel_id)
    return jsonify({
        'id': hotel.id,
        'nombre': hotel.nombre,
        'direccion': hotel.direccion,
        'telefono': hotel.telefono,
        'correo': hotel.correo,
        'ubicacion_geografica': hotel.ubicacion_geografica,
        'descripcion_servicios': hotel.descripcion_servicios
    }), 200

# Actualizar un hotel por ID (UPDATE)
@main.route('/hotel/<int:hotel_id>', methods=['PUT'])
def actualizar_hotel(hotel_id):
    hotel = Hotel.query.get_or_404(hotel_id)
    data = request.json
    hotel.nombre = data.get('nombre', hotel.nombre)
    hotel.direccion = data.get('direccion', hotel.direccion)
    hotel.telefono = data.get('telefono', hotel.telefono)
    hotel.correo = data.get('correo', hotel.correo)
    hotel.ubicacion_geografica = data.get('ubicacion_geografica', hotel.ubicacion_geografica)
    hotel.descripcion_servicios = data.get('descripcion_servicios', hotel.descripcion_servicios)
    db.session.commit()
    return jsonify({'mensaje': 'Hotel actualizado con exito'}), 200

# Eliminar un hotel por ID (DELETE)
@main.route('/hotel/<int:hotel_id>', methods=['DELETE'])
def eliminar_hotel(hotel_id):
    hotel = Hotel.query.get_or_404(hotel_id)
    db.session.delete(hotel)
    db.session.commit()
    return jsonify({'mensaje': 'Hotel eliminado con exito'}), 200