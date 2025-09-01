let mediaRecorder;
let recordedBlobs;
document
  .querySelector("#startRecording")
  .addEventListener("click", (e) => startRecording(e));
document
  .querySelector("#stopRecording")
  .addEventListener("click", (e) => stopRecording(e));
document
  .querySelector("#playRecording")
  .addEventListener("click", (e) => playRecording(e));

const startRecording = () => {
  console.log("Start recording");
  //you could use media stream also instead of stream
  mediaRecorder = new MediaRecorder(stream); //make a media recorder from the constructor
  recordedBlobs = []; //an array to hold blobs for playback
  //on data available will run when the stream ends or stopped or we specifically asked for it
  mediaRecorder.ondataavailable = (e) => {
    console.log("Data available for media recorder");
    console.log(e.data);
    recordedBlobs.push(e.data); //e is the event and the data is the object on this event
  };
  mediaRecorder.start(); //star tthe feed
};
const stopRecording = () => {
  console.log("Stop recording");
  mediaRecorder.stop();
};
const playRecording = () => {
  console.log("play recording");
  const superBuffer = new Blob(recordedBlobs); //super buffer is a  buffer of our array of blobs
  const recordedVideoElement = document.querySelector("#theirVideo");
  recordedVideoElement.src = window.URL.createObjectURL(superBuffer);
  recordedVideoElement.controls = true;
  recordedVideoElement.play();
};
