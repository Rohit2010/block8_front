import msgTone from "../assets/messageNotification.mp3";

export const playAudio = () => {
    let audio = new Audio();
    audio.src = msgTone;
    audio.load();
    audio.play();
  };