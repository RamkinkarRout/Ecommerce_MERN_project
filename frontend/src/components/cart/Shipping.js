import React, { Fragment, useState } from "react";
import "./shipping.css";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import DomainIcon from "@material-ui/icons/Domain";
import PhoneIcon from "@material-ui/icons/Phone";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo } = useSelector(
    (state) => state.cart
  );
  const [address, setAddress] = useState(
    shippingInfo.address
  );
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(
    shippingInfo.country
  );
  const [phone, setPhone] = useState(shippingInfo.phone);
  const [zip, setZip] = useState(shippingInfo.zip);

  const shippigSubmitHandler = (e) => {};

  return (
    <Fragment>
      <div className='shippingContainer'>
        <div className='shippingBox'>
          <h2 className='shippingHeading'>
            Shipping Details
          </h2>

          <form
            className='shippingForm'
            encType='multipart/form-data'
            onSubmit={shippigSubmitHandler}
          >
            <div>
              <HomeIcon />
              <input
                type='text'
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type='text'
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type='text'
                placeholder='Zip code'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>

            <div>
              <PublicIcon />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value=''>Country</option>
                {Country &&
                  Country.getAllCountries().map(
                    (country) => (
                      <option
                        key={country.name}
                        value={country.isoCode}
                      >
                        {country.name}
                      </option>
                    )
                  )}
              </select>
            </div>

            {country && (
              <div>
                <DomainIcon />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value=''>State</option>
                  {State &&
                    State.getStatesOfCountry(country).map(
                      (state) => (
                        <option
                          key={state.name}
                          value={state.isoCode}
                        >
                          {state.name}
                        </option>
                      )
                    )}
                </select>
              </div>
            )}

            {state && (
              <div>
                <LocationCityIcon />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value=''>City</option>
                  {City &&
                    City.getCitiesOfState(
                      country,
                      state
                    ).map((city) => (
                      <option
                        key={city.name}
                        value={city.isoCode}
                      >
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
