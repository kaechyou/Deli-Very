const { postOrder } = document.forms;

if (postOrder) {
  postOrder.addEventListener('submit', async (e) => {
    e.preventDefault();
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
