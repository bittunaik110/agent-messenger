import { useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  SwitchCamera,
  Volume2,
  Minimize2
} from 'lucide-react';
import { User } from '@/types/messenger';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

interface ActiveCallScreenProps {
  participant: User;
  callType: 'voice' | 'video';
  isConnected: boolean;
  isRinging: boolean;
  isMuted: boolean;
  isVideoEnabled: boolean;
  duration: number;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onSwitchCamera: () => void;
  onEndCall: () => void;
  onMinimize?: () => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const ActiveCallScreen = ({
  participant,
  callType,
  isConnected,
  isRinging,
  isMuted,
  isVideoEnabled,
  duration,
  localStream,
  remoteStream,
  onToggleMute,
  onToggleVideo,
  onSwitchCamera,
  onEndCall,
  onMinimize,
}: ActiveCallScreenProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Set local video stream
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Set remote video stream
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const isVideoCall = callType === 'video';

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col safe-top safe-bottom">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          {onMinimize && (
            <button 
              onClick={onMinimize}
              className="p-2 text-white/80 active:opacity-70"
            >
              <Minimize2 className="w-6 h-6" />
            </button>
          )}
          <div className="flex-1" />
          <div className="text-white text-center">
            <p className="font-semibold">{participant.name}</p>
            <p className="text-sm text-white/60">
              {isRinging ? 'Calling...' : isConnected ? formatDuration(duration) : 'Connecting...'}
            </p>
          </div>
          <div className="flex-1" />
          <div className="w-10" />
        </div>
      </div>

      {/* Main content */}
      {isVideoCall ? (
        <>
          {/* Remote video (full screen) */}
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <Avatar src={participant.avatar} alt={participant.name} size="xl" />
                <p className="text-white mt-4">{participant.name}</p>
                <p className="text-white/60 text-sm mt-1">
                  {isRinging ? 'Ringing...' : 'Connecting video...'}
                </p>
              </div>
            </div>
          )}

          {/* Local video (PIP) */}
          {localStream && isVideoEnabled && (
            <div className="absolute top-20 right-4 w-28 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </div>
          )}
        </>
      ) : (
        /* Voice call UI */
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
          <div className="relative">
            <Avatar src={participant.avatar} alt={participant.name} size="xl" />
            {isConnected && (
              <>
                <div className="absolute -inset-4 border-4 border-green-500/30 rounded-full animate-pulse" />
                <div className="absolute -inset-8 border-2 border-green-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-white mt-8">{participant.name}</h2>
          <p className="text-lg text-white/60 mt-2">
            {isRinging ? 'Ringing...' : isConnected ? formatDuration(duration) : 'Connecting...'}
          </p>

          {/* Audio visualizer placeholder */}
          {isConnected && (
            <div className="flex items-center gap-1 mt-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 24 + 8}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex items-center justify-center gap-4">
          {/* Mute */}
          <button
            onClick={onToggleMute}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-all",
              isMuted ? "bg-white text-black" : "bg-white/20 text-white"
            )}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {/* Video toggle (video call only) */}
          {isVideoCall && (
            <button
              onClick={onToggleVideo}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-all",
                !isVideoEnabled ? "bg-white text-black" : "bg-white/20 text-white"
              )}
            >
              {isVideoEnabled ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </button>
          )}

          {/* Switch camera (video call only) */}
          {isVideoCall && (
            <button
              onClick={onSwitchCamera}
              className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all"
            >
              <SwitchCamera className="w-6 h-6" />
            </button>
          )}

          {/* Speaker (voice call only) */}
          {!isVideoCall && (
            <button
              className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          )}

          {/* End call */}
          <button
            onClick={onEndCall}
            className="w-16 h-16 rounded-full bg-destructive text-white flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-destructive/30"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveCallScreen;
