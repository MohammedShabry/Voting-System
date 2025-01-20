import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "./navbar";

let currentAudio: HTMLAudioElement | null = null;

const playAudio = (audioFile: string, onEnded: () => void, isSpeakerEnabled: boolean) => {
  if (!isSpeakerEnabled) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    return;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(audioFile);
  currentAudio.play();
  currentAudio.onended = onEnded;
};

const LanguageSelection = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isSpeakerEnabled, setSpeakerEnabled] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("isSpeakerEnabled", JSON.stringify(isSpeakerEnabled));
    } catch (error) {
      console.error("Error saving speaker state to localStorage:", error);
    }
  }, [isSpeakerEnabled]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (!audioPlayed && isSpeakerEnabled) {
      playAudio(
        "/audio/welcome_en.mp3",
        () => {
          playAudio(
            "/audio/welcome_si.mp3",
            () => {
              playAudio("/audio/welcome_ta.mp3", () => {
                setAudioPlayed(true);
              }, isSpeakerEnabled);
            },
            isSpeakerEnabled
          );
        },
        isSpeakerEnabled
      );
    }
  }, [audioPlayed, isSpeakerEnabled]);

  const handleLanguageChange = (locale: string) => {
    window.gtag("event", "click", {
      event_category: "Button",
      event_label: `Select Language - ${locale}`,
    });

    let audioFile = "";
    switch (locale) {
      case "si":
        audioFile = "/audio/selected_si.mp3";
        break;
      case "ta":
        audioFile = "/audio/selected_ta.mp3";
        break;
      case "en":
      default:
        audioFile = "/audio/selected_en.mp3";
        break;
    }

    if (isSpeakerEnabled) {
      playAudio(audioFile, () => {
        i18n.changeLanguage(locale).then(() => {
          router.push("/pollingBooth/voterAuthentication", undefined, { locale });
        });
      }, isSpeakerEnabled);
    } else {
      i18n.changeLanguage(locale).then(() => {
        router.push("/pollingBooth/voterAuthentication", undefined, { locale });
      });
    }
  };

  const handleHoverAudio = (locale: string) => {
    let audioFile = "";
    switch (locale) {
      case "si":
        audioFile = "/audio/button_si.mp3";
        break;
      case "ta":
        audioFile = "/audio/button_ta.mp3";
        break;
      case "en":
      default:
        audioFile = "/audio/button_en.mp3";
        break;
    }
    playAudio(audioFile, () => {}, isSpeakerEnabled);
  };

  const toggleSpeaker = () => {
    setSpeakerEnabled((prev) => {
      const newState = !prev;
      if (!newState && currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
      return newState;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F1F1F1] to-[#B0D0E6]">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow px-6">
        <h2 className="text-center my-12 text-[#003366]">
          <div className="text-5xl font-semibold mb-6">
            <span>Please select the language</span>
          </div>
          <div className="text-5xl font-semibold mb-6">
            <span>ඔබට අවශ්‍ය භාෂාව තෝරන්න</span>
          </div>
          <div className="text-5xl font-semibold mb-6">
            <span>தயவுசெய்து மொழியைத் தேர்வு  செய்யுங்கள்</span>
          </div>
        </h2>
        <div className="space-y-6 ">
          <button
            onClick={() => handleLanguageChange("si")}
            onMouseEnter={() => handleHoverAudio("si")}
            className="w-80 bg-[#800000] text-white py-6 rounded-full shadow-lg text-2xl font-bold hover:bg-[#660000]  mx-8"
          >
            සිංහල
          </button>
          <button
            onClick={() => handleLanguageChange("ta")}
            onMouseEnter={() => handleHoverAudio("ta")}
            className="w-80 bg-[#006400] text-white py-6 rounded-full shadow-lg text-2xl font-bold hover:bg-[#228B22]  mx-8"
          >
            தமிழ்
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            onMouseEnter={() => handleHoverAudio("en")}
            className="w-80 bg-[#003366] text-white py-6 rounded-full shadow-lg text-2xl font-bold hover:bg-[#005B8D]  mx-8"
          >
            English
          </button>
        </div>
      </main>
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
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default LanguageSelection;