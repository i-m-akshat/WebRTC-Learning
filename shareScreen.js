const shareScreen = async () => {
  const options = {
    video: true,
    audio: true,
    surfaceSwitching: "include", //exclude or include not true or false lets you switch tabs
  };
  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia();
    document.querySelector("#theirVideo").srcObject = mediaStream;
  } catch (ex) {
    console.log(ex);
  }
};
const stopScreenSharing = async () => {
  try {
    mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    document.querySelector("#theirVideo").srcObject = null;
  } catch (er) {
    console.error(er);
  }
};
document.querySelector("#shareScreen").addEventListener("click", (e) => {
  shareScreen(e);
});
document.querySelector("#stopScreenSharing").addEventListener("click", (e) => {
  stopScreenSharing(e);
});
