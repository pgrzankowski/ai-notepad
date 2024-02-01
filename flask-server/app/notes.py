from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Namespace, Resource, fields
from app.models import Note, User


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

    @note_ns.marshal_with(note_model)
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
        return new_note, 201

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

    @note_ns.marshal_with(note_model)
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
        return note_to_update

    @note_ns.marshal_with(note_model)
    @jwt_required()
    def delete(self, username, note_id):
        """Delete a note of a user by note_id"""
        user = User.query.filter_by(username=username)
        if user.username != get_jwt_identity():
            note_ns.abort(403, "Access denied")
        note_to_delete = Note.query.filter_by(id=note_id, user_id=user.id).first()
        if not note_to_delete:
            note_ns.abort(404, "Note not found")
        note_to_delete.delete()
        return note_to_delete