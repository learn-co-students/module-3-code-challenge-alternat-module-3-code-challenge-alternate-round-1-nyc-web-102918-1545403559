const theatreId = 88;
addEventListener('DOMContentLoaded', ()=>{

const cardsShowing = document.querySelector('.ui-cards-showings')

  allShowings = []

  function fetchShows(){
fetch("https://evening-plateau-54365.herokuapp.com/theatres/88")
.then(r=>r.json())
.then(r=>{
  allShowings = r

  cardsShowing.innerHTML = mapThrough(r)
})
}

fetchShows()



function renderHTML(r){
    return `<div class="card">
      <div class="content">
        <div class="header">
          <h1 id=${r.id}>${r.film.title}</h1>
        </div>
        <div class="meta">
          <h2>${r.film.runtime} minutes</h2>
        </div>
        <div class="description">
          <span class="ui label">
            (Showtime)
            <h2>${r.showtime}</h2>
          </span>
           <h3>${r.capacity - r.tickets_sold} remaining tickets</h3>
        </div>
      </div>
      <div class="extra content">
        <div id=${r.id} class="ui blue button">Buy Ticket</div>
      </div>
    </div>`

  }

  function mapThrough(showingObject){
      return showingObject.showings.map(renderHTML).join('')
    }

    cardsShowing.addEventListener('click', (e)=>{

    let clickedId = e.target.id

    let foundShow = allShowings.showings.find((show)=>{
    return show.id == e.target.id
  })

  if (foundShow.capacity === foundShow.tickets_sold){

    alert("This show is sold out")

  } else {

  let ticketsSold = foundShow.tickets_sold += 1
  let capacity = foundShow.capacity - 1


  fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
      method: "POST",
      headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
      },
      body: JSON.stringify({
        showing_id: clickedId
      })
  })
  .then(r=>r.json())
    .then(r=>{
      fetchShows()

    })
}
})


})//end of dom content loaded
