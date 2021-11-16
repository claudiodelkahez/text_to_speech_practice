const textarea = document.querySelector("textarea");
voiceList = document.querySelector("select");
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;

voices();

function voices() {
    for (let voice of synth.getVoices()) {
        // defines "Google US English" as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        //creating a option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name}(${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        //if the available device voice name is equal to the user selected voice name
        //then set the speech voice to the user selected voice
        if (voice.name === voiceList.value) {
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance); //speak the speech/utternance
};

speechBtn.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) { //If an utternance/speech is not currently in the process of speaking
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            //If speaking is true the change it's value to false ajnd resume the utternace/speech
            //else change it's value to true anda pause the speech
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";

            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";

            }

            //checking is utternance/speech in speaking process or not in every 100ms
            //if not then set the value of isSpeaking to true and change the button text
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Covert To Speach";

                }
            });

        } else {
            speechBtn.innerText = "Convert To Speech";
        }
    }
});