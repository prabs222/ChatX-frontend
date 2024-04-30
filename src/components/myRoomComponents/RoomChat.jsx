import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import { useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

function RoomChat() {
  const [currentRoom, setCurrentRoom] = useState("");

  const BASE_URL_SOCKET = "ws://192.168.30.26:8000/";
  const BASE_URL_API = "http://192.168.30.26:8000/";
  const [socket, setSocket] = useState(null);
  const [messagesLoading, setmessagesLoading] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [token, setToken] = useState(null);
  const [hasMore, sethasmore] = useState(true);
  const [next, setNextUrl] = useState(null);
  const {roomId} = useParams();
  const id = roomId

  const getAuthTokenFromCookie = () =>{
    const cookies = document.cookie.split(';');
    for(const cookie of cookies){
      const [name, value] = cookie.trim().split("=");
      if(name === 'token'){
        setToken(value)
        return value;
      }
    }
    return null
  }

  const get_previous_messages = (id, cookie) => {
    if(messagesLoading) return;
    setmessagesLoading(true)
    var url = ``
    if(next === null){
      url = `${BASE_URL_API}get-messages/${id}/`
    }else{
      url = next
    }
    axios.get(url, {
      headers:{
        'Authorization': `Bearer ${cookie}`
      }
    }).then(response => {
      if(response.data.next !== null){
        setNextUrl(response.data.next)
        sethasmore(true)
      }else{
        sethasmore(false)
      }
      var datalist = []
      response.data.results.forEach(element => {
        if(element.user.id == localStorage.getItem("userid")){
          datalist.push({"message":element.message,"name": element.user.name, "sent":true})
        }else{
          datalist.push({"message":element.message,"name": element.user.name,"sent":false})
        }
      });
      setMessageData(messageData.concat(datalist))
      setmessagesLoading(false)
    }).catch(error => {
      console.error('Error making API request:', error);
      setmessagesLoading(false)
    })
  }

  const get_new_messages = (id, cookie) => {
    if(messagesLoading) return;
    setmessagesLoading(true)
    var url = `${BASE_URL_API}get-messages/${id}/`
    axios.get(url, {
      headers:{
        'Authorization': `Bearer ${cookie}`
      }
    }).then(response => {
      setCurrentRoom(response.data.room_name);
      if(response.data.next !== null){
        setNextUrl(response.data.next)
        sethasmore(true)
      }else{
        sethasmore(false)
      }
      var datalist = []
      response.data.results.forEach(element => {
        if(element.user.id == localStorage.getItem("userid")){
          datalist.push({"message":element.message,"name":element.user.name,"sent":true})
        }else{
          datalist.push({"message":element.message,"name":element.user.name,"sent":false})
        }
      });
      setMessageData(datalist)
      
      setmessagesLoading(false)
    }).catch(error => {
      console.error('Error making API request:', error);
      setmessagesLoading(false)
    })
  }



  useEffect(() => {
    const authToken = getAuthTokenFromCookie();

    if (authToken && id) {

        get_new_messages(id, authToken); 

        const newsocket = new WebSocket(`${BASE_URL_SOCKET}ws/chat/${id}/?token=${authToken}`);

        newsocket.onopen = () => console.log("CONNECTION ESTABLISHED");
        newsocket.onclose = () => console.log("CONNECTION CLOSED");
        newsocket.onerror = (e) => console.error("ERROR", e);

        setSocket(newsocket);

        return () => {
            newsocket.close();
        };
    }
  }, [id]); 


  useEffect(() => {
    if(socket !== null){

      socket.onmessage = function(e){
        const data = JSON.parse(e.data);
        console.log(data, "ONMESSAGE");
        if(data.id === localStorage.getItem("userid")){
          setMessageData([{"message":data.message,"name":"demoname","sent":true}, ...messageData])
        }else{
          setMessageData([{"message":data.message,"name":"demoname22","sent":false}, ...messageData])
        }
      }
    }
  }, [messageData, socket])


  return (
    <>
      <div className='chat-container'>
        {/* <Sidebar/> */}
        <div className='chat-area'>
          <div className='chat-header rounded-md mb-2 font-bold text-lg bg-richblack-800' >{currentRoom}</div>
          <div className='messages' id="scrollableDiv">
            {messageData.length === 0 ? (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="warning">No Messages Yet</Alert>
              </Stack>
            ) : (
              <InfiniteScroll
                dataLength={messageData.length}
                next={() => get_previous_messages(id, token)}
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                loader={<Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>}>

              {messageData.map((message, index) => (
                <Message text={message.message} name={message.name} sent={message.sent} key={index} />
              ))}
              </InfiniteScroll>
            )}
          </div>
          <MessageInput socket={socket} />
        </div>
      </div>
    </>

  )
}
export default RoomChat