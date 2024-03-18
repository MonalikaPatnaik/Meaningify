document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function () {
        const word = document.getElementById('word').value.trim();
        if (word !== '') {
            fetchMeaning(word);
        }
        else{
            document.getElementById('meaningDisplay').innerHTML= `<p style="color: red;">Error fetching meaning</p>`
        }
    });
});
async function fetchMeaning(word){
    const res=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const record=await res.json();
    const meanings = record[0].meanings;
    document.getElementById('meaningDisplay').textContent = meanings[Math.floor(Math.random() * meanings.length)].definitions[0]?.definition;
}