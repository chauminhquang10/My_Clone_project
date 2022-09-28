import { icons } from './data';

interface StmIconProps {
  src: keyof typeof icons;
}

const StmIcon = ({ src }: StmIconProps) => <img src={icons[src]} />;

export default StmIcon;
