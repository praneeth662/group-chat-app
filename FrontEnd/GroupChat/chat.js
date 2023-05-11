const sendBtn = document.getElementById('sendmsg');
const chatMsg = document.getElementById('chat-msg');
const chatBox = document.getElementById('chat-box');
const groupName = document.getElementById('create-group');
const addBtn = document.getElementById('add-group');
const chatGroup = document.getElementById('chat-user-group');
const token = localStorage.getItem('token');
const mobileInput = document.getElementById('invite-users-input')
const addUser = document.getElementById('adduser')
let currentGroupId = null;
let userli=[];


window.addEventListener("DOMContentLoaded", async () => {
  try {
    const groups = await axios.get(`http://localhost:3000/group/usergroup`, { headers: {"Authorization" : token }});
    // console.log(groups)
    groups.data.forEach(async(group) => {
      showGroup(group);
    });
    // chatRefresh()

  } catch (err) {
    console.log(err);
  }
});

addBtn.addEventListener('click', addNewGroup);
sendBtn.addEventListener('click', sendChat)
let groupId;

chatGroup.addEventListener('click', async (event) => {
  
  groupId = event.target.getAttribute('data-group-id');
  if (groupId) {
    currentGroupId = groupId;
    chatBox.innerHTML = '';
    removeFromScreen()
    const chats = await axios.get(`http://localhost:3000/chat/chats/${groupId}`, { headers: {"Authorization" : token }});
    // console.log(chats)
    chats.data.forEach((chat) => {
      showchats(chat);
    });
    const User = await axios.get(`http://localhost:3000/group/getuser/${currentGroupId}`, { headers: {"Authorization" : token }});
    // console.log(User)
    User.data.forEach(async(user) => {
      const status = await isAdmin()
      if (status === 200){
        adminUser(user)
        addUser.style.display = 'block'
      }else{
        showUsers(user);
      }
      
    });
    chatRefresh()
    
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

function removeFromScreen(){
  userli.forEach(li => {
      chatGroup.removeChild(li);
    });
    // clear the displayedExpenses array
    userli.length = 0;
}

async function chatRefresh(){
  try{
    setInterval(async ()=>{
      if (currentGroupId) {
        const chats = await axios.get(`http://localhost:3000/chat/newchats/${currentGroupId}`, { headers: {"Authorization" : token }});
        chats.data.forEach((chat) => {
          showchats(chat);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    },5000)
  }catch(err){
    console.log(err)
  }
}




