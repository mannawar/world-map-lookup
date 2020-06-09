const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search countries.json and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/countries.json');
    const countries = await res.json();

    //Get matches to the current input search
    let matches = countries.filter(country =>{
        let regex = new RegExp(`^${searchText}`, 'gi');
            return country.name.match(regex) 
    })

    if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML='';
    }

    outputHtml(matches);
}
const outputHtml = matches => {
    if(matches.length > 0){
        let html = matches.map(match => 
            `<div class="card card-body mb-1">
            <h4> ${match.name} (${match.country_code}) <span class="text-primary"> ${match.capital}</span></h4>
            <medium>Lat,Lon: ${match.latlng} & TimeZone: ${match.timezones}</medium>
            <small><a href="https://www.google.com/maps/d/viewer?msa=0&dg=feature&mid=1hjs3mIoZBblBP_CvxiP4w38STiY&ll=15.792914338408467%2C34.56916799999999&z=2" target="_blank">For more details, please check world map here</a></small>
            </div>`
        ).join('');
        
        matchList.innerHTML=html;
    }
    
}

search.addEventListener('input', () => searchStates(search.value));