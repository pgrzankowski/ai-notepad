from flask import request
from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource, fields
from app.models import Note, User


note_ns = Namespace('note', description="A namespace for Notes")


note_model = note_ns.model(
    "Note",
    {
        "id": fields.Integer(),
        "title": fields.String(required=True),
        "content": fields.String(required=True)
    }
)


@note_ns.route('/user/<int:user_id>')
class NotesResource(Resource):
    @note_ns.marshal_list_with(note_model)
    @jwt_required()
    def get(self, user_id):
        """Get all notes"""
        user = User.query.get(user_id)
        if not user:
            note_ns.abort(404, "User not found")
        notes = user.notes
        return notes

    @note_ns.marshal_with(note_model)
    @note_ns.expect(note_model)
    @jwt_required()
    def post(self, user_id):
        """Create a new note"""
        data = request.get_json()
        user = User.query.get(user_id)
        if not user:
            note_ns.abort(404, "User not found")
        new_note = Note(
            title = data.get('title'),
            content = data.get('content'),
            user_id = user_id
        )
        new_note.save()
        return new_note, 201

@note_ns.route('/user/<int:user_id>/<int:note_id>')
class NotesResource(Resource):
    @note_ns.marshal_with(note_model)
    @jwt_required()
    def get(self, user_id, note_id):
        """Get a note of a user by note_id"""
        note = Note.query.filter_by(id=note_id, user_id=user_id).first()
        if not note:
            note_ns.abort(404, "Note not found")
        return note

    @note_ns.marshal_with(note_model)
    @note_ns.expect(note_model)
    @jwt_required()
    def put(self, user_id, note_id):
        """Update a note of a user by note_id"""
        note_to_update = Note.query.filter_by(id=note_id, user_id=user_id).first()
        if not note_to_update:
            note_ns.abort(404, "Note not found")
        data = request.get_json()
        note_to_update.update(data.get('title'), data.get('content'))
        return note_to_update

    @note_ns.marshal_with(note_model)
    @jwt_required()
    def delete(self, user_id, note_id):
        """Delete a note of a user by note_id"""
        note_to_delete = Note.query.filter_by(id=note_id, user_id=user_id).first()
        if not note_to_delete:
            note_ns.abort(404, "Note not found")
        note_to_delete.delete()
        return note_to_delete