import {useAppDispatch, useAppSelector} from '../../hooks';
import { getCity } from '../../store/reducers/offer-process/selector';
import { ALL_CITIES } from '../../const';
import { changeCity } from '../../store/reducers/offer-process/offer-process';
import classNames from 'classnames';

function CitiesList(): JSX.Element {
  const selectedCity = useAppSelector(getCity);

  const dispatch = useAppDispatch();

  const handleCityCheck = (city: string) => {
    dispatch(changeCity(city));
  };

  return(
    <ul className="locations__list tabs__list">
      {ALL_CITIES.map((city) => (
        <li
          key={city}
          className="locations__item"
        >
          <a
            className={
              classNames('locations__item-link tabs__item',
                {'tabs__item--active': city === selectedCity}
              )
            }
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              handleCityCheck(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>))}
    </ul>
  );
}

export default CitiesList;
