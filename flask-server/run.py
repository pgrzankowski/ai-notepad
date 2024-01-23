from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restx import Api
from app.models import db, Note, User
from app.config import Config, DevConfig, ProdConfig, TestConfig
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from app.notes import note_ns
from app.auth import auth_ns
from dotenv import load_dotenv
import os


def create_app():

    load_dotenv()

    config = os.getenv('FLASK_CONFIG', 'DevConfig')

    app = Flask(__name__)
    CORS(app)

    if config == 'Config':
        cfg = Config()
    elif config == 'DevConfig':
        cfg = DevConfig()
    elif config == 'ProdConfig':
        cfg = ProdConfig()
    elif config == 'TestConfig':
        cfg = TestConfig()

    app.config.from_object(cfg)

    db.init_app(app)

    migrate=Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc='/docs')

    api.add_namespace(note_ns)
    api.add_namespace(auth_ns)


    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "Note": Note,
            "User": User,
        }
    
    return app
