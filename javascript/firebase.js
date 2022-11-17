// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import {getFirestore, collection, getDocs, addDoc} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCVeb_4sIGk1y2E0XZZL3cmMAb5uCy8Epk",
    authDomain: "e-commerce-estandar-b708c.firebaseapp.com",
    projectId: "e-commerce-estandar-b708c",
    storageBucket: "e-commerce-estandar-b708c.appspot.com",
    messagingSenderId: "31299857964",
    appId: "1:31299857964:web:0ec2ac30c23eb7a4fa2b89"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export const getStock = () => getDocs(collection(db, "stock_calzado"))

  export const setOrder = (name, apellido, localidad, codigo_postal, direccion, email, compra) => addDoc(collection(db, "ordenes_compra"),{nombre: name, apellido: apellido, localidad: localidad, codigopostal:codigo_postal, direccion: direccion, email: email, compra: compra});