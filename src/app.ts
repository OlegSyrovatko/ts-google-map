import axios from "axios";

const myForm = document.querySelector("Form")! as HTMLFormElement;
const myInput = document.getElementById("query")! as HTMLInputElement;
const googleApi = "AIzaSyBMS69yFjuVahxcPiHroI3VRDMnfVk9pyc";

type GoogleResponceGeneric = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function clickHandler(e: Event) {
  e.preventDefault();
  const query = myInput.value;
  console.log(query);
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
      console.log(res.data.results[0].geometry.location);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

myForm.addEventListener("submit", clickHandler);
