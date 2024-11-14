import { Loader2 } from 'lucide-react';

type Props = {
  color?: string;
};

function LoadingButton({ color = "white" }: Props) {
  return (
    <Loader2 color={color} className="mr-2 h-6 w-6 animate-spin" />
  );
}

export default LoadingButton;
