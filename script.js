// const constraints = {
//   video: true,
//   audio: true,
// };

// const openMediaDevices = async (constraints) => {
//   return await navigator.mediaDevices.getUserMedia(constraints);
// };

// try {
//   const stream = await openMediaDevices(constraints);
//   console.log("Got Media Stream", stream);
// } catch (error) {
//   console.error(error);
// }

// const openMediaDevices = async (constraints) => {
//   return await navigator.mediaDevices.getUserMedia(constraints);
// };

// try {
//   const stream = openMediaDevices({ video: true, audio: true });
//   console.log("Got MediaStream:", await stream);
// } catch (error) {
//   console.error("Error accessing media devices.", error);
// }
// const constraints = {
//   video: true,
//   audio: true,
// };
// navigator.mediaDevices
//   .getUserMedia(constraints)
//   .then((stream) => {
//     console.log("Got MediaStream:", stream);
//   })
//   .catch((error) => {
//     console.error("Error accessing media devices.", error);
//   });
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".btn").forEach((b) => {
      b.classList.remove("btn-success"); // remove green active look
      b.disabled = false; // enable all
    });

    // make clicked one active + disabled
    btn.classList.add("btn-success");
    btn.disabled = true;
  });
});

let stream = null;
const myVideo = document.querySelector("#myVideo");
const getMicAndCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(stream);
  } catch (ex) {
    console.warn("user denied access to the media");
  }
};
const showMyFeed = (e) => {
  console.log("show feed working");
  myVideo.srcObject = stream; //this will set our mediastream to our video
  const tracks = stream.getTracks();
  console.log(tracks);
};
const stopMyFeed = (e) => {
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
};
document.querySelector("#showMyVideo").addEventListener("click", (e) => {
  showMyFeed(e);
});
const shareMicAndCamera = document.getElementById("shareMicAndCamera");
shareMicAndCamera.addEventListener("click", (e) => {
  getMicAndCamera(e);
});

document.querySelector("#stopMyVideo").addEventListener("click", (e) => {
  stopMyFeed(e);
});
