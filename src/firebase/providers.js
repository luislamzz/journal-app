import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

//instancia al proveedor de autenticacion.
const googleProvider = new GoogleAuthProvider();

//Funcion que vamos a llamar para autenticarse.
export const singInWithGoogle = async () => {
  try {
    //signInWithPopup para acceder con una ventana emergente.
    //recibe el Auth que hicimos en el config de firebase y el proveedor que va disparar el PopUp.
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log({ credentials });
    const { displayName, email, photoURL, uid } = result.user;

    //código personalizado retornado.
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    //   console.log("google", error);
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = resp.user;

    //actualizar el displayName en firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return { ok: true, uid, photoURL, email, displayName };
  } catch (error) {
    // console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    // console.log(resp.user);

    const { uid, photoURL, displayName } = resp.user;
    return { ok: true, uid, photoURL, email, displayName };
  } catch (error) {
    // console.log("error", error);

    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async () => {
  //esto cierra cualquier proveedor googgle,twitter,etc.
  return await FirebaseAuth.signOut();
};
