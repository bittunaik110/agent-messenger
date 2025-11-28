import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const onlineIndicatorSizes = {
  sm: 'w-2.5 h-2.5 border-[1.5px]',
  md: 'w-3 h-3 border-2',
  lg: 'w-3.5 h-3.5 border-2',
  xl: 'w-4 h-4 border-2',
};

const Avatar = ({ src, alt, size = 'md', isOnline, className }: AvatarProps) => {
  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover bg-secondary',
          sizeClasses[size]
        )}
      />
      {isOnline && (
        <div
          className={cn(
            'absolute bottom-0 right-0 bg-messenger-online rounded-full border-background',
            onlineIndicatorSizes[size]
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
