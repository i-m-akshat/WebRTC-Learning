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
// document.querySelectorAll(".btn").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     document.querySelectorAll(".btn").forEach((b) => {
//       b.classList.remove("btn-success"); // remove green active look
//       b.disabled = false; // enable all
//     });

//     // make clicked one active + disabled
//     btn.classList.add("btn-success");
//     btn.disabled = true;
//   });
// });
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Skip special button (Change screen size)
    if (btn.id === "changeScreenSize") return;

    document.querySelectorAll(".btn").forEach((b) => {
      if (b.id !== "changeScreenSize") {
        b.classList.remove("btn-success"); // remove green active look
        b.disabled = false; // re-enable other buttons
      }
    });

    // make clicked one active + disabled
    btn.classList.add("btn-success");
    btn.disabled = true;
  });
});
let isMuted = false;
let stream = null;
let mediaStream = null; //init media /stream var for  our screenshare
let myVideo = document.querySelector("#myVideo");
const getMicAndCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    stream2 = await navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          console.log(device.kind, device.label, device.deviceId);
        });
      });
    console.log(stream);
    console.log(stream2);
  } catch (ex) {
    console.warn("user denied access to the media");
  }
};
const showMyFeed = (e) => {
  console.log("show feed working");
  // if (stream) {
  //   myVideo.srcObject = stream; //this will set our mediastream to our video
  //   myVideo.muted = true; //here you can mute the video so you wont get the feedback
  //   const tracks = stream.getTracks();
  //   console.log(tracks);
  // } else {
  //   alert("Media loading");
  // }

  showVid();
};
const showVid = () => {
  if (stream) {
    myVideo.srcObject = stream; //this will set our mediastream to our video
    // myVideo.muted = true; //here you can mute the video so you wont get the feedback
    const tracks = stream.getTracks();
    console.log(tracks);
    if (typeof myVideo.setSinkId === "function") {
      console.log("This browser supports changing audio output (setSinkId).");
    } else {
      console.warn("setSinkId() is not supported in this browser.");
    }
  } else {
    alert("Media loading");
  }
};
const stopMyFeed = (e) => {
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
};
// Mute / Unmute button logic
const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click", () => {
  if (!stream) return alert("No stream to mute!");

  // Find all audio tracks and toggle enabled property
  stream.getAudioTracks().forEach((track) => {
    track.enabled = isMuted; // if currently muted, unmute
  });

  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? "Unmute" : "Mute";
});
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
