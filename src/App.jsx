import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import './App.css';

import calendar from './assets/calendar.png';
import calendarGreen from './assets/calendar_green.png';
import email from './assets/email.png';
import emailGreen from './assets/email_green.png';
import lock from './assets/lock.png';
import lockGreen from './assets/lock_green.png';
import map from './assets/map.png';
import mapGreen from './assets/map_green.png';
import phone from './assets/phone.png';
import phoneGreen from './assets/phone_green.png';
import user from './assets/user.png';
import userGreen from './assets/user_green.png';

export default function App() {
  const [profile, setProfile] = useState()
  const [span, setSpan] = useState()
  const [title, setTitle] = useState()

  const [showName, setShowName] = useState(true) 
  const [showEmail, setShowEmail] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [data, setData] = useState()

  async function getData() {
    const response = await axios.get('https://randomuser.me/api')
    setData(response.data.results[0]) 
  }
  useEffect(() => {
    getData()
  }, [])

  function handleOnMouse() {
    setProfile(data.picture.large)

    if (showName) {
      const fullName = data.name.first + " " + data.name.last
      setSpan('Hi, My name is')
      setTitle(fullName)
    }
    if (showEmail) {
      setSpan('My email address is')
      setTitle(data.email)
    }
    if (showDate) {
      setSpan('My birthday is')
      const originalDate = data.dob.date
      const dataFormatted = new Date(originalDate);
      const dataFormatada = format(dataFormatted, 'dd-MM-yyyy');
      setTitle(dataFormatada) 
    }
    if (showMap) {
      const address = data.location.street.number + " " + data.location.street.name
      setSpan('My address is')
      setTitle(address)
    }
    if (showPhone) { 
      setSpan('My phone is')
      setTitle(data.phone)
    }
    if (showPass) {
      setSpan('My password is')
      setTitle(data.login.password)
    }
  }

  useEffect(() => {
    if (data) {
      handleOnMouse();
    }
  }, [data, showName, showDate, showEmail, showMap, showPass, showPhone]);

  return (
    <div className='container'>
      <div className='box-data'>
        <header>
        </header>
        <img className='img-profile' src={profile} alt="profile" />
        <span>{span}</span>
        <h1>{title}</h1>

        <ul className='ul-data'>
          <li>
            <img
              onMouseEnter={() => { 
                setShowName(true); 
                setShowEmail(false);
                setShowDate(false); 
                setShowMap(false);
                setShowPhone(false); 
                setShowPass(false); 
              }}
              src={showName ? userGreen : user}
              alt="user icon"
              className={showName ? 'active' : 'not-active'}
            />
          </li>
          <li>
            <img
              onMouseEnter={() => { 
                setShowEmail(true); 
                setShowName(false); 
                setShowDate(false); 
                setShowMap(false);
                setShowPhone(false); 
                setShowPass(false);
              }}
              src={showEmail ? emailGreen : email}
              alt="email icon"
              className={showEmail ? 'active' : 'not-active'}
            />
          </li>
          <li>
            <img
              onMouseEnter={() => { 
                setShowDate(true); 
                setShowName(false); 
                setShowEmail(false); 
                setShowMap(false);
                setShowPhone(false); 
                setShowPass(false); 
              }}
              src={showDate ? calendarGreen : calendar}
              alt="calendar icon"
              className={showDate ? 'active' : 'not-active'}
            />
          </li>
          <li>
            <img
              onMouseEnter={() => { 
                setShowMap(true); 
                setShowName(false); 
                setShowEmail(false);
                setShowDate(false);
                setShowPhone(false); 
                setShowPass(false); 
              }}
              src={showMap ? mapGreen : map}
              alt="map icon"
              className={showMap? 'active' : 'not-active'}
            />
          </li>
          <li>
            <img
              onMouseEnter={() => { 
                setShowPhone(true); 
                setShowName(false); 
                setShowEmail(false);
                setShowDate(false);
                setShowMap(false); 
                setShowPass(false); 
              }}
              src={showPhone ? phoneGreen : phone}
              alt="phone icon"
              className={showPhone ? 'active' : 'not-active'}
            />
          </li>
          <li>
            <img
              onMouseEnter={() => { 
                setShowPass(true); 
                setShowName(false); 
                setShowEmail(false);
                setShowDate(false);
                setShowMap(false); 
                setShowPhone(false);  
              }}
              src={showPass ? lockGreen : lock}
              alt="lock icon"
              className={showPass ? 'active' : 'not-active'}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
