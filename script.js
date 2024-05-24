document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-term').value;
    if (searchTerm) {
        fetch(`https://v3.sg.media-imdb.com/suggestion/x/${searchTerm}.json?includeVideos=1`, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
                'origin': 'https://www.imdb.com',
                'referer': 'https://www.imdb.com/',
                'sec-ch-ua': '"Opera GX";v="109", "Not:A-Brand";v="8", "Chromium";v="123"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0'
            }
        })
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results
            data.d.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                const image = item.i ? `<img src="${item.i.imageUrl}" alt="${item.l}">` : '';
                const title = `<h3>${item.l}</h3>`;
                const description = item.s ? `<p>${item.s}</p>` : '';
                const year = item.y ? `<p>${item.y}</p>` : '';

                resultItem.innerHTML = `${image}${title}${description}${year}`;
                resultsContainer.appendChild(resultItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    }
});
