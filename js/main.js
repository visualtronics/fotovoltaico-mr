async function getPotenza() {
    try {
        const potenzaElement = document.querySelector('#potenza-value');
        const energiaElement = document.querySelector('#energia-value');
        const co2Element = document.querySelector('#co2-value');
        if (!potenzaElement || !energiaElement || !co2Element) {
            console.error('Required elements not found');
            return;
        }

        const response = await fetch('https://www.monitoraggioimpianti.it/solarnet/liveDataShort3.ashx', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log('Dati ricevuti:', data);
        
        if (Array.isArray(data) && data.length > 0) {
            const potenza = data[0].potenza_totale.replace(',', '.');
            const energia = data[0].produzione_totale.replace(',', '.');
            const co2 = data[0].co2_totale.replace(',', '.');
            potenzaElement.textContent = potenza;
            energiaElement.textContent = energia;
            co2Element.textContent = co2;
        } else {
            potenzaElement.textContent = 'N/D';
            energiaElement.textContent = 'N/D';
            co2Element.textContent = 'N/D';
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
        const elements = ['#potenza-value', '#energia-value', '#co2-value'];
        elements.forEach(id => {
            const element = document.querySelector(id);
            if (element) element.textContent = 'Errore';
        });
    }
}

// Aggiorna ogni 5 secondi
setInterval(getPotenza, 5000);

// Prima chiamata all'avvio
getPotenza();