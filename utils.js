export function displayCafe(cafe, parentNode) {
  const li = document.createElement('li');
  const name = document.createElement('span');
  const city = document.createElement('span');
  const cross = document.createElement('button');

  li.setAttribute('data-id', cafe.id);
  name.textContent = cafe.name;
  city.textContent = cafe.city;
  cross.innerHTML = '&#10005';
  cross.classList.add('btn-delete');
  li.append(name);
  li.append(city);
  li.append(cross);
  parentNode.insertAdjacentElement('afterbegin', li);
}

export function addCity(cafe, parentElement) {
  const { city } = cafe;
  const option = document.createElement('option');
  option.value = city;
  option.innerText = city;
  parentElement.insertAdjacentElement('beforeend', option);
}
