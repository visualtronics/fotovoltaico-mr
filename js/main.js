async function getPotenza() {
    try {
        const potenzaElement = document.querySelector('#potenza-value');
        const energiaElement = document.querySelector('#energia-value');
        const co2Element = document.querySelector('#co2-value');

        if (!potenzaElement || !energiaElement || !co2Element) {
            console.error('Required elements not found');
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://www.monitoraggioimpianti.it/solarnet/liveDataShort3.ashx', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*'
            },
            cache: 'no-cache'
        });
        const data = await response.json();


        if (Array.isArray(data) && data.length > 0) {
            potenzaElement.textContent = data[0].potenza_totale;
            energiaElement.textContent = data[0].produzione_totale;
            co2Element.textContent = data[0].co2_totale;
        } else {
            potenzaElement.textContent = 'N/D';
            energiaElement.textContent = 'N/D';
            co2Element.textContent = 'N/D';
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

// Aggiorna ogni 5 secondi
setInterval(getPotenza, 5000);

// Prima chiamata all'avvio
getPotenza();