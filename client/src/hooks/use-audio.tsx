import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggle: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

const YOUTUBE_VIDEO_ID = "OLC-1ubtd-4";

export function AudioProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load YouTube API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === 1) setIsPlaying(true);
            if (event.data === 2) setIsPlaying(false);
          },
        },
      });
    };
  }, []);

  const toggle = () => {
    if (!playerRef.current) return;

    const state = playerRef.current.getPlayerState();

    if (state !== 1) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggle }}>
      {children}

      {/* Hidden YouTube Player */}
      <div
        id="youtube-player"
        style={{ position: "fixed", width: 0, height: 0, opacity: 0 }}
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
