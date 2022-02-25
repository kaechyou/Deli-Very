const courierCard = document.querySelector('#courier');

courierCard.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'delete') {
        const {id} = e.target.parentNode.dataset;
        const response = await fetch('/user/client', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        })
        if (response.status === 200) {

        }
    }
});
