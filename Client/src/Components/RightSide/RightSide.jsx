import React from 'react'
import {useState} from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import Trend from '../Trend/Trend';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';



function RightSide() {

  // const [opened, { open, close }] = useDisclosure(false);
  const[modalOpened , setModalOpened] = useState(false)

  
  
  return (
    <div className='RightSide'>
      <div className="NavIcons">
        <Link to='../home' >
        <img src={Home} alt=""/>
        </Link>
        <UilSetting />
        <img src={Noti} alt=""/>
        <img src={Comment} alt=""/>
      </div>

      <Trend/>
      <button className="button r-btn" onClick={()=>setModalOpened(true)}>
      
      Share
      
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened ={setModalOpened} />
      
    </div>
  )
}

export default RightSide
