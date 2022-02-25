// добавить лиснер на клик по кнопке экшн пост фетч
// фетч запишет в бд

// const editEntryForm = document.querySelector('#editEntryForm');
const deleteProductButton = document.querySelector('#deleteProductButton');

if (deleteProductButton) {
  deleteProductButton.addEventListener('click', async (event) => {
    try {
      console.log(event.target.dataset.entryid)
      const response = await fetch(`/orders/${event.target.dataset.entryid}`, {
        method: 'DELETE',
      });
      document.getElementById(event.target.dataset.entryid).remove();

      window.location = '/orders';
    } catch (error) {
      alert(error);
    }
  });
}
