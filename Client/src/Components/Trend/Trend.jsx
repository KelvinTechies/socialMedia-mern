import React from 'react'
import './Trend.css'
import {TrendData} from '../../TrendData'
function Trend() {
  return (
    <div className='Trending'>
      <h3>Trents For you </h3>
      {TrendData.map((trend)=>{
          return(
                <div className="trend">
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k Shares</span>
                </div>
          )
      })}
    </div>
  )
}

export default Trend
