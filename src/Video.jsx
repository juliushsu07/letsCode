
import React, {Component} from 'react';
import SimpleWebRTC from 'simplewebrtc';


const webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVideos'
        // immediately ask for camera access
      });

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
    webrtc.joinRoom(this.state.room);
    console.log(this.state.webrtc);
    webrtc.startLocalVideo();
    webrtc.resume()
    document.getElementById("localVideo").style.display = 'block';
    document.getElementById("remoteVideos").style.display = 'block';
  }

  endVideo(event){
    webrtc.stopLocalVideo();
    webrtc.pause();
    document.getElementById("localVideo").style.display = 'none';
    document.getElementById("remoteVideos").style.display = 'none';
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