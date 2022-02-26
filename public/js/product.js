// добавить лиснер на клик по кнопке экшн пост фетч
// фетч запишет в бд

// const editEntryForm = document.querySelector('#editEntryForm');
const deleteProductButton = document.querySelector('#deleteProductButton');
const buyProductButton = document.querySelector('#buyProductButton');

if (deleteProductButton) {
  deleteProductButton.addEventListener('click', async (event) => {
      const response = await fetch(`/orders/${event.target.dataset.entryid}`,{
      method: 'delete' });
      window.location = '/orders';
  });
}

buyProductButton?.addEventListener('click', async (event)=>{
  // console.log('tut');
  event.preventDefault();
  try {
    const input = document.getElementById('address');
    // console.log(input.value + 'dasdsadasda')
    // console.log(input.value.trim(), ' dasdsa')
    if (input.value.trim() === '') {
      alert('Введите адрес');
      return;
    }
    const newOrder = await fetch(`/orders/${event.target.dataset.entryid}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({location: input.value}),
    });

    window.location = '/user/client';
  } catch (e) {
    alert(e);
  }
})
