let token = "";
export function setToken(t){token=t}
export function getToken(){return token}
async function request(path,opts={}){
  const res=await fetch(path,{...opts,headers:{"Content-Type":"application/json",...(token?{Authorization:"Bearer "+token}:{}),...(opts.headers||{})}});
  const data=await res.json();
  if(!res.ok)throw new Error(data.error||"Request failed");
  return data;
}
export const api={
  login:(email,password,role)=>request("/api/login",{method:"POST",body:JSON.stringify({email,password,role})}),
  dashboard:()=>request("/api/dashboard"),
  students:()=>request("/api/students"),
  student:(id)=>request("/api/students/"+id),
  nudge:(id)=>request("/api/students/"+id+"/nudge",{method:"POST"}),
  addNote:(id,note)=>request("/api/students/"+id+"/note",{method:"POST",body:JSON.stringify({note})}),
  chatSuggestions:()=>request("/api/chat/suggestions"),
  chat:(question)=>request("/api/chat",{method:"POST",body:JSON.stringify({question})})
};
