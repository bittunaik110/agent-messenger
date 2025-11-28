import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { User } from '@/types/messenger';

interface CallState {
  isActive: boolean;
  isIncoming: boolean;
  isConnected: boolean;
  isRinging: boolean;
  type: 'voice' | 'video' | null;
  participant: User | null;
  isMuted: boolean;
  isVideoEnabled: boolean;
  duration: number;
}

interface CallContextType {
  callState: CallState;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  startCall: (participant: User, type: 'voice' | 'video') => Promise<void>;
  answerCall: () => Promise<void>;
  declineCall: () => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  switchCamera: () => Promise<void>;
  simulateIncomingCall: (participant: User, type: 'voice' | 'video') => void;
}

const initialCallState: CallState = {
  isActive: false,
  isIncoming: false,
  isConnected: false,
  isRinging: false,
  type: null,
  participant: null,
  isMuted: false,
  isVideoEnabled: true,
  duration: 0,
};

const CallContext = createContext<CallContextType | null>(null);

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [callState, setCallState] = useState<CallState>(initialCallState);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  
  const peerRef = useRef<any>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    setCallState(initialCallState);
  }, [localStream, remoteStream]);

  // Start duration timer
  const startDurationTimer = useCallback(() => {
    durationIntervalRef.current = setInterval(() => {
      setCallState(prev => ({
        ...prev,
        duration: prev.duration + 1,
      }));
    }, 1000);
  }, []);

  // Get user media
  const getUserMedia = useCallback(async (type: 'voice' | 'video') => {
    try {
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: type === 'video' ? {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        } : false,
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }, []);

  // Start outgoing call
  const startCall = useCallback(async (participant: User, type: 'voice' | 'video') => {
    try {
      setCallState({
        ...initialCallState,
        isActive: true,
        isRinging: true,
        type,
        participant,
        isVideoEnabled: type === 'video',
      });

      const stream = await getUserMedia(type);
      
      // Dynamic import of simple-peer to avoid SSR issues
      const Peer = (await import('simple-peer')).default;
      
      // Create peer connection as initiator
      peerRef.current = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peerRef.current.on('signal', (data: any) => {
        // In real app: send signal via Socket.IO/Supabase Realtime
        console.log('Outgoing signal:', data);
      });

      peerRef.current.on('stream', (remoteStream: MediaStream) => {
        setRemoteStream(remoteStream);
      });

      peerRef.current.on('connect', () => {
        console.log('Peer connected!');
      });

      peerRef.current.on('error', (err: Error) => {
        console.error('Peer error:', err);
      });

      // Simulate call being answered after 3 seconds (demo mode)
      setTimeout(() => {
        setCallState(prev => {
          if (prev.isActive && prev.isRinging) {
            return {
              ...prev,
              isRinging: false,
              isConnected: true,
            };
          }
          return prev;
        });
        if (callState.isActive) {
          startDurationTimer();
        }
      }, 3000);

    } catch (error) {
      console.error('Error starting call:', error);
      cleanup();
    }
  }, [getUserMedia, cleanup, startDurationTimer, callState.isActive]);

  // Simulate incoming call (for demo)
  const simulateIncomingCall = useCallback((participant: User, type: 'voice' | 'video') => {
    setCallState({
      ...initialCallState,
      isActive: true,
      isIncoming: true,
      isRinging: true,
      type,
      participant,
      isVideoEnabled: type === 'video',
    });

    // Auto-decline after 30 seconds if not answered
    setTimeout(() => {
      setCallState(prev => {
        if (prev.isRinging && prev.isIncoming) {
          cleanup();
          return initialCallState;
        }
        return prev;
      });
    }, 30000);
  }, [cleanup]);

  // Answer incoming call
  const answerCall = useCallback(async () => {
    if (!callState.type || !callState.isIncoming) return;

    try {
      const stream = await getUserMedia(callState.type);
      
      // Dynamic import of simple-peer
      const Peer = (await import('simple-peer')).default;
      
      peerRef.current = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peerRef.current.on('signal', (data: any) => {
        // In real app: send answer signal via Socket.IO/Supabase Realtime
        console.log('Answer signal:', data);
      });

      peerRef.current.on('stream', (remoteStream: MediaStream) => {
        setRemoteStream(remoteStream);
      });

      setCallState(prev => ({
        ...prev,
        isIncoming: false,
        isRinging: false,
        isConnected: true,
      }));

      startDurationTimer();
    } catch (error) {
      console.error('Error answering call:', error);
      cleanup();
    }
  }, [callState.type, callState.isIncoming, getUserMedia, startDurationTimer, cleanup]);

  // Decline incoming call
  const declineCall = useCallback(() => {
    // In real app: send decline signal via Socket.IO/Supabase Realtime
    cleanup();
  }, [cleanup]);

  // End active call
  const endCall = useCallback(() => {
    // In real app: send end signal via Socket.IO/Supabase Realtime
    cleanup();
  }, [cleanup]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setCallState(prev => ({
          ...prev,
          isMuted: !audioTrack.enabled,
        }));
      }
    }
  }, [localStream]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCallState(prev => ({
          ...prev,
          isVideoEnabled: videoTrack.enabled,
        }));
      }
    }
  }, [localStream]);

  // Switch camera
  const switchCamera = useCallback(async () => {
    if (!localStream || callState.type !== 'video') return;

    try {
      const currentTrack = localStream.getVideoTracks()[0];
      const currentFacingMode = currentTrack.getSettings().facingMode;
      const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
        audio: false,
      });

      const newVideoTrack = newStream.getVideoTracks()[0];
      
      // Replace track in peer connection
      if (peerRef.current) {
        const sender = peerRef.current._pc?.getSenders()?.find(
          (s: RTCRtpSender) => s.track?.kind === 'video'
        );
        if (sender) {
          sender.replaceTrack(newVideoTrack);
        }
      }

      // Replace track in local stream
      localStream.removeTrack(currentTrack);
      currentTrack.stop();
      localStream.addTrack(newVideoTrack);
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  }, [localStream, callState.type]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  return (
    <CallContext.Provider
      value={{
        callState,
        localStream,
        remoteStream,
        startCall,
        answerCall,
        declineCall,
        endCall,
        toggleMute,
        toggleVideo,
        switchCamera,
        simulateIncomingCall,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};
