import axios from "axios";

const myForm = document.querySelector("Form")! as HTMLFormElement;
const myInput = document.getElementById("query")! as HTMLInputElement;
// restricted by my Ip addresses
const googleApi = "AIzaSyBMS69yFjuVahxcPiHroI3VRDMnfVk9pyc";
declare var google: any;

type GoogleResponceGeneric = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function clickHandler(e: Event) {
  e.preventDefault();
  const query = myInput.value;
  axios
    .get<GoogleResponceGeneric>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        query
      )}&key=${googleApi}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Could not catch location!");
      }
      const coord = res.data.results[0].geometry.location;

      const map = new google.maps.Map(document.getElementById("map"), {
        center: coord,
        zoom: 8,
      });

      new google.maps.Marker({ position: coord, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

myForm.addEventListener("submit", clickHandler);
