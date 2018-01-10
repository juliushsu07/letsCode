import React, {Component} from 'react';
import SimpleWebRTC from 'simplewebrtc';
import ReactDOM from 'react-dom';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      room : this.props.room,
      videoStarted : false
    }
    this.addVideo = this.addVideo.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
    this.readyToCall = this.readyToCall.bind(this);

    this.startAllVideo = this.startAllVideo.bind(this);
    this.stopAllVideo = this.stopAllVideo.bind(this);
  }

  componentDidMount() {
    console.log(this.props.startVideo);
    console.log(this.props.room);
    this.webrtc = new SimpleWebRTC({
      localVideoEl: ReactDOM.findDOMNode(this.refs.local),
      remoteVideosEl: ""
    });

    console.log("webrtc component mounted");
    this.webrtc.on('readyToCall', this.readyToCall);
    this.webrtc.on('videoAdded', this.addVideo);
    this.webrtc.on('leftRoom', this.removeVideo);
  }

  startAllVideo(){
    if(!this.state.videoStarted){
      this.webrtc.startLocalVideo();
      this.setState({videoStarted : true});
    }
    this.webrtc.resume();
  }
  stopAllVideo(){
    if(this.state.videoStarted){
    this.webrtc.stopLocalVideo();
    }
    this.webrtc.pause();
  }


  addVideo(video, peer) {
    console.log('video added', peer);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    if (remotes) {
      var container = document.createElement('div');
      container.className = 'videoContainer';
      container.id = 'container_' + this.webrtc.getDomId(peer);
      container.appendChild(video);
      video.oncontextmenu = function() {
        return false;
      };
      remotes.appendChild(container);
    }
  }

  removeVideo(video, peer) {
    console.log('video removed ', peer);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
      remotes.removeChild(el);
    }
  }

  readyToCall() {
    return this.webrtc.joinRoom(this.state.room);
  }

  render() {
    return (
      <div>



                <button onClick= {this.startAllVideo}>Video On</button>
                <button onClick= {this.stopAllVideo}>Video Off</button>
                <div id="videosection" >
                <video className = "local" id = "localVideo" ref = "local"> </video>
                <div className = "remotes" id = "remoteVideos" ref = "remotes"></div>
                </div>



      </div >
    );
  }
}