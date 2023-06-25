import { useState ,useEffect } from "react";


function StoriesApp({stories,screen}){
 
  const [index,setIndex] = useState(0)
  const [time,setTime]   = useState(0)
  const [lastStory,setLastStory] = useState(false)
  const [imageUpdating, setImageUpdating] = useState(false);

  const storyStyle = {
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
    borderRadius:"10px",
    backgroundColor:"black",
    position:"relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "strech",
    width:screen.width,
    height:screen.height,
    margin:"5px"
  }

  const loadingStyle = { 
    position: "absolute",
    top: "50%", 
    left: "50%",
    transform: "translate(-50%, -50%)",
    color:"white"
   }


  useEffect(()=>{
    if(time >= stories[index].duration){
      if(index === (stories.length-1)){
        setLastStory(true)
      }else{
      setIndex(index+1)
      setTime(0)
      if(stories[index+1].type !=="text")setImageUpdating(true); // Set imageUpdating to true when index changes

      }
    }

    setTimeout(()=>{
      if(!lastStory && !imageUpdating){
        setTime(t=>t+10)
      }
    },10)
  },[index,time,stories,lastStory,imageUpdating])

const handleDivClick = (event) => {
  const { clientX } = event;
  const { left, right } = event.currentTarget.getBoundingClientRect();
  const middle = (left + right) / 2;
  
  if (clientX < middle && index > 0) {
    setLastStory(false)
    setIndex(index - 1);
    setTime(0);
   if(stories[index-1].type !== "text") setImageUpdating(true); // Set imageUpdating to true when index changes

  } else if (clientX >= middle && index < stories.length - 1) {
    setIndex(index + 1);
    setTime(0);
    if(stories[index+1].type !== "text") setImageUpdating(true); // Set imageUpdating to true when index changes

  }
};

const handleMediaLoad = (e) => {
  console.log(e.target)
  setImageUpdating(false); // Set imageUpdating to false when the image has finished loading
};

const renderStory = (index,imageUpdating)=>{

const {type} = stories[index]
const  style={ 
  opacity: imageUpdating ? 0.5 : 1,
  borderRadius:"10px" ,
  maxHeight:"100%",
  maxWidth:"100%"
}
switch (type) {
  case "image":
   return <img src={`/${stories[index].src}`} style={style}  onLoad={handleMediaLoad}/>
    break;
  case "video":
   return <video style={style}  onLoadedData={handleMediaLoad}  autoPlay loop>
   <source src={`/${stories[index].src}`} type="video/mp4" />
   Your browser does not support the video tag.
 </video>  
    break;
    case "text":
   return stories[index].content()
    break;
  default:
    console.log("unknown type")
    break;
}

  
}



 return (
  <div onClick={handleDivClick} style={storyStyle}>

          {renderStory(index,imageUpdating)}
          {imageUpdating &&
          <div  style={loadingStyle}>Loading</div>}
        <ProgressBar stories={stories} time={time}  width={screen.width} index={index}/>

  </div>
  
 )
}

function ProgressBar({stories,index,time,width}){
  let progressWidth = Math.floor((width-stories.length*2)/stories.length)
  let style = {
    width:progressWidth,
    height:5,
    marginLeft:2,
    marginTop:0,

  }
  return (
    <div style={{position:"absolute"}}>
    {
      stories.map((story,i)=>{
        let value;
        if(i<index) value = story.duration;
        else if(i>index) value = 0;
        else value = time
        let _max   = story.duration
        return <progress key={i} style={style} value={value} max={_max} />
      })
    }
    </div>
  )
}



const  stories = [
  {
   type:"text",
   duration:3000,
   content:() => {
  
    return (
      <div style={{ backgroundColor: "#FEDCD2", padding: "20px", borderRadius:"10px" }}>
        <h1 style={{ color: "#FF7F50" ,transform: "rotate(-7deg)" }}>Cat Story</h1>
        <h2 style={{backgroundColor:"grey", color: "#FFD700",transform: "rotate(-10deg)" }}>Once upon a time...</h2>
        <h3 style={{ color: "#8FBC8F",transform: "rotate(-10deg)" }}>
          There was a cat that brought joy to everyone's life. Its fluffy fur and playful nature
          made it the center of attention wherever it went.
        </h3>
        <h3 style={{ color: "#8FBC8F",transform: "rotate(-10deg)" }}>
          People couldn't resist the charm of this amazing feline creature. They would spend hours watching its
          entertaining antics and taking adorable pictures.
        </h3>
     
      </div>
    );
  }
  
  },
  {
    type:"image",
    src:"cat1.jpg",
    duration:3000
  },
  {
    type:"video",
    src:"cat1.mp4",
    duration:3000
  },
  {
    type:"image",
    src:"cat2.jpg",
    duration:3000
  },
  {
    type:"image",
    src:"cat3.jpg",
    duration:3000
  },
 
  {
    type:"text",
    duration:3000,
    content :() => {
      
    
      return (
        <div style={{ backgroundColor: "#FEDCD2", padding: "20px", borderRadius: "10px" }}>
          <h1 style={{ color: "#FF7F50", transform: "rotate(-7deg)" }}>Cat Story</h1>
          <h2 style={{ color: "#FFD700", transform: "rotate(-10deg)" }}>Continue...</h2>
         
          <h3 style={{ color: "#8FBC8F",transform: "rotate(-10deg)" }}>
            The cat's favorite activities included chasing laser pointers, napping in sunbeams, and getting into
            curious situations that left everyone laughing.
          </h3>
          <h3 style={{ color: "#8FBC8F" ,transform: "rotate(-10deg)"}}>
            The world was a better place with this colorful cat around. Its presence brought happiness and warmth
            to everyone's hearts.
          </h3>
          <h2 style={{ color: "#FFD700", transform: "rotate(-10deg)" }}>The End</h2>
          <div style={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
            <span role="img" aria-label="Cat Emoji" style={{ animation: "rotate 2s infinite linear" }}>
              🐱
            </span>
          </div>
        </div>
      );
    }
  }
  
] 

export default ()=><StoriesApp 
                    stories={stories} 
                    screen={{width:300,height:560}} 
                    />;




                  