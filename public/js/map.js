const center = [55.751727842633386, 37.6142351241799];

function init() {
  const myMap = new ymaps.Map(
    'map',
    {
      center,
      zoom: 17,
      controls: ['smallMapDefaultSet'],
      behaviors: ['drag'],
    },
    {
      searchControlProvider: 'yandex#search',
    },
  );

  // eslint-disable-next-line no-undef
  const myPlacemark = new ymaps.Placemark(center, {
    hintContent: 'hint',
    baloonContent: 'Ballon',
  });

  myMap.geoObjects.add(myPlacemark);

  // Слушаем клик на карте.
  myMap.events.add('click', (e) => {
    const coords = e.get('coords');

    // Если метка уже создана – просто передвигаем ее.
    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    }
    // Если нет – создаем.
    else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add('dragend', () => {
        getAddress(myPlacemark.geometry.getCoordinates());
      });
    }
    getAddress(coords);
  });

  // Создание метки.
  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...',
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true,
    });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties
        .set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ].filter(Boolean).join(', '),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: `${firstGeoObject.getAddressLine()}
          <a href="/orders/details/${1}" class="no-dec">
          <div class="card">
            <div class="card-shadow"></div>
            <div class="main-img-box">
              <img class="main-img" src="${1}" class="card-img-top" alt="/images/logo.png">
            </div>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <div class="price">
                <div class="start-price">${1} руб.</div>
                <div class="discount">${1}</div>
                <div class="final-price">${1}</div>
              </div>
              <div class="card-btn">Адрес: ${1} </div>
            </div>
          </div>
        </a>
          `,
        });
    });
  }

  // Сравним положение, вычисленное по ip пользователя и
  // положение, вычисленное средствами браузера.
  geolocation.get({
    provider: 'yandex',
    mapStateAutoApply: true,
  }).then((result) => {
    // Красным цветом пометим положение, вычисленное через ip.
    result.geoObjects.options.set('preset', 'islands#redCircleIcon');
    result.geoObjects.get(0).properties.set({
      balloonContentBody: 'Мое местоположение',
    });
    myMap.geoObjects.add(result.geoObjects);
  });

  geolocation.get({
    provider: 'browser',
    mapStateAutoApply: true,
  }).then((result) => {
    // Синим цветом пометим положение, полученное через браузер.
    // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
    result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
    myMap.geoObjects.add(result.geoObjects);
  });

<<<<<<< HEAD
  // map.controls.remove('geolocationControl'); // удаляем геолокацию
=======
// map.controls.remove('geolocationControl'); // удаляем геолокацию
>>>>>>> 1890ecfa4393c50a4d7c9f020b7d0823f26436d3
  // map.controls.remove('searchControl'); // удаляем поиск
  // map.controls.remove('trafficControl'); // удаляем контроль трафика
  // map.controls.remove('typeSelector'); // удаляем тип
  // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  // map.controls.remove('rulerControl'); // удаляем контрол правил
  // // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  // myMap.geoObjects.add(placemark);
  // myMap.geoObjects.add(placemark1);

  // placemark1.balloon.open();
  // placemark.balloon.open();
}

ymaps.ready(init);
