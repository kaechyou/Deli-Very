const geoExample = 'https://geocode-maps.yandex.ru/1.x/?apikey=e8180acb-375a-4fc6-8f29-b4b366e44e0e&format=json&geocode=Тверская+6'
// 'https://geocode-maps.yandex.ru/1.x/?apikey=e8180acb-375a-4fc6-8f29-b4b366e44e0e&geocode=Тверская+6';

const yaGeoLink = 'https://geocode-maps.yandex.ru/1.x/?apikey=e8180acb-375a-4fc6-8f29-b4b366e44e0e&format=json&geocode='

const geotag = document.getElementById('geotag');

async function getGeo() {
  const response = await fetch(geo);
  // console.log(geo);
  console.log(response);
  const data = await response.json();
  console.log(data);
  geotag.innerHTML = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
  
};

getGeo();
