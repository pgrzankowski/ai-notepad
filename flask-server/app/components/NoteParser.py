def parseNotes(notes):
    parsed_notes = ""
    for note in notes:
        parsed_notes += note.title + '\n'
        parsed_notes += note.content + '\n\n'
    return parsed_notes