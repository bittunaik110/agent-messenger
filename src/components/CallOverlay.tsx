import { useCall } from '@/contexts/CallContext';
import IncomingCallScreen from './IncomingCallScreen';
import ActiveCallScreen from './ActiveCallScreen';

const CallOverlay = () => {
  const {
    callState,
    localStream,
    remoteStream,
    answerCall,
    declineCall,
    endCall,
    toggleMute,
    toggleVideo,
    switchCamera,
  } = useCall();

  // No active call
  if (!callState.isActive) {
    return null;
  }

  // Incoming call (not yet answered)
  if (callState.isIncoming && callState.isRinging && callState.participant && callState.type) {
    return (
      <IncomingCallScreen
        participant={callState.participant}
        callType={callState.type}
        onAnswer={answerCall}
        onDecline={declineCall}
      />
    );
  }

  // Active call (outgoing or answered)
  if (callState.participant && callState.type) {
    return (
      <ActiveCallScreen
        participant={callState.participant}
        callType={callState.type}
        isConnected={callState.isConnected}
        isRinging={callState.isRinging}
        isMuted={callState.isMuted}
        isVideoEnabled={callState.isVideoEnabled}
        duration={callState.duration}
        localStream={localStream}
        remoteStream={remoteStream}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onSwitchCamera={switchCamera}
        onEndCall={endCall}
      />
    );
  }

  return null;
};

export default CallOverlay;
