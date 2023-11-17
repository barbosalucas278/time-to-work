export const TextToSpeech = () => {
  const loadVoicesWhenAvailable = () => {
    const _speechSynth = window.speechSynthesis;
    const _voices = _speechSynth.getVoices();
    if (_voices.length !== 0) {
      return _voices;
    } else {
      return setTimeout(function () {
        loadVoicesWhenAvailable();
      }, 100);
    }
  };
  const handlePlay = (text) => {
    const utterThis = new SpeechSynthesisUtterance();
    const voices = loadVoicesWhenAvailable();
    utterThis.text = text;
    utterThis.voice = voices[0];
    window.speechSynthesis?.speak(utterThis);
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
  };

  return [handlePlay, handleStop];
};
