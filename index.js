let panorama;

function randomView() {
  var coordinates;
  const sv = new google.maps.StreetViewService();

  // Choose between England and Ireland (approx.)
  if (Math.random() > 0.5) {
    coordinates = {lat: getRandomInt(51, 52), lng: getRandomInt(-2, 0)};
    } else {
    coordinates = {lat: getRandomInt(52, 54), lng: getRandomInt(-9, -7)};
    };

  // Panorama
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano")
  );
  
  // Remove location text
  panorama.setOptions({
    showRoadLabels: false,
    addressControl: false,
  });
  sv.getPanorama({ location: coordinates, radius: 500 }).then(processData).catch((e) =>
        window.location.reload() // Reload if no Street View available
      );

  // Buttons
  const revealControlDiv = document.getElementById("reveal");
  revealControl(revealControlDiv, panorama);
  panorama.controls[google.maps.ControlPosition.TOP_CENTER].push(revealControlDiv);
  const reloadControlDiv = document.getElementById("reload");
  reloadControl(reloadControlDiv, panorama);
  panorama.controls[google.maps.ControlPosition.TOP_CENTER].push(reloadControlDiv);
}


function processData({ data }) {
  const location = data.location;
  panorama.setPano(location.pano);
  panorama.setPov({
    heading: 270,
    pitch: 0,
  });
  panorama.setVisible(true);
}


function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}


function revealControl(controlDiv, panorama) {
  controlDiv.title = "Click to reveal the location";
  controlDiv.addEventListener("click", () => {
    panorama.setOptions({
    showRoadLabels: true,
    addressControl: true,
  });
  });
}


function reloadControl(controlDiv, panorama) {
  controlDiv.title = "Click to try a new location";
  controlDiv.addEventListener("click", () => {
    window.location.reload()
  });
}
