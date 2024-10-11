document.getElementById('get-map-btn').addEventListener('click', async function () {
    // Get input values from the form
    const longitude1 = document.getElementById('longitude1').value;
    const latitude1 = document.getElementById('latitude1').value;
    const longitude2 = document.getElementById('longitude2').value;
    const latitude2 = document.getElementById('latitude2').value;
    const longitude3 = document.getElementById('longitude3').value;
    const latitude3 = document.getElementById('latitude3').value;
    const longitude4 = document.getElementById('longitude4').value;
    const latitude4 = document.getElementById('latitude4').value;

    const data = {
        longitude1, latitude1,
        longitude2, latitude2,
        longitude3, latitude3,
        longitude4, latitude4
    };

    try {
        // Make POST request to Flask backend
        const response = await fetch('/generate-map', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Handle the response
        if (response.ok) {
            const { map_url } = await response.json();

            // Display the map in the container
            document.getElementById('map-result-container').style.display = 'block';
            document.getElementById('map-result-container').innerHTML = `<iframe src="${map_url}" width="100%" height="100%" frameborder="0"></iframe>`;
        } else {
            const error = await response.text();
            document.getElementById('error-message').textContent = error;
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'An error occurred while fetching the map.';
    }
});
