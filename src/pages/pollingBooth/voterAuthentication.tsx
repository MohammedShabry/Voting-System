import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Navbar from "./navbar";

const playAudio = (audioPath: string, audioInstance: HTMLAudioElement, onEnded: () => void) => {
  if (!audioInstance.paused) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }
  audioInstance.src = audioPath;
  audioInstance.play();
  audioInstance.onended = onEnded;
};

const VoterAuthentication = () => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
  const [isSpeakerEnabled, setSpeakerEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newAudioInstance = new Audio();
      setAudioInstance(newAudioInstance);
      const savedSpeakerState = localStorage.getItem("isSpeakerEnabled");
      if (savedSpeakerState !== null) {
        setSpeakerEnabled(JSON.parse(savedSpeakerState));
      }
    }
  }, []);

  const playSequentialAudio = (audioPaths: string[], onComplete: () => void) => {
    if (!audioInstance || !isSpeakerEnabled) return;
    let currentIndex = 0;
    const playNext = () => {
      if (currentIndex < audioPaths.length) {
        playAudio(audioPaths[currentIndex], audioInstance, playNext);
        currentIndex++;
      } else {
        onComplete();
      }
    };
    playNext();
  };

  const startCamera = () => {
    setLoading(true);
    window.gtag("event", "click", {
      event_category: "Button",
      event_label: "Start Camera",
    });
    if (audioInstance) {
      let audioPaths: string[] = [];
      switch (locale) {
        case "si":
          audioPaths = ["/audio/auth_start_camera_si.mp3", "/audio/auth_success_si.mp3"];
          break;
        case "ta":
          audioPaths = ["/audio/auth_start_camera_ta.mp3", "/audio/auth_success_ta.mp3"];
          break;
        case "en":
        default:
          audioPaths = ["/audio/auth_start_camera_en.mp3", "/audio/auth_success_en.mp3"];
          break;
      }
      if (isSpeakerEnabled) {
        playSequentialAudio(audioPaths, () => {
          router.push("/pollingBooth/CandidateSelection");
        });
      } else {
        router.push("/pollingBooth/CandidateSelection");
      }
    }
  };

  useEffect(() => {
    if (audioInstance && isSpeakerEnabled) {
      let welcomeAudioPaths: string[] = [];
      switch (locale) {
        case "si":
          welcomeAudioPaths = ["/audio/auth_welcome_si.mp3"];
          break;
        case "ta":
          welcomeAudioPaths = ["/audio/auth_welcome_ta.mp3"];
          break;
        case "en":
        default:
          welcomeAudioPaths = ["/audio/auth_welcome_en.mp3"];
          break;
      }
      playSequentialAudio(welcomeAudioPaths, () => {});
    }
  }, [locale, audioInstance, isSpeakerEnabled]);

  const toggleSpeaker = () => {
    setSpeakerEnabled((prev) => {
      const newState = !prev;
      try {
        localStorage.setItem("isSpeakerEnabled", JSON.stringify(newState));
      } catch (error) {
        console.error("Error saving speaker state:", error);
      }
      return newState;
    });
  };

  const playButtonHoverAudio = () => {
    if (audioInstance && isSpeakerEnabled) {
      let hoverAudioPaths: string[] = [];
      switch (locale) {
        case "si":
          hoverAudioPaths = ["/audio/auth_hover_start_si.mp3"];
          break;
        case "ta":
          hoverAudioPaths = ["/audio/auth_hover_start_ta.mp3"];
          break;
        case "en":
        default:
          hoverAudioPaths = ["/audio/auth_hover_start_en.mp3"];
          break;
      }
      playSequentialAudio(hoverAudioPaths, () => {});
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F1F1F1] to-[#B0D0E6]">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow px-6 py-12">
        <h2 className="text-center text-[#003366] text-5xl font-semibold mb-6">
          {t("authInstruction")}
        </h2>
        <div className="relative w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-[#e0e0e0] rounded-full mb-6 flex justify-center items-center border-4 border-[#003366]">
          {isLoading ? (
            <div className="text-center text-2xl text-[#003366]">Initializing Camera...</div>
          ) : (
            <div className="text-center text-xl text-[#003366]">
              <span>Place your face inside the circle</span>
            </div>
          )}
        </div>
        <button
          onClick={startCamera}
          className={`w-80 ${isLoading ? 'bg-gray-400' : 'bg-[#006400]'} text-white py-6 rounded-full shadow-lg text-3xl font-bold hover:bg-[#228B22]  mt-6 focus:ring-4 focus:ring-[#FFD700]`}
          disabled={isLoading}
          onMouseEnter={playButtonHoverAudio}
        >
          {isLoading ? "Please Wait..." : t("startButton")}
        </button>
        <div
          onClick={toggleSpeaker}
          className="fixed bottom-20 right-14 cursor-pointer"
          title={isSpeakerEnabled ? "Disable Audio" : "Enable Audio"}
        >
          <img
            src={isSpeakerEnabled ? "/assets/images/volume.png" : "/assets/images/mute.png"}
            alt={isSpeakerEnabled ? "Speaker On" : "Speaker Off"}
            className="w-20 h-20"
          />
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default VoterAuthentication;