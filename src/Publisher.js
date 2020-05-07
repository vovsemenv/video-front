import React from 'react'
import { Container } from 'react-bootstrap'
import {Janus, EchoJanusPlugin,VideoRoomListenerJanusPlugin} from '@techteamer/janus-api'


export default function Publishers (props){
    const janus = new Janus(config, console)


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