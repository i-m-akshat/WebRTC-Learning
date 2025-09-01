const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(supportedConstraints);
const vidHeight = document.getElementById("vidHeight");
const vidWidth = document.getElementById("vidWidth");
document.querySelector("#changeScreenSize").addEventListener("click", (e) => {
  changeVideoSize(vidHeight.value, vidWidth.value);
});

const changeVideoSize = (height, width) => {
  stream.getVideoTracks().forEach((track) => {
    //track is a video track
    //we can get its capabilites from get capabilities
    // or we can apply new constraints via applyConstraints();
    const cap = track.getCapabilities();
    // vidHeight.value = cap.height?.max;
    // vidWidth.value = cap.width?.max;
    console.log("provided:" + height + " " + width);
    const vConstraints = {
      height: { exact: height },
      width: { exact: width },
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
