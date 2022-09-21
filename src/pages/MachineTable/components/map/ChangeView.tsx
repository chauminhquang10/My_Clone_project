import { useMap } from 'react-leaflet';
import { MapProps } from './Map';

interface ChangeViewProps extends MapProps {
  zoom: number;
}

export default function ChangeView({ coordinate, zoom }: ChangeViewProps) {
  const map = useMap();
  map.setView(coordinate, zoom);
  return null;
}
