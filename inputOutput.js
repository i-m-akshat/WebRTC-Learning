const audioInputEl = document.querySelector("#audio-input");
const audioOutputEl = document.querySelector("#audio-output");
const videoInputEl = document.querySelector("#video-input");

const getDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    devices.forEach((device) => {
      const option = document.createElement("option"); //create the option tag
      option.value = device.deviceId;
      option.text = device.label;
      if (device.kind === "audioinput") {
        audioInputEl.appendChild(option);
      } else if (device.kind === "audiooutput") {
        audioOutputEl.appendChild(option);
      } else if (device.kind === "videoinput") {
        videoInputEl.appendChild(option);
      }
    });
  } catch (er) {
    console.error(er);
  }
};
getDevices();

const changeAudioInput = async (e) => {
  try {
    const id = e.target.value; //getting deviceid
    const constraints = {
      audio: { deviceId: { exact: id } },
      video: true,
    };
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    const tracks = stream.getAudioTracks();
    console.log("on audio input the tracks on stream is", tracks);
    showVid();
  } catch (er) {
    console.error(er);
  }
};
const changeAudioOutput = async (e) => {
  try {
    await myVideo.setSinkId(e.target.value);
    console.log("Audio output changed to:", e.target.value);
  } catch (err) {
    console.error("Error changing audio output:", err);
  }
};

const changeVideoInput = async (e) => {
  try {
    const vidDeviceId = e.target.value;
    const constraints = {
      audio: true,
      video: { deviceId: { exact: vidDeviceId } },
    };
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    const tracks = await stream.getVideoTracks();
    console.log("on video input the tracks on stream is", tracks);
    showVid();
  } catch (er) {
    console.error(er);
  }
};

audioInputEl.addEventListener("change", (e) => changeAudioInput(e));
audioOutputEl.addEventListener("change", (e) => changeAudioOutput(e));
videoInputEl.addEventListener("change", (e) => changeVideoInput(e));
