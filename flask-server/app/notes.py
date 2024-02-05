from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Namespace, Resource, fields
from app.models import Note, User
from app.components.ChatBot import ChatBot
from app.components.NoteParser import parseNotes


note_ns = Namespace('note', description="A namespace for user notes management")


note_model = note_ns.model(
    "Note",
    {
        "id": fields.Integer(),
        "title": fields.String(required=True),
        "content": fields.String(required=True)
    }
)


@note_ns.route('/<string:username>')
class NotesResource(Resource):
    @note_ns.marshal_list_with(note_model)
    @jwt_required()
    def get(self, username):
        """Get all notes"""
        user = User.query.filter_by(username=username).first()
        if not user:
            note_ns.abort(404, "User not found")
        if user.username != get_jwt_identity():
            note_ns.abort(403, "Access denied")
        notes = user.notes
        return notes

    # @note_ns.marshal_with(note_model)
    @note_ns.expect(note_model)
    @jwt_required()
    def post(self, username):
        """Create a new note"""
        data = request.get_json()
        user = User.query.filter_by(username=username).first()
        if not user:
            note_ns.abort(404, "User not found")
        if user.username != get_jwt_identity():
            note_ns.abort(403, "Access denied")
        new_note = Note(
            title = data.get('title'),
            content = data.get('content'),
            user_id = user.id
        )
        new_note.save()
        message = f"Note: '{new_note.title}' created successfully"
        return jsonify({"message": message})

@note_ns.route('/<string:username>/<int:note_id>')
class NotesResource(Resource):
    @note_ns.marshal_with(note_model)
    @jwt_required()
    def get(self, username, note_id):
        """Get a note of a user by note_id"""
        user = User.query.filter_by(username=username).first()
        if user.username != get_jwt_identity():
            note_ns.abort(403, "Access denied")
        note = Note.query.filter_by(id=note_id, user_id=user.id).first()
        if not note:
            note_ns.abort(404, "Note not found")
        return note

    @note_ns.expect(note_model)
    @jwt_required()
    def put(self, username, note_id):
        """Update a note of a user by note_id"""
        user = User.query.filter_by(username=username).first()
        if user.username != get_jwt_identity():
            note_ns.abort(403, "Access denied")
        note_to_update = Note.query.filter_by(id=note_id, user_id=user.id).first()
        if not note_to_update:
            note_ns.abort(404, "Note not found")
        data = request.get_json()
        note_to_update.update(data.get('title'), data.get('content'))
        message = f"Note: {note_to_update.title} updated successfully"
        return jsonify({"message": message})

    @note_ns.marshal_with(note_model)
    @jwt_required()
    def delete(self, username, note_id):
        """Delete a note of a user by note_id"""
        user = User.query.filter_by(username=username).first()
        if user.username != get_jwt_identity():
            note_ns.abort(403, "Access denied")
        note_to_delete = Note.query.filter_by(id=note_id, user_id=user.id).first()
        if not note_to_delete:
            note_ns.abort(404, "Note not found")
        note_to_delete.delete()
        message = f"Note: {note_to_delete.title} deleted successfully"
        return jsonify({"message": message})
    

@note_ns.route('/chat-bot/<string:username>')
class NotesResource(Resource):
    @jwt_required()
    def post(self, username):
        user = User.query.filter_by(username=username).first()
        notes = parseNotes(user.notes)
        bot = ChatBot(notes)
        data = request.get_json()
        response = bot.getResponse(data.get("question"))
        return jsonify({"response": response})
    