document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function () {
        const word = document.getElementById('word1').value.trim();
        if (word !== '') {
            fetchMeaning(word);
        } else {
            document.getElementById('meaningDisplay').innerHTML =
                `<p style="color: red;">Please Enter a word to see its meaning</p>`;
        }
    });

    document.getElementById('synonyms').addEventListener('click', function () {
        const word = document.getElementById('word2').value.trim();
        if (word !== '') {
            fetchSynonym(word);
        } else {
            document.getElementById('synonymDisplay').innerHTML =
                `<p style="color: red;">Please Enter a word to see its synonyms</p>`;
        }
    });
});

async function fetchMeaning(word) {
    const res = await fetch(`https://api.api-ninjas.com/v1/dictionary?word=${word}`, {
        method: "GET",
        headers: {
            'X-Api-Key': CONFIG.API_KEY
        }
    });

    const record = await res.json();
    const meanings = record.definition;

    if (!meanings) {
        document.getElementById('meaningDisplay').innerHTML =
            `<p style="color: red;">No meaning found</p>`;
    } else {
        const parts = meanings.split(/\d+\./);
        let formattedMeaning = "";

        for (let i = 0; i < parts.length; i++) {
                formattedMeaning += `<p><b>${i + 1}. </b>${parts[i].trim()}</p>`;
        }

        document.getElementById('meaningDisplay').innerHTML = formattedMeaning;
    }
}

async function fetchSynonym(word) {
    const res = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
        method: "GET",
        headers: {
            'X-Api-Key': CONFIG.API_KEY
        }
    });

    const record = await res.json();
    const synonyms = record.synonyms;

    if (!synonyms || synonyms.length === 0) {
        document.getElementById('synonymDisplay').innerHTML =
            `<p style="color: red;">No synonyms found</p>`;
    } else {
        const firstFiveSynonyms = synonyms.slice(0, 5).join(", ");
        document.getElementById('synonymDisplay').textContent = firstFiveSynonyms;
    }
}
