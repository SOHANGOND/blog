
import "./setting.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Setting() {

  const { user, dispatch } = useContext(Context)
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF="http://localhost:3000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId:user._id,
      username,
      email,
      password

    };
    if (file) {
      const data = FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
       
      } catch (err) {

      }
    }
    try {

      const res= await axios.put("/users/"+user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    } catch (error) {
       dispatch({type:"UPDATE_FAILURE"})
    }
  }


  return (
    <div className='setting'>
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Acoount</span>
        </div>
        <form action="" className="settingForm" onSubmit={handleSubmit}>
          <label htmlFor="">Profile Picture</label>
          <div className="settingPP">
            <img src={file ?URL.createObjectURL(file):PF+user.profilePic} alt="" className="settingImg" />
            <label htmlFor="fileInput" >
            <i class="settingPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input type="file" id='fileInput' style={{ display: "none" }} 
               onChange={(e) => setFile(e.target.files[0])}
            />
          
          </div>
          <label htmlFor="">Username</label>
          <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="">Email</label>
          <input type="emai" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
          <label htmlFor="">Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
          
          <button className="settingSubmit" type="submit">Update</button>
          {success&& <span style={{color:"green",textAlign:"center" ,marginTop:"20px"}}>Profile has been updated...</span>}

        </form>
      </div>
      <Sidebar/>
    </div>
  )
}
