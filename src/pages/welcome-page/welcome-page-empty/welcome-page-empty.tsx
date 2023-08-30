
type WelcomeScreenEmptyProps = {
  city: string;
}

function WelcomeScreenEmpty({city}: WelcomeScreenEmptyProps): JSX.Element {
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  );
}

export default WelcomeScreenEmpty;
