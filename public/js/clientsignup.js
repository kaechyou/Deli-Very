const { registerForm } = document.forms;

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(registerForm));
  const response = await fetch('/user/signup', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const responseJson = await response.json();
    if (responseJson.message === 'Ok') {
      window.location = '/orders';
    } else if (responseJson.message === 'email занят') {
      alert('Этот email уже используется, попробуйте другой');
    } else if (responseJson.message === 'не все поля') {
      alert('Вы заполнили не все поля. Заполните все поля и попробуйте заново.');
    }
  } else {
    alert('Что-то пошло не так.');
  }
});
