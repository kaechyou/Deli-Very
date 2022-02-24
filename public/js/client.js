const { postOrder } = document.forms;
console.log(postOrder);

if (postOrder) {
  postOrder.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('this is fetch <<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    const formData = new FormData(postOrder);
    const responce = await fetch('/orders/new', {
      method: 'POST',
      body: formData,
    });
    if (responce.ok) {
      postOrder.reset();
      window.location = '/orders';
    } else {
      alert('Неверные данные');
    }
  });
}
