export function displayCafe(cafe, parentNode) {
  const li = document.createElement('li');
  const name = document.createElement('span');
  const city = document.createElement('span');

  li.setAttribute('data-id', cafe.id);
  name.textContent = cafe.name;
  city.textContent = cafe.city;
  li.append(name);
  li.append(city);
  parentNode.insertAdjacentElement('afterbegin', li);
}
