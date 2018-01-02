import React, {Component} from 'react';
import SimpleWebRTC from 'simplewebrtc';


export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room : this.props.room,
      webrtc : new SimpleWebRTC({
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVideos'
        // immediately ask for camera access
      })
    };
    this.startVideo = this.startVideo.bind(this);
    this.endVideo = this.endVideo.bind(this);
  }

  componentWillMount () {
    const script = document.createElement("script");
    script.src = "https://simplewebrtc.com/latest-v2.js";
    script.async = true;
    document.body.appendChild(script);
  }

  startVideo(event){
    this.state.webrtc.joinRoom(this.state.room);
    this.state.webrtc.startLocalVideo();
  }

  endVideo(event){
    this.state.webrtc.stopLocalVideo();
    this.state.webrtc.mute();
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