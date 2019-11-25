import React, { Component } from 'react';
import '../Component/MainPage.css'



class MainPage extends Component {
  render() {
    return (
        <React.Fragment>
          <br/>
          <center><h2>Calculate a Route</h2></center><br/>

          <div id="placeInfo">
            <h3 style={{ color: "green" }}>Start:</h3>
              <div className="searchInput">
               <input type="text" name="searchbox"  onChange={this.searchBox0} id="loc1" />
             </div> 
              <t id="startInfo" className="tooltip"></t>

             <h3 style={{ color: "orange" }}>Waypoints:</h3>
             <div className="searchInput">
               <input type="text" name="searchbox" placeholder="Enter up to 8 waypoints" id="loc2" />
             </div>
             <t>
               <ul id="wayPointsInfo">
               </ul>
             </t>

            <h3 style={{ color: "red" }}>End:</h3>
            <div className="searchInput">
              <input type="text" name="searchbox" id="loc3" />
            </div>
            <t id="endInfo" className="tooltip"></t>

            <br />
            <br />
            <br />
            <br />
            <h3 style={{ color: "blue" }}>Instructions:</h3>
            <ol>
              <li>Enter the start location in the "Start" search box</li>
              <li>Enter up to 8 waypoint locations in the "Waypoints" box in any order</li>
              <li>Enter the end location in the "End" box</li>
              <li>Mouseover a location on the left panel to view its address</li>
              <li>Delete waypoints with the red x; change start/end by entering a new location</li>

            </ol>
          </div>
          <img id="ham" src="https://www.stickpng.com/assets/images/588a64e7d06f6719692a2d11.png" alt="" height="20px" />


        </React.Fragment>

    );
  }
}

export default MainPage;


