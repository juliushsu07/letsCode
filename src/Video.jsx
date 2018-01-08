
import React, {Component} from 'react';
import SimpleWebRTC from 'simplewebrtc';


const webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVideos'
        // immediately ask for camera access
      });
console.log(webrtc);

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room : this.props.room,
    };
    this.startVideo = this.startVideo.bind(this);
    this.endVideo = this.endVideo.bind(this);
  }
  ComponentDidMount () {

  }
  componentWillMount () {
    const script = document.createElement("script");

    script.public = "https://simplewebrtc.com/latest-v2.js";
    script.async = true;
    document.body.appendChild(script);
  }

  startVideo(event){
    // document.getElementById("localVideo").style.display = 'block';
    // document.getElementById("remoteVideos").style.display = 'block';
        console.log(this.state.room)
    webrtc.joinRoom(this.state.room , this.state.room);

    webrtc.startLocalVideo();

    // webrtc.resume()
  }

  endVideo(event){
    webrtc.leaveRoom(this.state.room);
    webrtc.stopLocalVideo();

    // webrtc.pause();
    // document.getElementById("localVideo").style.display = 'none';
    // document.getElementById("remoteVideos").style.display = 'none';
  }

  render() {
    console.log("Rendering <Video/>");


    return (
      <div>
        <div className="local-video-container">
          <video id="localVideo" ></video>
          <div className="video-buttons">
            <button onClick= {this.startVideo}>Video On</button>
            <button onClick= {this.endVideo}>Video Off</button>
          </div>
        </div>
        <div id="remoteVideos"></div>
      </div>
    );
  }
}