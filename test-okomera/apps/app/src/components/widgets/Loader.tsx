import { ProgressCircleRing, ProgressCircleRoot } from '@/components/ui/progress-circle';

const Loader = () => {
  return (
    <ProgressCircleRoot value={null} size="sm">
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  );
};

export default Loader;
