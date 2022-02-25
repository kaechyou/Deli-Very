const courierCard = document.querySelector('#courier');

courierCard.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'delete') {
        const {id} = e.target.parentNode.dateset;
        const response = await fetch('')
    }
});
