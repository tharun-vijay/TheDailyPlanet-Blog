import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override';


const __dirName = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded ({ extended: true }) );
app.use(express.static ("public") );
app.use(methodOverride('_method'));


var posts =[
    {
    id: 0,
    title: "Justice in the Shadows?",
    content: "While Gotham's criminals quake at the mere mention of the Bat, others question whether his methods go too far. His no-holds-barred approach to bringing criminals to justice has raised alarms about the boundaries of vigilantism. The Bat’s actions are often brutal, and his tendency to operate outside the law places him in a morally gray area. Despite his noble intentions of protecting Gotham’s citizens, some believe that his methods of fear and violence mirror the very tactics he aims to eradicate. His penchant for relentless pursuit and sometimes torturous interrogation of suspects has made many question whether he has crossed the line from hero to tyrant.",
    author: "Tharun Vijay",
    date: "Mar 4 2025 19:04:03 GMT+0530 (India Standard Time)",
  },
  {
    id: 1,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content: "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.Moreover, AI is enabling businesses to innovate faster, streamline operations, and reduce costs. Automated customer service systems powered by natural language processing are enhancing user interactions, reducing wait times, and improving overall customer support efficiency. ",
    author: "Mia Williams",
    date: "Feb 27 2025 11:25:08 GMT+0530 (India Standard Time)",
  },
  {
    id: 2,
    title: "A Symbol of Hope or Fear?",
    content: "Yet, there is a dark side to this success. As the Bat continues to take down criminal empires, new power vacuums are often filled by even more dangerous figures. Some experts warn that the rise of violent factions and chaotic elements might be an unintended consequence of the Bat’s crusade, leading to even more instability in an already fragile city. Furthermore, the Bat’s singular approach to justice leaves little room for reform or rehabilitation. As Gotham’s criminal landscape grows ever darker, some argue that the city needs more than just a vigilante hero—it needs a complete overhaul of its justice system, with a focus on long-term solutions rather than short-term destruction.",    
    author: "Lois Lane",
    date: "Jan 26 2025 02:25:08 GMT+0530 (India Standard Time)",
  }
];

let lastId = 2;

app.get("/FAQ", (req,res) => {
  res.sendFile(__dirName + "/public/faq.html");                        
});

app.get("/About", (req,res) => {
  res.sendFile(__dirName + "/public/about.html");
});

app.get("/new", (req,res) => {
  res.render("newblog.ejs");
});

app.get("/", (req, res) => {
  res.render("blog.ejs", { allPosts: posts });
}); 

app.get("/edit/:id", (req,res) => {
  const postIndexingNumber = posts.findIndex((number) => number.id === parseInt(req.params.id));
  res.render("edit.ejs",{allPost: posts[postIndexingNumber]});
})

app.get("/:id", (req,res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex===-1) {
    return res.status(404).send("Post not found");
  } 
  posts.splice(postIndex,1);
  res.redirect("/");
}); 

app.post("/posting", (req,res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  };
  lastId = newId;
  posts.push(post);
  res.redirect("/");
});

app.patch("/edit/:id", (req,res) => {
  const postIndexNumber = posts.findIndex((patch) => patch.id === parseInt(req.params.id));

  if (postIndexNumber === -1) {
    return res.status(404).send("Post not found");
  }

  posts[postIndexNumber]={
    id: posts[postIndexNumber].id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  }
  res.redirect("/");
})

app.delete("/:id", (req,res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if( index === -1 ){
    return res.status(404).send("Post not found");
  }
  posts.splice(index,1);
  res.redirect("/");
});
 

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});  