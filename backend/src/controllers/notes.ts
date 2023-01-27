import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note id");

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note not Found");

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//tell typescript what types to expect for title and note
interface CreateNoteBody {
  title?: string; //title maybe missing from request
  text?: string; // optional -> ?
}

//unknown - leave the types of url arguments or params coz we dnt use em here but set type for body
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (!title) throw createHttpError(400, "Title is required");

    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string; //title maybe missing from,
  text?: string; // optional -> ?
}

//unknown - leave the types of url arguments or params coz we dnt use em here but set type for body and params
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note id");

    if (!newTitle) throw createHttpError(400, "Title is required");

    const note = await NoteModel.findById(noteId).exec();
    if (!note) throw createHttpError(404, "Note not Found");

    note.title = newTitle;
    note.text = newText;
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note id");

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note not Found");

    await note.remove();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
