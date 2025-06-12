async function getPotenza() {
    try {
        const potenzaElement = document.querySelector('#potenza-value');
        const energiaElement = document.querySelector('#energia-value');
        const co2Element = document.querySelector('#co2-value');
        const debugElement = document.querySelector('#debug-value');

        if (!potenzaElement || !energiaElement || !co2Element || !debugElement) {
            console.error('Required elements not found');
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://fotovoltaico-mr-proxy.onrender.com/api/dati', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*'
            },
            cache: 'no-cache'
        });
        const data = await response.json();


        if (Array.isArray(data) && data.length > 0) {
            const potenza = data[0].potenza_totale.replace(',', '.');
            const energia = data[0].produzione_totale.replace(',', '.');
            const co2 = data[0].co2_totale.replace(',', '.');
            potenzaElement.textContent = potenza;
            energiaElement.textContent = energia;
            co2Element.textContent = co2;


            debugElement.textContent = 'Dati aggiornati: ' + new Date().toLocaleTimeString();
        } else {
            potenzaElement.textContent = 'N/D';
            energiaElement.textContent = 'N/D';
            co2Element.textContent = 'N/D';
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
        const debugElement = document.querySelector('#debug-value');
        if (debugElement) {
            debugElement.textContent = `Errore: ${error.message}`;
        }
    }
}

// Aggiorna ogni 5 secondi
setInterval(getPotenza, 5000);

// Prima chiamata all'avvio
getPotenza();