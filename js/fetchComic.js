// sätter in variabler
var maxComic = -1;      
var currentComic = -1;  

// Funktion som körs när sidan har laddats
window.onload = function() {
    // visar senaste bilden
    getComic('latest');

    // Hämta referenser för knapparna
    let slumpad = document.getElementById('slumpa');
    let forsta = document.getElementById('forsta');
    let forra = document.getElementById('forra');
    let nasta = document.getElementById('nasta');
    let sista = document.getElementById('sista');

   
    slumpad.addEventListener('click', function() {
        // Hämta en slumpad serietidning och visa den
        getComic(Math.floor(Math.random() * maxComic) + 1);
    });

    nasta.addEventListener('click', function() {
        // Visa nästa serietidning om det finns fler
        if (currentComic < maxComic) {
            currentComic = currentComic + 1;
            getComic(currentComic.toString());
        }
    });

    forsta.addEventListener('click', function() {
        // Visa den första serietidningen om den nuvarande inte är den första
        if (currentComic != 1) {
            getComic("1");
        }
    });

    forra.addEventListener('click', function() {
        // Visa föregående serietidning om den nuvarande inte är den första
        if (currentComic > 1) {
            currentComic = currentComic - 1;
            getComic(currentComic.toString());
        }
    });

    sista.addEventListener('click', function() {
        // Visa den senaste serietidningen om den nuvarande inte är den senaste
        if (currentComic != maxComic) {
            getComic('latest');
        }
    });

    // Funktion för att hämta serietidning från XKCD API
    function getComic(which) {
        fetch('https://xkcd.vercel.app/?comic=' + which)
            .then(function(response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(function(data) {
                // Uppdatera maxComic om det nya serienumret är större
                if (maxComic < data.num) {
                    maxComic = data.num;
                }
                // Visa den hämtade serietidningen
                appendComic(data);
            });
    }

    function appendComic(data) {
        // Hämta referens till HTML-elementet där serietidningen ska visas
        let mainComic = document.getElementById('mainComic');
        // Rensa innehållet i mainComic
        mainComic.innerHTML = "";

        // Skapa HTML-element för titel
        let titel = document.createElement('H1');
        titel.innerHTML = data.title;
        mainComic.appendChild(titel);

        // Skapa HTML-element för datum
        const date = document.createElement('p');
        const comicDate = new Date(data.year, data.month - 1, data.day);
        date.innerHTML = comicDate.toLocaleDateString();
        mainComic.appendChild(date);

        // Skapa HTML-element för figure (bild och caption)
        let figure = document.createElement('figure');

        // Skapa HTML-element för bild
        let img = document.createElement('img');
        img.src = data.img;

        // Skapa HTML-element för caption (serienumret)
        let caption = document.createElement('figcaption');
        caption.innerHTML = data.num;

        // Lägg till bild och caption till figure
        figure.appendChild(img);
        figure.appendChild(caption);

        // Lägg till figure till mainComic
        mainComic.appendChild(figure);

        // Uppdaterar currentComic med det senaste bilden av comicsen
        currentComic = data.num;
    }
}
