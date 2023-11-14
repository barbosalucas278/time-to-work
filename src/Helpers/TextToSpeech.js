export const TextToSpeech = () => {
  const handlePlay = (text) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis?.speak(msg);
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
  };

  return [handlePlay, handleStop];
};
