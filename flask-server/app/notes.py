from flask import request
from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource, fields
from app.models import Note


note_ns = Namespace('note', description="A namespace for Notes")


note_model = note_ns.model(
    "Note",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "content": fields.String()
    }
)


@note_ns.route('')
class NotesResource(Resource):
    @note_ns.marshal_list_with(note_model)
    def get(self):
        """Get all notes"""
        notes = Note.query.all()
        return notes

    @note_ns.marshal_with(note_model)
    @note_ns.expect(note_model)
    @jwt_required
    def post(self):
        """Create a new note"""
        data = request.get_json()
        new_note = Note(
            title = data.get('title'),
            content = data.get('content')
        )
        new_note.save()
        return new_note, 201

@note_ns.route('/<int:id>')
class NotesResource(Resource):
    @note_ns.marshal_with(note_model)
    def get(self, id):
        """Get a note by id"""
        note = Note.query.get_or_404(id)
        return note

    @note_ns.marshal_with(note_model)
    @jwt_required
    def put(self, id):
        """Update a note by id"""
        note_to_update = Note.query.get_or_404(id)
        data = request.get_json()
        note_to_update.update(data.get('title'), data.get('content'))
        return note_to_update

    @note_ns.marshal_with(note_model)
    @jwt_required
    def delete(self, id):
        """Delete a note by id"""
        note_to_delete = Note.query.get_or_404(id)
        note_to_delete.delete()
        return note_to_delete