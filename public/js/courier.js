const courierProfile = document.querySelector('#courier');

courierProfile.addEventListener('click', async (e) => {
  const { id } = e.target.parentNode.dataset;
  if (e.target.id === `complete${id}` || e.target.id === `pending${id}`) {
    const statusProduct = e.target.id.slice(0, -1);
    const response = await fetch('/user/courier', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, statusProduct }),
    });
    if (response.status === 200) {
      const status = document.querySelector(`#status${id}`);
      status.innerText = `Статус: ${statusProduct}`;
    } else if (response.status === 234) {
      alert('Вы уже изменили статус');
    }
  } else if (e.target.id === `delete${id}`) {
    const product = document.querySelector('#product');
    const response = await fetch('/user/courier', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      product.remove();
    } else if (response.status === 234) {
      alert('Вы не можете удалить заказ, который уже принят клиентом');
    }
  }
});
