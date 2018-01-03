import React, {Component} from 'react';
import SimpleWebRTC from 'simplewebrtc';
import appendReactDOM from 'append-react-dom';



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
  ComponentDidMount () {
    this.state.webrtc.joinRoom(this.state.room);
  }
  componentWillMount () {
    const script = document.createElement("script");

    script.src = "https://simplewebrtc.com/latest-v2.js";
    script.async = true;
    document.body.appendChild(script);
  }

  startVideo(event){
    console.log(this.state.webrtc);
    this.state.webrtc.startLocalVideo();
    this.state.webrtc.resume()
    document.getElementById("localVideo").style.display = 'block';
    document.getElementById("remoteVideos").style.display = 'block';
  }

  endVideo(event){
    this.state.webrtc.stopLocalVideo();
    this.state.webrtc.pause();
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