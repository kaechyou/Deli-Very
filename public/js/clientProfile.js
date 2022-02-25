const courierCard = document.querySelector('#courier');

courierCard.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.id === `delete${e.target.parentNode.dataset.id}`) {
    const { id } = e.target.parentNode.dataset;
    const response = await fetch('/user/client', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      const card = document.querySelector(`#product${id}`);
      card.remove();
    } else if (response.status === 234) {
      alert('Вы не можете удалить уже полученный заказ');
    } else if (response.status === 404) {
      alert('УПС. Что-то пошло не так!');
    }
  }
});
