import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { Offer, OfferCard } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer | OfferCard |undefined;
  isDetailPage?: boolean;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT as string,
  iconSize: [26, 39],
  iconAnchor: [26, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [26, 39],
  iconAnchor: [26, 39]
});

function Map({offers, selectedOffer, isDetailPage}: MapProps): JSX.Element {
  let cityLocation = offers[0]?.city.location;

  if (!offers.length && selectedOffer) {
    cityLocation = selectedOffer.city.location;
  }

  const {map, mapRef} = useMap({cityLocation});

  useEffect(() => {
    if (map) {
      if (cityLocation) {
        map.setView(
          {
            lat: cityLocation.latitude,
            lng: cityLocation.longitude,
          },
          cityLocation.zoom,
        );
      }
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      if (isDetailPage && selectedOffer) {
        const markerSelected = new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude,
        });
        markerSelected
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });


        marker
          .setIcon(selectedOffer !== undefined && offer.id === selectedOffer.id
            ? currentCustomIcon
            : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, isDetailPage]);

  return (
    <div ref={mapRef} ></div>
  );
}

export default Map;
