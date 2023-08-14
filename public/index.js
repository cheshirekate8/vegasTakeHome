const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");
tabLinks[0].classList.add("active");

tabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    tabLinks.forEach((tabLink) => {
      tabLink.classList.remove("active");
    });
    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });

    const tabId = link.getAttribute("data-tab");
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.remove("hidden");
    link.classList.add("active");
  });
});

function monify(amount) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return new Intl.NumberFormat("en-US", options).format(amount);
}

async function loadHotels() {
  const response = await fetch("/api/hotels/index");
  const hotels = await response.json();
  const list = document.querySelector(".hotels-list");

  hotels.list.forEach((hotel) => {
    const hotelLi = document.createElement("li");
    hotelLi.innerHTML = `<span>${hotel.name}</span> <span>${monify(
      hotel.price
    )}</span>`;
    list.appendChild(hotelLi);
  });
}

loadHotels();

async function loadHotel(name) {
  const response = await fetch(`/api/hotels/${name}`);
  const hotel = await response.json();

  const image = document.querySelector(".product-image");
  image.setAttribute("src", hotel.media[0].href);
  image.setAttribute("alt", `Image of the ${hotel.name} hotel`);

  const title = document.querySelector(".title");
  title.innerHTML = hotel.name;

  const rating = document.querySelector(".rating");
  if (hotel.starRating >= 4.5) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
  } else if (hotel.starRating >= 3.5) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
  } else if (hotel.starRating >= 2.5) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
  } else if (hotel.starRating >= 1.5) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i>`;
  } else {
    rating.innerHTML = `<i class="fas fa-star"></i>`;
  }

  const phone = document.querySelector(".phone");
  phone.innerHTML = `<i class="fas fa-phone"></i> ${hotel.phoneNumber}`;

  const address = document.querySelector(".address");
  address.innerHTML = `<i class="fa fa-map-marker"></i> ${hotel.location.areaName}`;
  address.addEventListener("click", (e) => {
    e.preventDefault();

    tabLinks.forEach((tabLink) => {
      tabLink.classList.remove("active");
    });
    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });

    tabLinks[2].classList.add("active");
    document.getElementById("location").classList.remove("hidden");
  });

  const price = document.querySelector(".price");
  price.innerHTML = `<div class="price-number">$${hotel.price}</div><div>HOTEL ROOMS FROM</div>`;

  const descriptionElement = document.querySelector(".description");
  const showHideDesc = document.querySelector(".show-hide-desc");
  const upDownIconDesc = document.querySelector(".up-down-icon-desc");

  const descParagraphs = hotel.description.replace(/\n$/gm, "").split("\n");
  const longText = hotel.description;
  const shortText = descParagraphs[0] + descParagraphs[1].slice(0, -2);

  descriptionElement.innerText = shortText;
  showHideDesc.innerText = "SHOW FULL DESCRIPTION";

  const expandDescButton = document.querySelector(".expand-desc");
  expandDescButton.addEventListener("click", () => {
    if (descriptionElement.innerText.length === shortText.length) {
      descriptionElement.innerText = longText;
      showHideDesc.innerText = "HIDE FULL DESCRIPTION";
      upDownIconDesc.classList.remove("fa-chevron-circle-down");
      upDownIconDesc.classList.add("fa-chevron-circle-up");
    } else {
      descriptionElement.innerText = shortText;
      showHideDesc.innerText = "SHOW FULL DESCRIPTION";
      upDownIconDesc.classList.remove("fa-chevron-circle-up");
      upDownIconDesc.classList.add("fa-chevron-circle-down");
    }
  });

  const details = document.querySelector(".details");
  const showHideDet = document.querySelector(".show-hide-det");
  showHideDet.innerText = "VIEW MORE DETAILS";
  let detailsString = "";

  hotel.details.forEach((detail) => {
    const detailLi = `<li><label>${detail.label}:</label><div>${detail.value}</div></li><br>`;
    detailsString += detailLi;
  });

  const detParagraphs = detailsString.split("<br>");
  const longDetails = detailsString.slice(0, -4);
  const shortDetails = detParagraphs[0] + "<br>" + detParagraphs[1];
  details.innerHTML = shortDetails;
  const upDownIconDet = document.querySelector(".up-down-icon-det");

  const expandDetButton = document.querySelector(".expand-det");
  expandDetButton.addEventListener("click", () => {
    if (details.innerHTML === shortDetails) {
      details.innerHTML = longDetails;
      showHideDet.innerText = "VIEW LESS DETAILS";
      upDownIconDet.classList.remove("fa-chevron-circle-down");
      upDownIconDet.classList.add("fa-chevron-circle-up");
    } else {
      details.innerHTML = shortDetails;
      showHideDet.innerText = "VIEW MORE DETAILS";
      upDownIconDet.classList.remove("fa-chevron-circle-up");
      upDownIconDet.classList.add("fa-chevron-circle-down");
    }
  });

  const mapAddress = document.querySelector(".map-address");
  const mapImage = document.querySelector(".map-image");
  mapAddress.innerHTML = `<i class="fa fa-map-marker"></i> ${hotel.location.address}, ${hotel.location.city}, ${hotel.location.state} ${hotel.location.postalCode}`;
  mapImage.setAttribute("src", hotel.media[1].href);
  mapImage.setAttribute(
    "alt",
    `A map of the ${hotel.name} hotel and surrounding streets`
  );
}

loadHotel("venetian");
