import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faPlane,
  faCar,
  faBed,
  faTaxi,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useState } from "react";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div>
      <div className='header'>
        <div
          className={
            type === "list" ? "headerContainer listMode" : "headerContainer"
          }
        >
          <div className='headerList'>
            <div className='headerListItem active'>
              <FontAwesomeIcon icon={faHotel} />
              <span>Stays</span>
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
          {type !== "list" && (
            <>
              {" "}
              <h1 className='headerTitle'>Where do you want to go? Dream</h1>
              <p className='headerDesc'>Unlock savings of up to 10% or more</p>
              <button className='headerBtn'>Register</button>
              <div className='headerSearch'>
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faBed} className='headerIcon' />
                  <input
                    type='text'
                    placeholder='where are you going'
                    className='headerSearchInput'
                  />
                </div>

                <div className='headerSearchItem'>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className='headerIcon'
                  />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className='headerSearchText'
                  >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className='date'
                    />
                  )}
                </div>
                <div className='headerSearchItem'>
                  <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                  <span
                    className='headerSearchText'
                    onClick={() => setOpenOptions(!openOptions)}
                  >
                    {`${options.adult} adult ${options.children} children ${options.room} room`}
                  </span>
                  {openOptions && (
                    <div className='options'>
                      <div className='optionItem'>
                        <span className='optionText'>Adult</span>
                        <div className='optionCounter'>
                          <button
                            disabled={options.adult <= 1}
                            className='optionCounterButton'
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className='optionCounterNumber'>
                            {options.adult}
                          </span>
                          <button
                            className='optionCounterButton'
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='optionItem'>
                        <span className='optionText'>Children</span>
                        <div className='optionCounter'>
                          <button
                            disabled={options.children <= 0}
                            className='optionCounterButton'
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className='optionCounterNumber'>
                            {options.children}
                          </span>
                          <button
                            className='optionCounterButton'
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='optionItem'>
                        <span className='optionText'>Room</span>
                        <div className='optionCounter'>
                          <button
                            disabled={options.room <= 1}
                            className='optionCounterButton'
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className='optionCounterNumber'>
                            {options.room}
                          </span>
                          <button
                            className='optionCounterButton'
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='headerSearchItem'>
                  <button className='headerBtn'>Search</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
