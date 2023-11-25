import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

//Crea una nota vacia en la bd como si fuera el state initial.
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    // console.log(getState());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    //creamos referencia para crear la note en la BD
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    //Insertar la nota en la referencia
    await setDoc(newDoc, newNote);
    // console.log({ newDoc, setDocResp });

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    // console.log({ uid });

    const notes = await loadNotes(uid);

    // console.log(notes);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirebase = { ...note };
    delete noteToFirebase.id;

    // console.log(noteToFirebase);

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirebase, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    // console.log(files);
    // const resp = await fileUpload(files[0]);
    // console.log("respuesta:", resp);

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    // console.log(photosUrls);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    console.log({ uid, note });

    //Eliminarlo de firebase
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    //Eliminando de manera local del Store.
    dispatch(deleteNoteById(note.id));
  };
};
