import React from 'react'
import Janus,{} from './old/janus.js'
import {getQueryStringValue} from './old/helpers.js'
import { Form, Row, Button, Col } from 'react-bootstrap';
import $ from "jquery"
let myusername = "vovaa";
let doSimulcast = (getQueryStringValue("simulcast") === "yes" || getQueryStringValue("simulcast") === "true");
let doSimulcast2 = (getQueryStringValue("simulcast2") === "yes" || getQueryStringValue("simulcast2") === "true");
let videocall = null;
export default function Call(props){
    // let server = `https://${window.location.hostname}:8089/janus`
    // let janus;
    
    // let opaqueId = "videocalltest-"+Janus.randomString(12);
    // let bitrateTimer = null;
    // let spinner = null;
    // let audioenabled = false;
    // let videoenabled = false;

    
    // let yourusername = null;
    
    //  let simulcastStarted = false;
    

    // if(!Janus.isWebrtcSupported()) {
    //     console.log("webrec doest't suported")
    // }else{
    //     console.log("webrtc supported")
    //     janus = new Janus({
    //         server:server,
    //         succes: function(pluginHandle){
    //             janus.attach(
    //                 {
    //                     plugin: "janus.plugin.videocall",
	// 					opaqueId: opaqueId,
    //                     success: function(pluginHandle) {
    //                         videocall = pluginHandle;
    //                         console.log("Plugin attached! (" + videocall.getPlugin() + ", id=" + videocall.getId() + ")");
    //                     },
    //                     error: function(error) {
    //                         console.error("  -- Error attaching plugin...", error);
    //                     },
    //                     mediaState: function(medium, on) {
    //                         console.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
    //                     },
    //                     webrtcState: function(on) {
    //                         console.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
    //                     },
    //                     ondata: function(data) {
    //                         console.debug("We got data from the DataChannel! " + data);
    //                     },
    //                     ondataopen: function(data) {
    //                         console.log("The DataChannel is available!");
    //                       },
    //                     onlocalstream: function(stream) {
    //                         Janus.attachMediaStream($('#myvideo').get(0), stream);
                        
    //                         $("#myvideo").get(0).muted = "muted";

    //                         if(videocall.webrtcStuff.pc.iceConnectionState !== "completed" &&
    //                                 videocall.webrtcStuff.pc.iceConnectionState !== "connected") {
                                
    //                         }

    //                         var videoTracks = stream.getVideoTracks();
    //                         if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
    //                         console.log("Opponent no webcam");
                            
    //                         }
    //                     },
    //                     consentDialog: function(on) {
                        
    //                     },
    //                     onremotestream: function(stream) {
    //                         Janus.debug(" ::: Got a remote stream :::");
    //                         Janus.debug(stream);
    //                         var addButtons = false;
                            
    //                         Janus.attachMediaStream($('#remotevideo').get(0), stream);
                            
    //                         var videoTracks = stream.getVideoTracks();
                            
    //                         // Enable audio/video buttons and bitrate limiter
    //                         audioenabled = true;
    //                         videoenabled = true;
                            
    //                     }
    //                 }
    //             )
    //         },
    //         error: function(error) {
    //             console.log(error);
    //         },
    //         destroyed: function() {
    //             window.location.reload();
    //         }
    //     })
    // }

    return(<div>

            <Row style={{justifyContent:"center"}}>
                <input style={{width:"20em"}} type="text" id="peer" placeholder="Кому звоним(username)"></input>
                <Button style={{marginLeft:"2em"}} onClick={doCall}>Позвонить</Button>
            </Row>
            <video className="rounded centered" id="myvideo" width="320" height="240" autoPlay playsInline muted="muted"/>
            <video className="rounded centered" id="remotevideo" width="320" height="240" autoPlay playsInline muted="muted"/>
    </div>)
}

function doCall() {
	// Call someone
    var register = { "request": "register", "username": myusername };
	videocall.send({"message": register});
    console.log(register+"sended");

	var username = $('#peer').val();
	if(username === "") {
		alert("Insert a username to call (e.g., pluto)");
		
		return;
	}
	if(/[^a-zA-Z0-9]/.test(username)) {
		alert('Input is not alphanumeric');
		
		return;
	}
	// Call this user
	videocall.createOffer(
		{
			// By default, it's sendrecv for audio and video...
			media: { data: true },	// ... let's negotiate data channels as well
			// If you want to test simulcasting (Chrome and Firefox only), then
			// pass a ?simulcast=true when opening this demo page: it will turn
			// the following 'simulcast' property to pass to janus.js to true
			simulcast: doSimulcast,
			success: function(jsep) {
				Janus.debug("Got SDP!");
				Janus.debug(jsep);
				var body = { "request": "call", "username": $('#peer').val() };
				videocall.send({"message": body, "jsep": jsep});
			},
			error: function(error) {
				Janus.error("WebRTC error...", error);
				alert("WebRTC error... " + error);
			}
		});
}