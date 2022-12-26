import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config.js';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { displayCafe, addCity } from './utils.js';
import './style.css';

const cafeList = document.querySelector('#cafe-list');
const form = document.getElementById('add-cafe-form');
const filter = document.getElementById('filter');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const unsub = onSnapshot(collection(db, 'cafes'), (snapshot) => {
  filter.innerHTML = ' <option value="">--select city--</option>';
  const cities = [];
  snapshot.docs.forEach((doc) => {
    const cafe = { ...doc.data(), id: doc.id };
    displayCafe(cafe, cafeList);
    if (!cities.includes(cafe.city)) {
      addCity(cafe, filter);
      cities.push(cafe.city);
    }
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
  filter.value = '';
});

cafeList.addEventListener('click', async (e) => {
  const { target } = e;
  if (!target.classList.contains('btn-delete')) return;

  const id = target.parentNode.getAttribute('data-id');

  if (confirm('Are you sure?')) {
    await deleteDoc(doc(db, 'cafes', id));
  }
});

filter.addEventListener('change', (e) => {
  unsub();
  const { value } = e.target;
  let q;
  if (!value) {
    q = query(collection(db, 'cafes'), orderBy('name', 'desc'));
  } else {
    q = query(collection(db, 'cafes'), where('city', '==', value));
  }
  onSnapshot(q, (snapshot) => {
    cafeList.innerHTML = '';
    snapshot.docs.forEach((doc) => {
      const cafe = { ...doc.data(), id: doc.id };
      displayCafe(cafe, cafeList);
    });
  });
});
