class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.resetBtn = document.querySelector(".reset-button");

    this.currentKick = "./sounds/kick-gritty.wav";
    this.currentSnare = "./sounds/snare-tape.wav";
    this.currentHihat = "./sounds/hihat-ring.wav";
    this.currentTom = "./sounds/tom-rototom.wav";
    this.currentOpenhat = "./sounds/openhat-slick.wav";
    this.currentperc = "./sounds/perc-weirdo.wav";
    this.currentclap = "./sounds/clap-tape.wav";

    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.tomAudio = document.querySelector(".tom-sound");
    this.openhatAudio = document.querySelector(".openhat-sound");
    this.percAudio = document.querySelector(".perc-sound");
    this.clapAudio = document.querySelector(".clap-sound");

    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;

    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step =
      this.index %
      8; /**this create the loop of 8 elements. 8 is the quantity of pads (0-7) */
    const activeBars = document.querySelectorAll(`.b${step}`);

    //loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      //check if pads are active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("tom-pad")) {
          this.tomAudio.currentTime = 0;
          this.tomAudio.play();
        }
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
        if (bar.classList.contains("perc-pad")) {
          this.percAudio.currentTime = 0;
          this.percAudio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;

    //check if it's playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);

      //update play button
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
      this.resetBtn.disabled = true;
      this.resetBtn.classList.add("disabled-button");
    } else {
      // remove interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;

      //update play button
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
      this.resetBtn.disabled = false;
      this.resetBtn.classList.remove("disabled-button");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "tom-select":
        this.tomAudio.src = selectionValue;
        break;
      case "openhat-select":
        this.openhatAudio.src = selectionValue;
        break;
      case "perc-select":
        this.percAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0": {
          this.kickAudio.volume = 0;
          break;
        }
        case "1": {
          this.snareAudio.volume = 0;
          break;
        }
        case "2": {
          this.hihatAudio.volume = 0;
          break;
        }
        case "3": {
          this.tomAudio.volume = 0;
          break;
        }
        case "4": {
          this.openhatAudio.volume = 0;
          break;
        }
        case "5": {
          this.percAudio.volume = 0;
          break;
        }
        case "6": {
          this.clapAudio.volume = 0;
          break;
        }
      }
    } else {
      switch (muteIndex) {
        case "0": {
          this.kickAudio.volume = 1;
          break;
        }
        case "1": {
          this.snareAudio.volume = 1;
          break;
        }
        case "2": {
          this.hihatAudio.volume = 1;
          break;
        }
        case "3": {
          this.tomAudio.volume = 1;
          break;
        }
        case "4": {
          this.openhatAudio.volume = 1;
          break;
        }
        case "5": {
          this.percAudio.volume = 1;
          break;
        }
        case "6": {
          this.clapAudio.volume = 1;
          break;
        }
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");

    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }

  resetpage() {
    location.reload();
  }
}

const drumKit = new DrumKit();

//Event listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
});
drumKit.resetBtn.addEventListener("click", function () {
  drumKit.resetpage();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e); //stop the play button
});
