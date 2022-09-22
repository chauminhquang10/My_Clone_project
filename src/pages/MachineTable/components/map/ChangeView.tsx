import { useMap } from 'react-leaflet';
import type { MapProps } from './Map';

interface ChangeViewProps extends Pick<MapProps, 'coordinate'> {
  zoom: number;
}

export default function ChangeView({ coordinate, zoom }: ChangeViewProps) {
  const map = useMap();
  map.setView(coordinate, zoom);
  return null;
}
