import React from 'react'
import { Container } from 'react-bootstrap'
import {Janus, EchoJanusPlugin} from '@techteamer/janus-api'
import adapter from 'webrtc-adapter'
export default function CallProcess (props){
    
    const janus = new Janus(config, console)
    janus.connect().then(() => {
        console.log('Janus connected')
      
        const echo = new EchoJanusPlugin(console,false)
      
        return janus.addPlugin(echo).then(() => {
          console.log('EchoJanusPlugin added')
      
          return echo.connect().then(() => {
            console.log('EchoJanusPlugin connected')
      
            const peerConnection = new RTCPeerConnection(peerConnectionConfig)
      
            peerConnection.onicecandidate = (event) => {
              if (!event.candidate || !event.candidate.candidate) {
                echo.consume({ type: 'candidate', message: { completed: true } })
              } else {
                const candidate = {
                  candidate: event.candidate.candidate,
                  sdpMid: event.candidate.sdpMid,
                  sdpMLineIndex: event.candidate.sdpMLineIndex
                }
                echo.consume({ type: 'candidate', message: candidate })
              }
            }
      
            peerConnection.onaddstream = (mediaStreamEvent) => {
              console.log('GOT STREAM', mediaStreamEvent)
      
              const videoElement = document.getElementById('video')
              
              console.log(`wideo element is ${videoElement}`)
              console.log(mediaStreamEvent.stream)
              videoElement.srcObject = mediaStreamEvent.stream
              videoElement.play()
            }
      
            echo.on('jsep', (jsep) => {
              console.log('GOT answer from EchoJanusPlugin', jsep)
      
              peerConnection.setRemoteDescription(new RTCSessionDescription(jsep)).then(() => {
                console.log('remoteDescription set')
              })
            })
      
            return navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
              console.log('getUserMedia got stream')
      
              peerConnection.addStream(stream)
      
              return peerConnection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true }).then((offer) => {
                console.log('got offer', offer)
      
                return peerConnection.setLocalDescription(offer).then(() => {
                  console.log('setlocalDescription')
                  const jsep = { type: offer.type, sdp: offer.sdp }
      
                  echo.consume({ type: 'message', message: { jsep: jsep } })
                })
              })
            })
          })
        })
      }).catch(err => {
        console.log(err)
      })

    return(
        <Container>
            <h1>videocall</h1>
        </Container>
        
    )
}

const config = {
    url: 'ws://84.201.157.128:8188',
    keepAliveIntervalMs: 30000,
    options: {
      rejectUnauthorized: false
    },
    filterDirectCandidates: true,
    recordDirectory: '/workspace/records/',
    bitrate: 774144,
    firSeconds: 10,
    publishers: 20
  }
const peerConnectionConfig = {
    iceServers: [
      { url: 'stun:turnserver.techteamer.com:443' },
      { username: 'demo', url: 'turn:turnserver.techteamer.com:443?transport=udp', credential: 'secret' },
      { username: 'demo', url: 'turn:turnserver.techteamer.com:443?transport=tcp', credential: 'secret' }
    ]
  }