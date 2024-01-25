from flask import Flask, request, jsonify
from flask_cors import CORS
from eye_origin import ai_eyes


app = Flask(__name__)
CORS(app)

# Configuración para la subida de archivos
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'tif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 500 * 1024 * 1024
app.config['TIMEOUT'] = 900

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/hola')
def hello_world():
    return '¡Hola, mundo!'

@app.route('/api/upload', methods=['POST'])
def upload_file():
    print("file recived")
    files = request.files.getlist('file')

    if len(files) >= 1:  
        res = ai_eyes(files)
        
        if(res == 500):        
            return jsonify({'error': True, 'data': 'Not possible apply AI'}), 200
        else:
            return jsonify({'success': True, 'data': res}), 200

    return jsonify({'error': 'Tipo de archivo no permitido'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)