const airportsData = {
  airport_data: [
    {
      Code: "CGK",
      Name: "Soekarno Hatta International Airport",
      City: "Jakarta",
    },
    {
      Code: "YIA",
      Name: "Yogyakarta International Airport",
      City: "Yogyakarta",
    },
    {
      Code: "DPS",
      Name: "Ngurah Rai International Airport",
      City: "Denpasar",
    },
    {
      Code: "SIN",
      Name: "Changi International Airport",
      City: "Singapore",
    },
  ],
};

const airlinesData = {
  airlines_data: [
    {
      Code: "GA",
      Name: "Garuda Indonesia",
      Logo: "https://th.bing.com/th/id/R.6c6307bf6967ab86d541d7b239dd8862?rik=8FW4rBjxQUUnZw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-kfqmZ6swf14%2fUPkoWbasV_I%2fAAAAAAAAFLQ%2f7DrmTWFM6sQ%2fs1600%2fLogo%2bGaruda%2bIndonesia.jpg&ehk=AgceEsfB7dJJ72kNhRD6yqyTs1pwhgvySXBbCh9LTAA%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      Code: "SQ",
      Name: "Singapore Airlines",
      Logo: "https://cdn.freebiesupply.com/logos/large/2x/singapore-airlines-logo-png-transparent.png",
    },
    {
      Code: "QZ",
      Name: "Air Asia Indonesia",
      Logo: "https://download.logo.wine/logo/Indonesia_AirAsia/Indonesia_AirAsia-Logo.wine.png",
    },
  ],
};

const flights = [
  {
    airlines: "GA",
    departure_airport: "CGK",
    departure_time: "2021-08-17T08:20",
    arrival_airport: "SIN",
    arrival_time: "2021-08-17T10:50",
  },
  {
    airlines: "SQ",
    departure_airport: "CGK",
    departure_time: "2021-08-17T17:00",
    arrival_airport: "SIN",
    arrival_time: "2021-08-17T19:30",
  },
  {
    airlines: "QZ",
    departure_airport: "CGK",
    departure_time: "2021-08-17T10:05",
    arrival_airport: "DPS",
    arrival_time: "2021-08-17T12:20",
  },
  {
    airlines: "GA",
    departure_airport: "CGK",
    departure_time: "2021-08-17T13:10",
    arrival_airport: "YIA",
    arrival_time: "2021-08-17T14:20",
  },
];

function titleTodayDate() {
  const todayDate = document.getElementById("todayDate");

  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const todayDepartureDate = new Date(
    flights[0].departure_time
  ).toLocaleDateString("id-ID", optionsDate);

  todayDate.innerHTML = todayDepartureDate;
  console.log(todayDate.innerHTML, todayDepartureDate);
}

function airlinesDropdown() {
  const filterAirline = document.getElementById("filterAirlines");

  filterAirline.innerHTML = `<option value="">Semua Maskapai</option>`;

  for (const airline of airlinesData.airlines_data) {
    filterAirline.innerHTML += `<option value="${airline.Code}">${airline.Name}</option>`;
    // console.log(filterAirline.innerHTML);
  }
}

function showCardSchedule(filteredFlights) {
  const cardSchedule = document.getElementById("cardSchedule");
  cardSchedule.innerHTML = "<!-- carrrd-->";

  const filteredData = filteredFlights ? filteredFlights : flights;
  //   console.log(filteredData, "testsss");
  if (filteredData.length < 1) {
    cardSchedule.innerHTML += `<h1 class="display-6 text-center"> "Tidak Ada Jadwal Penerbangan" </h1>`;
  }

  for (const flight of filteredData) {
    const airline = airlinesData.airlines_data.find(
      (airline) => airline.Code === flight.airlines
    );
    const departureAirport = airportsData.airport_data.find(
      (airport) => airport.Code === flight.departure_airport
    );
    const arrivalAirport = airportsData.airport_data.find(
      (airport) => airport.Code === flight.arrival_airport
    );

    console.log(flight, "flight");
    console.log(departureAirport, "departureAirport");
    console.log(arrivalAirport, "arrivalAirport");

    //format tanggal
    const optionsHour = { hour: "2-digit", minute: "2-digit" };
    const isoDepartureHours = new Date(
      flight.departure_time
    ).toLocaleTimeString([], optionsHour);

    const isoArrivalHours = new Date(flight.arrival_time).toLocaleTimeString(
      [],
      optionsHour
    );

    const optionsDate = { day: "numeric", month: "long" };
    const isoDepartureDate = new Date(flight.departure_time).toLocaleDateString(
      undefined,
      optionsDate
    );
    const isoArrivalDate = new Date(flight.arrival_time).toLocaleDateString(
      undefined,
      optionsDate
    );

    cardSchedule.innerHTML += `<div class="card">
    <div class="row g-0">
    <div class="col-md-2">
    <img
    src=${airline.Logo}
    class="img-fluid"
    id="logo-maskapai"
    alt="..."
    />
    </div>
    <div class="col-md-8">
    <div class="card-body">
    <h2 class="card-title">${airline.Name}</h2>
        <div class="row">
            <div class="col">
              <small>${departureAirport.City}</small>
              <h5>${isoDepartureHours}</h5>
              <small>${isoDepartureDate}</small>
              </div>
              <div class="col">
              <img
              src="https://media1.thehungryjpeg.com/thumbs2/ori_3686943_09tpyqe6r67ba765aheypmgvqo0vltfraf4ru77u_plane-icon.jpg"
              id="logo-pesawat-kecil"
              alt=""
              />
              </div>
              <div class="col">
              <small>${arrivalAirport.City}</small>
              <h5>${isoArrivalHours}</h5>
              <small>${isoArrivalDate}</small>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>`;
  }

  //   console.log(cardSchedule.innerHTML);
}

function filterSchedule() {
  const filterAirline = document.getElementById("filterAirlines").value;
  const filterTime = document.getElementById("filterTime").value;

  const filteredFlights = flights.filter(
    (flight) =>
      (filterAirline === "" || flight.airlines === filterAirline) &&
      (filterTime === "" || isDepartureTimeWithinRange(flight, filterTime))
  );

  showCardSchedule(filteredFlights);
}

function isDepartureTimeWithinRange(flight, selectedTime) {
  const selectedHours = parseInt(selectedTime.split(":")[0], 10);
  const selectedMinutes = parseInt(selectedTime.split(":")[1], 10);

  const departureHours = parseInt(
    flight.departure_time.split("T")[1].split(":")[0],
    10
  );
  const departureMinutes = parseInt(
    flight.departure_time.split("T")[1].split(":")[1],
    10
  );

  // Bandingkan jam dan menit
  if (departureHours > selectedHours) {
    return true;
  } else if (
    departureHours === selectedHours &&
    departureMinutes >= selectedMinutes
  ) {
    return true;
  } else {
    return false;
  }
}

titleTodayDate();

airlinesDropdown();

showCardSchedule();
