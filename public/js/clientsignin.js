const { authForm } = document.forms;
// const form = document.querySelector('');

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(authForm));
  const response = await fetch('/user/signin', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const responseJson = await response.json();
    if (responseJson.message === 'Ok') {
      window.location = '/orders';
    } else if (responseJson.message === 'Неверный пароль') {
      alert('Неверный пароль. Попробуйте заново.')
    } else if (responseJson.message === 'Неверный email') {
      alert('Пользователя с таким email не существует. Зарегистрируйтесь или введите существующий email.')
    } else if (responseJson.message === 'Не все поля') {
      alert('Вы заполнили не все поля. Заполните все поля и попробуйте заново.')
    } else if (responseJson.message === 'Вы уже вошли в систему') {
      alert('Вы уже вошли в систему. Чтобы войти под новым пользователем, нажмите кнопку "Выход".')
    }
  } else {
    alert('Что-то пошло не так.');
  }
});
