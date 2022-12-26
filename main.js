import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config.js';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { displayCafe } from './utils.js';
import './style.css';

const cafeList = document.querySelector('#cafe-list');
const form = document.getElementById('add-cafe-form');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

onSnapshot(collection(db, 'cafes'), (snapshot) => {
  cafeList.innerHTML = '';
  snapshot.docs.forEach((doc) => {
    const cafe = { ...doc.data(), id: doc.id };
    displayCafe(cafe, cafeList);
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const city = form.city.value;
  const newCafe = { name, city };
  const docRef = await addDoc(collection(db, 'cafes'), newCafe);
  console.log('Document written with ID: ', docRef.id);
  form.reset();
});

cafeList.addEventListener('click', async (e) => {
  const { target } = e;
  if (!target.classList.contains('btn-delete')) return;

  const id = target.parentNode.getAttribute('data-id');

  if (confirm('Are you sure?')) {
    await deleteDoc(doc(db, 'cafes', id));
  }
});
