from flask import *
import json, time
from pymongo import MongoClient
import bcrypt
import uuid
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb+srv://silpancho:silpancho@silpancho.paqmjpx.mongodb.net")
db = client.SilDB
collection = db.biblioteca
usuarios = db.Usuarios

@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())

@app.route('/books', methods=['GET'])
def get_books():
    limit_param = request.args.get('limit')
    sort_param = request.args.get('sort')

    try:
        limit = int(limit_param) if limit_param else None
        if sort_param == 'desc':
            sort_order = -1
        else:  
            sort_order = 1
        query = collection.find().sort("titulo", sort_order)
        if limit is not None and limit > 0:
            query = query.limit(limit)
        return Response(json.dumps(list(query), ensure_ascii=False), mimetype='application/json; charset=utf-8')

    except ValueError:
        return jsonify({"error": "Invalid query parameter"}), 400

@app.route('/books/<id>', methods=['GET'])
def get_book(id):
   product = collection.find_one({"_id": int(id)})
   return Response(json.dumps(product, ensure_ascii=False),mimetype='application/json; charset=utf-8')

@app.route('/books/categories', methods=['GET'])
def get_book_categories():
    try:
        categories = collection.aggregate([
            {"$group": {"_id": "$categoria"}},
            {"$sort": {"_id": 1}}
        ])
        category_list = [category['_id'] for category in categories]
        return Response(json.dumps(category_list, ensure_ascii=False), mimetype='application/json; charset=utf-8')
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/books/category/<string:category>', methods=['GET'])
def get_books_by_category(category):
    try:
        formatted_category = category.replace("_", " ")
        books_in_category = collection.find({"categoria": formatted_category})
        books_list = list(books_in_category)
        return Response(json.dumps(books_list, default=str, ensure_ascii=False), mimetype='application/json; charset=utf-8')

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/books', methods=['POST'])
def add_book():
    book_data = request.json
    required_fields = ["autor", "categoria", "titulo", "subtitulo", "isbn13", "precio", "resumen", "image", "rating", "paginas", "idioma", "formato", "fecha_publicacion"]
    if not all(field in book_data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400
    max_id = collection.find_one(sort=[("_id", -1)])
    next_id = 1 if max_id is None else max_id["_id"] + 1
    book_data["_id"] = next_id
    try:
        collection.insert_one(book_data)
        return jsonify({"message": "Book added successfully", "_id": next_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete/book/<int:id>', methods=['DELETE'])
def delete_book(id):
    try:
        result = collection.delete_one({"_id": id})
        if result.deleted_count > 0:
            return jsonify({"message": "Book deleted successfully"}), 200
        else:
            return jsonify({"message": "No book found with the given _id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/edit/book/<int:id>', methods=['PUT']) 
def edit_book(id):
    try:
        updated_data = request.json
        updated_data["cantidad"] = int(updated_data["cantidad"])
        result = collection.update_one({"_id": id}, {"$set": updated_data})
        if result.matched_count > 0:
            if result.modified_count > 0:
                return jsonify({"message": "Book updated successfully"}), 200
            else:
                return jsonify({"message": "No changes made to the book"}), 200
        else:
            return jsonify({"message": "No book found with the given _id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500





    
@app.route('/users', methods=['POST'])
def add_lector():
    data = request.json
    if all(k in data for k in ["Nombre", "Correo", "Contrasenia", "NumeroTarjeta", "FechaTarjeta", "CodigoTarjeta"]):
        hashed_password = bcrypt.hashpw(data['Contrasenia'].encode('utf-8'), bcrypt.gensalt())
        user_id = usuarios.count_documents({}) + 1
        lector_document = {
            "_id": str(user_id),
            "nombre": data["Nombre"],
            "correo": data["Correo"],
            "contrasenia": hashed_password,
            "informacionTarjeta": {
                "numero": data["NumeroTarjeta"],
                "fechaVencimiento": data["FechaTarjeta"],
                "codigoSeguridad": data["CodigoTarjeta"]
            },
            "tipo": "lector"
        }
        usuarios.insert_one(lector_document)
        return jsonify({"mensaje": "Lector registrado exitosamente"}), 201
    else:
        return jsonify({"error": "Faltan datos necesarios para el registro"}), 400

@app.route('/authors', methods=['POST'])
def add_author():
    data = request.json
    if all(k in data for k in ["Nombre", "Correo", "Contrasenia", "DireccionOficina", "NumeroCuentaBanco"]):
        hashed_password = bcrypt.hashpw(data['Contrasenia'].encode('utf-8'), bcrypt.gensalt())
        user_id = usuarios.count_documents({}) + 1
        author_document = {
            "_id": str(user_id),
            "nombre": data["Nombre"],
            "correo": data["Correo"],
            "contrasenia": hashed_password,
            "oficina": data["DireccionOficina"],
            "informacionBancaria": {
                "numeroCuentaBanco": data["NumeroCuentaBanco"]
            },
            "tipo": "autor"
        }
        usuarios.insert_one(author_document)
        return jsonify({"mensaje": "Autor registrado exitosamente"}), 201
    else:
        return jsonify({"error": "Faltan datos necesarios para el registro"}), 400


@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    user = usuarios.find_one({"correo": data["Correo"]})
    if user and bcrypt.checkpw(data['Contrasenia'].encode('utf-8'), user['contrasenia']):
        del user['contrasenia']
        return jsonify(dumps(user)), 200
    else:
        return jsonify({"error": "Las credenciales son incorrectas"}), 401

@app.route('/borrow', methods=['POST'])
def borrow_book():
    data = request.json
    book_id = data.get('idLibro')
    user_id = data.get('idUsuario')
    book_name = data.get('nombreLibro') 
    start_date = data.get('fechaInicio')  
    end_date = data.get('fechaFin')
    book = db.biblioteca.find_one({'_id': book_id})
    print(int(book['cantidad']))
    if book and int(book['cantidad']) > 0:
        db.biblioteca.update_one({'_id': book_id}, {'$inc': {'cantidad': -1}})
        prestamo_id = str(uuid.uuid4())
        prestamo = {
            '_id': prestamo_id,
            'idLibro': book_id,
            'idUsuario': user_id,
            'nombreLibro': book_name, 
            'fechaInicio': start_date,  
            'fechaFin': end_date 
        }
        db.Prestamos.insert_one(prestamo)
        return jsonify({'message': 'Préstamo registrado con éxito'}), 200
    else:
        return jsonify({'error': 'No hay copias suficientes para prestar'}), 400
    
@app.route('/loans/<user_id>', methods=['GET'])
def get_loans(user_id):
    loans = db.Prestamos.find({'idUsuario': user_id})
    loans_list = list(loans)
    return jsonify(loans_list), 200

@app.route('/loans', methods=['GET'])
def get_all_loans():
    loans = db.Prestamos
    loans_list = list(loans)
    return jsonify(loans_list), 200



if __name__ == "__main__":
    app.run(port=7777, debug=True)

