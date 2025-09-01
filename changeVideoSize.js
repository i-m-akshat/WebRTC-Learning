const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(supportedConstraints);

document.querySelector("#changeScreenSize").addEventListener("click", (e) => {
  changeVideoSize();
});

const changeVideoSize = () => {
  stream.getVideoTracks().forEach((track) => {
    //track is a video track
    //we can get its capabilites from get capabilities
    // or we can apply new constraints via applyConstraints();
    const cap = track.getCapabilities();
    console.log("Capabilities", cap);
    // vidHeight.value = cap.height?.max;
    // vidWidth.value = cap.width?.max;
    const vidHeight = document.getElementById("vidHeight").value;
    const vidWidth = document.getElementById("vidWidth").value;
    console.log("provided: height" + vidHeight + "width: " + vidWidth);
    const vConstraints = {
      height: { ideal: vidHeight }, //for exact use exact for it to be flexible use ideal
      width: { ideal: vidWidth },
      //   width: 200,
      //   frameRate: 60,

      //   aspectRatio: 10,
    };
    track.applyConstraints(vConstraints);
  });
  //   stream.getTracks().forEach((track) => {
  //     const cap = track.getCapabilities();
  //     console.log(cap);
  //   });
};
